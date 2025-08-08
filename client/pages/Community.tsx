import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import Layout from '@/components/Layout';
import {
  Users,
  Plus,
  Search,
  MessageCircle,
  Eye,
  Filter,
  TrendingUp,
  Clock,
  Star,
  Shield,
  Hash,
  ChevronRight
} from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  postCount: number;
  image: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  tags: string[];
  isJoined: boolean;
  lastActivity: string;
  moderators: string[];
}

export default function Community() {
  const { user } = useAuth();
  const { showAlert } = useModal();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // 模擬社群資料
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: '1',
      name: 'React 開發者社群',
      description: '討論 React 開發技巧、最佳實踐和最新趨勢',
      category: '程式設計',
      memberCount: 1250,
      postCount: 3420,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      isActive: true,
      createdBy: 'React專家',
      createdAt: '2024-01-15',
      tags: ['React', 'JavaScript', 'Frontend'],
      isJoined: true,
      lastActivity: '2小時前',
      moderators: ['React專家', '前端大師']
    },
    {
      id: '2', 
      name: 'UI/UX 設計師交流',
      description: '分享設計靈感、工具使用心得與作品展示',
      category: '設計創作',
      memberCount: 890,
      postCount: 2150,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      isActive: true,
      createdBy: '設計師小美',
      createdAt: '2024-01-20',
      tags: ['UI', 'UX', 'Design', 'Figma'],
      isJoined: false,
      lastActivity: '1天前',
      moderators: ['設計師小美']
    },
    {
      id: '3',
      name: 'Python 數據科學',
      description: '探討 Python 在數據分析、機器學習領域的應用',
      category: '資料科學',
      memberCount: 650,
      postCount: 1890,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      isActive: true,
      createdBy: '數據分析師',
      createdAt: '2024-02-01',
      tags: ['Python', 'Data Science', 'ML', 'AI'],
      isJoined: false,
      lastActivity: '3小時前',
      moderators: ['數據分析師', 'AI研究員']
    },
    {
      id: '4',
      name: '創業與商業策略',
      description: '討論創業經驗、商業模式和市場策略',
      category: '商業管理',
      memberCount: 420,
      postCount: 980,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      isActive: true,
      createdBy: '創業導師',
      createdAt: '2024-02-10',
      tags: ['創業', '商業策略', '投資', '管理'],
      isJoined: true,
      lastActivity: '5小時前',
      moderators: ['創業導師']
    }
  ]);

  const categories = ['all', '程式設計', '設計創作', '資料科學', '商業管理', '語言學習', '其他'];

  const handleCreateCommunity = () => {
    if (!user) {
      showAlert('請先登入才能建立社群', 'warning');
      navigate('/login');
      return;
    }
    navigate('/community/create');
  };

  const handleJoinCommunity = (communityId: string) => {
    if (!user) {
      showAlert('請先登入才能加入社群', 'warning');
      navigate('/login');
      return;
    }
    
    setCommunities(prev => 
      prev.map(community => 
        community.id === communityId 
          ? { ...community, isJoined: !community.isJoined, memberCount: community.isJoined ? community.memberCount - 1 : community.memberCount + 1 }
          : community
      )
    );
    
    const community = communities.find(c => c.id === communityId);
    showAlert(
      community?.isJoined ? '已退出社群' : '已加入社群！', 
      community?.isJoined ? 'info' : 'success'
    );
  };

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    return matchesSearch && matchesCategory && community.isActive;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">學習社群</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            與全球學習者連結，分享知識、互相激勵，一起成長
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜尋社群名稱、描述或標籤..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">所有���類</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <Button onClick={handleCreateCommunity} className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              建立社群
            </Button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{communities.reduce((sum, c) => sum + c.memberCount, 0).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">總成員數</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{communities.reduce((sum, c) => sum + c.postCount, 0).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">討論文章</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Hash className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{communities.length}</div>
              <div className="text-sm text-muted-foreground">活躍社群</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-muted-foreground">本週新社群</div>
            </CardContent>
          </Card>
        </div>

        {/* Community List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={community.image} 
                    alt={community.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {community.category}
                  </Badge>
                  {community.isJoined && (
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      已加入
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {community.name}
                  </h3>
                  {community.moderators.length > 0 && (
                    <Shield className="h-4 w-4 text-yellow-500 shrink-0" title="有版主管理" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {community.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {community.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {community.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{community.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{community.memberCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{community.postCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{community.lastActivity}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/community/${community.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      進入社群
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  <Button 
                    variant={community.isJoined ? "secondary" : "default"}
                    onClick={() => handleJoinCommunity(community.id)}
                    className="shrink-0"
                  >
                    {community.isJoined ? '已加入' : '加入'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">找不到符合條件的社群</h3>
            <p className="text-muted-foreground mb-4">
              嘗試調整搜尋條件，或者建立一個新的社群
            </p>
            <Button onClick={handleCreateCommunity}>
              <Plus className="h-4 w-4 mr-2" />
              建���社群
            </Button>
          </div>
        )}

        {/* Popular Topics */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">熱門話題標籤</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Python', 'UI設計', 'JavaScript', '機器學習', 'Vue.js', 'Node.js', '創業', 'Figma', 'TypeScript'].map((tag) => (
              <Button 
                key={tag} 
                variant="outline" 
                size="sm"
                onClick={() => setSearchQuery(tag)}
                className="text-xs"
              >
                #{tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
