import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import Layout from '@/components/Layout';
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Send,
  Plus,
  Heart,
  MessageSquare,
  Eye,
  Clock,
  Shield,
  Settings,
  Flag,
  ThumbsUp,
  Share2,
  MoreVertical,
  Pin,
  Edit,
  Trash2,
  Crown,
  Circle,
  Lock,
  UserPlus,
  Ban,
  Star,
  UserMinus,
  UserCheck,
  AlertTriangle,
  StickyNote,
  Grid,
  List,
  Filter,
  Tag,
  Reply
} from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  replies: number;
  views: number;
  isPinned: boolean;
  isLiked: boolean;
  status: 'published' | 'pending' | 'rejected';
  tags: string[];
}

interface ChatMessage {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  isModerator: boolean;
}

interface PrivateMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isFromModerator: boolean;
}

interface PrivateChatRoom {
  id: string;
  name: string;
  createdBy: string;
  members: string[];
  createdAt: string;
  lastActivity: string;
  messageCount: number;
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  joinedAt: string;
  rating: number;
  isBlocked: boolean;
  role: 'member' | 'moderator';
  lastActive: string;
}

export default function CommunityDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { showAlert } = useModal();
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [activeTab, setActiveTab] = useState('posts');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [privateMessage, setPrivateMessage] = useState('');
  const [isModeratorOnline, setIsModeratorOnline] = useState(true);
  const [selectedPrivateRoom, setSelectedPrivateRoom] = useState<string | null>(null);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [postViewMode, setPostViewMode] = useState<'card' | 'list'>('card');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isMember, setIsMember] = useState(true); // 模擬用戶是否為社群成員

  // 檢查用戶是否為版主
  const isModerator = user?.name === 'React專家' || user?.name === '前端大師';
  const isAdmin = user?.email === 'admin@example.com';

  // 模擬社群資料
  const community = {
    id: '1',
    name: 'React 開發者社群',
    description: '討論 React 開發技巧、最佳實踐和最新趨勢',
    category: '程式設計',
    memberCount: 1250,
    postCount: 3420,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=300&fit=crop',
    moderators: [
      { name: 'React專家', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', isOnline: true },
      { name: '前端大師', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', isOnline: false }
    ],
    rules: [
      '保持友善和尊重的態度',
      '分享技術相關內容',
      '避免發布廣告或垃圾訊息',
      '使用適當的標籤分類文章'
    ],
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development']
  };

  // 討論區分類
  const [categories, setCategories] = useState([
    { id: 'general', name: '一般討論', count: 15 },
    { id: 'questions', name: '問題求助', count: 8 },
    { id: 'tutorials', name: '教學分享', count: 12 },
    { id: 'showcase', name: '作品展示', count: 5 }
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'React 18 的新特性解析',
      content: '分享 React 18 中 Concurrent Features 的使用心得，包含 Suspense、Concurrent Rendering 等新功能的實際應用場景和注意事項...',
      author: 'React愛好者',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b547?w=40&h=40&fit=crop&crop=face',
      createdAt: '2小時前',
      likes: 15,
      replies: 8,
      views: 125,
      isPinned: true,
      isLiked: false,
      status: 'published',
      tags: ['React18', 'Concurrent'],
      category: 'tutorials'
    },
    {
      id: '2',
      title: 'useEffect 的最佳實踐',
      content: '關於 useEffect 的依賴陣列和清理函式的正確使用方法，避免無限迴圈和記憶體洩漏...',
      author: 'Hook大師',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      createdAt: '5小時前',
      likes: 23,
      replies: 12,
      views: 234,
      isPinned: false,
      isLiked: true,
      status: 'published',
      tags: ['useEffect', 'Hooks'],
      category: 'tutorials'
    },
    {
      id: '3',
      title: 'React Context 性能問題',
      content: '使用 React Context 時遇到性能問題，重新渲染太頻繁，請問有什麼解決方案嗎？',
      author: '前端新手',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      createdAt: '1天前',
      likes: 5,
      replies: 15,
      views: 89,
      isPinned: false,
      isLiked: false,
      status: 'published',
      tags: ['Context', '性能'],
      category: 'questions'
    },
    {
      id: '4',
      title: '我的 React 專案作品集',
      content: '分享我最近完成的 React 電商���案，使用了 Redux Toolkit、React Router 和 Material-UI...',
      author: '專案展示者',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      createdAt: '3天前',
      likes: 28,
      replies: 6,
      views: 156,
      isPinned: false,
      isLiked: false,
      status: 'published',
      tags: ['專案', '作品集'],
      category: 'showcase'
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      author: 'React專家',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      content: '歡迎大家來到 React 開發者社群！有任何問題都可以在這裡討論',
      timestamp: '10:30',
      isModerator: true
    }
  ]);

  // 私人留言板（僅版主可見）
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([
    {
      id: '1',
      author: '管理團隊',
      content: '社群運營情況良好，成員活躍度持續上升',
      timestamp: '今天 09:00',
      isFromModerator: true
    },
    {
      id: '2',
      author: '系統通知',
      content: '有3篇文章等待審核',
      timestamp: '今天 08:30',
      isFromModerator: false
    }
  ]);

  // 私人聊天室
  const [privateChatRooms, setPrivateChatRooms] = useState<PrivateChatRoom[]>([
    {
      id: '1',
      name: 'React Hook 深度討論',
      createdBy: 'Hook大師',
      members: ['Hook大師', 'React愛好者', user?.name || ''],
      createdAt: '2024-03-10',
      lastActivity: '1小時前',
      messageCount: 15
    },
    {
      id: '2',
      name: 'React 18 升級經驗',
      createdBy: 'React愛好者',
      members: ['React愛好者', '前端新手'],
      createdAt: '2024-03-11',
      lastActivity: '30分鐘前',
      messageCount: 8
    }
  ]);

  // 成員管理
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'React愛好者',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b547?w=40&h=40&fit=crop&crop=face',
      joinedAt: '2024-01-15',
      rating: 4.8,
      isBlocked: false,
      role: 'member',
      lastActive: '1小時前'
    },
    {
      id: '2',
      name: 'Hook大師',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      joinedAt: '2024-01-20',
      rating: 4.9,
      isBlocked: false,
      role: 'member',
      lastActive: '30分鐘前'
    },
    {
      id: '3',
      name: '前端新手',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      joinedAt: '2024-02-01',
      rating: 3.5,
      isBlocked: false,
      role: 'member',
      lastActive: '2天前'
    }
  ]);

  const handleCreatePrivateRoom = () => {
    if (!newRoomName.trim() || selectedMembers.length === 0) {
      showAlert('請填寫聊天室名稱並選擇成員', 'error');
      return;
    }

    const newRoom: PrivateChatRoom = {
      id: Date.now().toString(),
      name: newRoomName,
      createdBy: user?.name || '',
      members: [user?.name || '', ...selectedMembers],
      createdAt: new Date().toLocaleDateString(),
      lastActivity: '剛剛',
      messageCount: 0
    };

    setPrivateChatRooms(prev => [newRoom, ...prev]);
    setNewRoomName('');
    setSelectedMembers([]);
    setShowCreateRoomModal(false);
    showAlert('私人聊天室已建立！', 'success');
  };

  const handleRateMember = (memberId: string, rating: number) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, rating } : member
    ));
    showAlert('成員評等已更新', 'success');
  };

  const handleBlockMember = (memberId: string) => {
    setMembers(prev => prev.map(member =>
      member.id === memberId ? { ...member, isBlocked: !member.isBlocked } : member
    ));
    const member = members.find(m => m.id === memberId);
    showAlert(
      member?.isBlocked ? '已解除成員屏蔽' : '已屏蔽成員',
      member?.isBlocked ? 'info' : 'warning'
    );
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      showAlert('請輸入分類名稱', 'error');
      return;
    }

    const newCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      count: 0
    };

    setCategories(prev => [...prev, newCategory]);
    setNewCategoryName('');
    setShowCategoryModal(false);
    showAlert('分類已新增', 'success');
  };

  const handleSendMessage = () => {
    if (!user) {
      showAlert('請先登入才能發送訊息', 'warning');
      navigate('/login');
      return;
    }

    if (!isMember) {
      showAlert('只有社群成員才能發送訊息', 'warning');
      return;
    }

    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      author: user.name,
      authorAvatar: user.avatar || '',
      content: chatMessage,
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      isModerator: false
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');

    // 模擬版主回覆（如果在線）
    if (isModeratorOnline && Math.random() > 0.7) {
      setTimeout(() => {
        const moderatorReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          author: 'React專家',
          authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          content: '感謝您的問題！讓我來為您解答...',
          timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
          isModerator: true
        };
        setChatMessages(prev => [...prev, moderatorReply]);
      }, 2000);
    }
  };

  const handleCreatePost = () => {
    if (!user) {
      showAlert('請先登入才能發布文章', 'warning');
      navigate('/login');
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      showAlert('請填寫文章標題和內容', 'error');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: user.name,
      authorAvatar: user.avatar || '',
      createdAt: '剛剛',
      likes: 0,
      replies: 0,
      views: 1,
      isPinned: false,
      isLiked: false,
      status: 'pending',
      tags: [],
      category: selectedCategory === 'all' ? 'general' : selectedCategory
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostTitle('');
    setNewPostContent('');
    showAlert('文章已提交，等待管理員審核', 'info');
  };

  const handleLikePost = (postId: string) => {
    if (!user) {
      showAlert('請先登入', 'warning');
      return;
    }

    setPosts(prev => prev.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  // 過濾文章
  const filteredPosts = posts.filter(post => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  const handleSendPrivateMessage = () => {
    if (!privateMessage.trim()) return;

    const newMessage: PrivateMessage = {
      id: Date.now().toString(),
      author: user?.name || '',
      content: privateMessage,
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      isFromModerator: isModerator
    };

    setPrivateMessages(prev => [...prev, newMessage]);
    setPrivateMessage('');
  };

  const canAccessPrivateBoard = isModerator || isAdmin;
  const canManageMembers = isModerator || isAdmin;

  // 過濾用戶可以看到的私人聊天室
  const visiblePrivateRooms = privateChatRooms.filter(room => 
    room.members.includes(user?.name || '') || isModerator || isAdmin
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/community')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{community.name}</h1>
            <p className="text-muted-foreground">{community.description}</p>
          </div>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            分享
          </Button>
        </div>

        {/* Community Info */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="relative rounded-lg overflow-hidden mb-6">
              <img 
                src={community.image} 
                alt={community.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <div className="text-white">
                  <Badge className="bg-primary text-primary-foreground mb-2">
                    {community.category}
                  </Badge>
                  <div className="flex gap-2">
                    {community.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">社群資訊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{community.memberCount.toLocaleString()} 位成員</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{community.postCount} 篇文章</span>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-yellow-500" />
                    版主
                  </h4>
                  <div className="space-y-2">
                    {community.moderators.map((mod, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={mod.avatar} />
                            <AvatarFallback>{mod.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Circle 
                            className={`h-2 w-2 absolute -bottom-0.5 -right-0.5 ${
                              mod.isOnline ? 'text-green-500 fill-green-500' : 'text-gray-400 fill-gray-400'
                            }`}
                          />
                        </div>
                        <span className="text-xs">{mod.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {isModerator && (
                  <div className="pt-2 border-t">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                      <Crown className="h-3 w-3 mr-1" />
                      版主��限
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full ${canAccessPrivateBoard ? 'grid-cols-5' : 'grid-cols-3'}`}>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              討論區
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              公開聊天室
              {isModeratorOnline && (
                <Circle className="h-2 w-2 text-green-500 fill-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="private-chat" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              私人聊天室
            </TabsTrigger>
            {canAccessPrivateBoard && (
              <TabsTrigger value="private-board" className="flex items-center gap-2">
                <StickyNote className="h-4 w-4" />
                私人留言板
              </TabsTrigger>
            )}
            {canManageMembers && (
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                成員管理
              </TabsTrigger>
            )}
          </TabsList>

          {/* 討論區 */}
          <TabsContent value="posts" className="mt-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* 側邊欄 - 分類和控制 */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">討論分類</CardTitle>
                      {isModerator && (
                        <Button size="sm" variant="outline" onClick={() => setShowCategoryModal(true)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div
                      onClick={() => setSelectedCategory('all')}
                      className={`p-2 rounded-lg cursor-pointer transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">全部</span>
                        <Badge variant="outline" className="text-xs">
                          {posts.length}
                        </Badge>
                      </div>
                    </div>

                    {categories.map(category => (
                      <div
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{category.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {posts.filter(p => p.category === category.id).length}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* 發布新文章 */}
                <Card className="mt-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">發布文章</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      placeholder="文章標題..."
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="分享您的想法..."
                      rows={3}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        需要審核
                      </p>
                      <Button size="sm" onClick={handleCreatePost}>
                        <Send className="h-4 w-4 mr-1" />
                        發布
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 主要內容區域 */}
              <div className="lg:col-span-3">
                {/* 工具列 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      共 {filteredPosts.length} 篇文章
                    </span>
                    {selectedCategory !== 'all' && (
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={postViewMode === 'card' ? 'default' : 'outline'}
                      onClick={() => setPostViewMode('card')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={postViewMode === 'list' ? 'default' : 'outline'}
                      onClick={() => setPostViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* 文章列表 */}
                <div className={postViewMode === 'card' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className={`group hover:shadow-lg transition-all duration-300 ${
                      post.isPinned ? 'border-primary' : ''
                    } ${
                      postViewMode === 'list' ? 'flex' : ''
                    }`}>
                      {postViewMode === 'card' ? (
                        // 卡片視圖
                        <>
                          <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={post.authorAvatar} />
                                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{post.author}</span>
                                  <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                                  {post.isPinned && (
                                    <Pin className="h-3 w-3 text-primary" />
                                  )}
                                </div>
                                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                  {post.title}
                                </h3>
                              </div>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {post.content}
                            </p>

                            {post.tags.length > 0 && (
                              <div className="flex gap-1 mb-3">
                                {post.tags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{post.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleLikePost(post.id)}
                                  className={`p-0 h-auto ${post.isLiked ? 'text-red-500' : ''}`}
                                >
                                  <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                                  {post.likes}
                                </Button>

                                <div className="flex items-center gap-1">
                                  <Reply className="h-4 w-4" />
                                  {post.replies}
                                </div>

                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {post.views}
                                </div>
                              </div>

                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.id === post.category)?.name}
                              </Badge>
                            </div>
                          </CardContent>
                        </>
                      ) : (
                        // 列表視圖
                        <CardContent className="p-4 flex items-center gap-4 w-full">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.authorAvatar} />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold group-hover:text-primary transition-colors">
                                {post.title}
                              </h3>
                              {post.isPinned && (
                                <Pin className="h-4 w-4 text-primary" />
                              )}
                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.id === post.category)?.name}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{post.author}</span>
                              <span>{post.createdAt}</span>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Heart className={`h-3 w-3 ${post.isLiked ? 'text-red-500 fill-current' : ''}`} />
                                  {post.likes}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Reply className="h-3 w-3" />
                                  {post.replies}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {post.views}
                                </div>
                              </div>
                            </div>
                          </div>

                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">目前沒有文章</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 公開聊天室 */}
          <TabsContent value="chat" className="mt-6">
            <Card className="h-96">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    社群公開聊天室
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>{community.memberCount.toLocaleString()} 位成員</span>
                    <Circle className={`h-2 w-2 ml-2 ${
                      isModeratorOnline ? 'text-green-500 fill-green-500' : 'text-gray-400 fill-gray-400'
                    }`} />
                    <span className="text-muted-foreground">
                      版主{isModeratorOnline ? '在線' : '離線'}
                    </span>
                  </div>
                </div>
                {!isMember && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-medium">您目前只能查看聊天內容，加入社群後即可參與聊天</span>
                    </div>
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex flex-col h-80">
                {/* 聊天訊息 */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 bg-muted/20 rounded-lg p-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.authorAvatar} />
                          <AvatarFallback>{message.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {message.isModerator && (
                          <Crown className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.author}</span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          {message.isModerator && (
                            <Badge variant="outline" className="text-xs">
                              版主
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* 訊息輸入 */}
                <div className="flex gap-2">
                  <Input
                    placeholder={isMember
                      ? "輸入訊息..."
                      : "只有社群成員才能發送訊息"
                    }
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={!isMember}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!isMember || !chatMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {!isMember && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    <Button variant="link" className="p-0 h-auto text-xs" onClick={() => showAlert('請前往社群主頁加入社群', 'info')}>加入社群</Button> 以參與聊天討論
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 私人聊天室 */}
          <TabsContent value="private-chat" className="mt-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">私人聊天室</CardTitle>
                      <Button size="sm" onClick={() => setShowCreateRoomModal(true)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {visiblePrivateRooms.map(room => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedPrivateRoom(room.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedPrivateRoom === room.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{room.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {room.members.length}
                          </Badge>
                        </div>
                        <div className="text-xs opacity-75">
                          {room.lastActivity} • {room.messageCount} 則訊息
                        </div>
                      </div>
                    ))}
                    
                    {visiblePrivateRooms.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Lock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">沒有私人聊天室</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                {selectedPrivateRoom ? (
                  <Card className="h-96">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {visiblePrivateRooms.find(r => r.id === selectedPrivateRoom)?.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">
                            {visiblePrivateRooms.find(r => r.id === selectedPrivateRoom)?.members.length} 位成員
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex flex-col h-80">
                      <div className="flex-1 bg-muted/20 rounded-lg p-4 mb-4">
                        <div className="text-center text-muted-foreground">
                          <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>私人聊天室對話內容</p>
                          <p className="text-xs mt-1">
                            {isModerator || isAdmin ? '版主/管理��可查看所有對話' : '僅限邀請成員查看'}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="輸入訊息..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                        />
                        <Button>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-96">
                    <CardContent className="flex items-center justify-center h-full">
                      <div className="text-center text-muted-foreground">
                        <Lock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">選擇一個私人聊天室</p>
                        <p className="text-sm">從左側列表選擇聊天室開始對話</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 私人留言板（僅版主可見） */}
          {canAccessPrivateBoard && (
            <TabsContent value="private-board" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StickyNote className="h-5 w-5" />
                    版主私人留言板
                    <Badge variant="outline" className="text-xs">僅版主可見</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 發布新留言 */}
                  <Card className="bg-muted/20">
                    <CardContent className="p-4 space-y-4">
                      <Textarea
                        placeholder="留言給其他版主..."
                        value={privateMessage}
                        onChange={(e) => setPrivateMessage(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleSendPrivateMessage}>
                          <Send className="h-4 w-4 mr-2" />
                          發布留言
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 留言列表 */}
                  <div className="space-y-4">
                    {privateMessages.map(message => (
                      <Card key={message.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{message.author}</span>
                                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                {message.isFromModerator && (
                                  <Crown className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* 成員管理（僅版主可見） */}
          {canManageMembers && (
            <TabsContent value="members" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    成員管理
                    <Badge variant="outline" className="text-xs">版主專用</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {members.map(member => (
                      <Card key={member.id} className={member.isBlocked ? 'opacity-50' : ''}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{member.name}</span>
                                  {member.role === 'moderator' && (
                                    <Crown className="h-4 w-4 text-yellow-500" />
                                  )}
                                  {member.isBlocked && (
                                    <Badge variant="destructive" className="text-xs">已屏蔽</Badge>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  加入時間：{member.joinedAt} • 最後活動：{member.lastActive}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              {/* 評等 */}
                              <div className="flex items-center gap-1">
                                <span className="text-sm">評等：</span>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map(rating => (
                                    <Star
                                      key={rating}
                                      className={`h-4 w-4 cursor-pointer ${
                                        rating <= member.rating 
                                          ? 'text-yellow-400 fill-yellow-400' 
                                          : 'text-gray-300'
                                      }`}
                                      onClick={() => handleRateMember(member.id, rating)}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm ml-1">({member.rating})</span>
                              </div>

                              {/* 操作按鈕 */}
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant={member.isBlocked ? "outline" : "destructive"}
                                  onClick={() => handleBlockMember(member.id)}
                                >
                                  {member.isBlocked ? (
                                    <>
                                      <UserCheck className="h-4 w-4 mr-1" />
                                      解除屏蔽
                                    </>
                                  ) : (
                                    <>
                                      <Ban className="h-4 w-4 mr-1" />
                                      屏蔽
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* 建立私人聊天室模態框 */}
        {showCreateRoomModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>建立私人聊天室</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">聊天室名稱</label>
                  <Input
                    placeholder="輸入聊天室名稱..."
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">邀請成員</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {members.filter(m => m.name !== user?.name).map(member => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={member.id}
                          checked={selectedMembers.includes(member.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMembers(prev => [...prev, member.name]);
                            } else {
                              setSelectedMembers(prev => prev.filter(name => name !== member.name));
                            }
                          }}
                        />
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <label htmlFor={member.id} className="text-sm cursor-pointer">
                          {member.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateRoomModal(false);
                      setNewRoomName('');
                      setSelectedMembers([]);
                    }}
                  >
                    取消
                  </Button>
                  <Button onClick={handleCreatePrivateRoom}>
                    建立聊天室
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 新增分類模態框 */}
        {showCategoryModal && isModerator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>新增討論分類</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">分類名稱</label>
                  <Input
                    placeholder="輸入分類名稱..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCategoryModal(false);
                      setNewCategoryName('');
                    }}
                  >
                    取消
                  </Button>
                  <Button onClick={handleAddCategory}>
                    新增分類
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
