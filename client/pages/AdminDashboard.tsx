import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import Layout from '@/components/Layout';
import {
  Shield,
  Users,
  MessageSquare,
  AlertTriangle,
  Check,
  X,
  Eye,
  Clock,
  Ban,
  Flag,
  Settings,
  BarChart3
} from 'lucide-react';

interface PendingCommunity {
  id: string;
  name: string;
  description: string;
  category: string;
  createdBy: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  image: string;
}

interface PendingPost {
  id: string;
  title: string;
  content: string;
  author: string;
  communityName: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ReportedContent {
  id: string;
  type: 'community' | 'post' | 'user';
  content: string;
  reportedBy: string;
  reason: string;
  createdAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const { showAlert } = useModal();
  
  // 檢查管理員權限
  const isAdmin = user?.email === 'admin@example.com' || user?.role === 'admin';
  
  const [activeTab, setActiveTab] = useState('communities');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);

  // 模擬待審核社群
  const [pendingCommunities, setPendingCommunities] = useState<PendingCommunity[]>([
    {
      id: '1',
      name: 'Vue.js 學習社群',
      description: '專注於 Vue.js 框架的學習和討論',
      category: '程式設計',
      createdBy: '前端新手',
      createdAt: '2024-03-10',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'AI 繪圖交流',
      description: '分享 AI 繪圖工具使用心得和作品',
      category: '設計創作',
      createdBy: 'AI藝術家',
      createdAt: '2024-03-11',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=200&fit=crop'
    }
  ]);

  // 模擬待審核文章
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([
    {
      id: '1',
      title: 'React Native vs Flutter 比較',
      content: '最近在研究跨平台開發框架，想分享一下 React Native 和 Flutter 的比較...',
      author: '行動開發者',
      communityName: 'React 開發者社群',
      createdAt: '2024-03-12',
      status: 'pending'
    },
    {
      id: '2',
      title: 'JavaScript 效能優化技巧',
      content: '分享一些 JavaScript 效能優化的實用技巧...',
      author: 'JS專家',
      communityName: 'Frontend 開發社群',
      createdAt: '2024-03-12',
      status: 'pending'
    }
  ]);

  // 模擬舉報內容
  const [reportedContent, setReportedContent] = useState<ReportedContent[]>([
    {
      id: '1',
      type: 'post',
      content: '某篇文章涉嫌廣告內容',
      reportedBy: '用戶A',
      reason: '廣告垃圾訊息',
      createdAt: '2024-03-12',
      status: 'pending'
    }
  ]);

  const handleApproveCommunity = (id: string) => {
    setPendingCommunities(prev => 
      prev.map(community => 
        community.id === id ? { ...community, status: 'approved' } : community
      )
    );
    showAlert('社群已審核通過', 'success');
  };

  const handleRejectCommunity = (id: string) => {
    if (!rejectReason.trim()) {
      showAlert('請填寫拒絕原因', 'error');
      return;
    }

    setPendingCommunities(prev => 
      prev.map(community => 
        community.id === id ? { ...community, status: 'rejected' } : community
      )
    );
    
    // 記錄拒絕原因到系統日誌
    console.log(`社群 ${id} 被拒絕，原因：${rejectReason}`);
    
    setShowRejectModal(null);
    setRejectReason('');
    showAlert('社群已拒絕，用戶將收到通知', 'info');
  };

  const handleApprovePost = (id: string) => {
    setPendingPosts(prev => 
      prev.map(post => 
        post.id === id ? { ...post, status: 'approved' } : post
      )
    );
    showAlert('文章已審核通過', 'success');
  };

  const handleRejectPost = (id: string) => {
    setPendingPosts(prev => 
      prev.map(post => 
        post.id === id ? { ...post, status: 'rejected' } : post
      )
    );
    showAlert('文章已拒絕', 'info');
  };

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">權限不足</h2>
              <p className="text-muted-foreground">您沒有管理員權限</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            系統管理後台
          </h1>
          <p className="text-muted-foreground">管理社群、審核內容和處理用戶舉報</p>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{pendingCommunities.filter(c => c.status === 'pending').length}</div>
              <div className="text-sm text-muted-foreground">待審核社群</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{pendingPosts.filter(p => p.status === 'pending').length}</div>
              <div className="text-sm text-muted-foreground">待審核文章</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Flag className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{reportedContent.filter(r => r.status === 'pending').length}</div>
              <div className="text-sm text-muted-foreground">待處理舉報</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">1,250</div>
              <div className="text-sm text-muted-foreground">活躍用戶</div>
            </CardContent>
          </Card>
        </div>

        {/* 管理頁籤 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="communities">社群審核</TabsTrigger>
            <TabsTrigger value="posts">文章審核</TabsTrigger>
            <TabsTrigger value="reports">舉報處理</TabsTrigger>
          </TabsList>

          {/* 社群審核 */}
          <TabsContent value="communities" className="mt-6">
            <div className="space-y-4">
              {pendingCommunities.filter(c => c.status === 'pending').map((community) => (
                <Card key={community.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{community.name}</h3>
                          <Badge>{community.category}</Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{community.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>創建者：{community.createdBy}</span>
                          <span>申請時間：{community.createdAt}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveCommunity(community.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          通過
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setShowRejectModal(community.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          拒絕
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {pendingCommunities.filter(c => c.status === 'pending').length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
                    <p className="text-muted-foreground">沒有待審核的社群</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* 文章審核 */}
          <TabsContent value="posts" className="mt-6">
            <div className="space-y-4">
              {pendingPosts.filter(p => p.status === 'pending').map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{post.content}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>作者：{post.author}</span>
                          <span>社群：{post.communityName}</span>
                          <span>發布時間：{post.createdAt}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button 
                          size="sm" 
                          onClick={() => handleApprovePost(post.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          通過
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectPost(post.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          拒絕
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {pendingPosts.filter(p => p.status === 'pending').length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
                    <p className="text-muted-foreground">沒有待審核的文章</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* 舉報處理 */}
          <TabsContent value="reports" className="mt-6">
            <div className="space-y-4">
              {reportedContent.filter(r => r.status === 'pending').map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{report.type === 'post' ? '文章' : report.type === 'community' ? '社群' : '用戶'}</Badge>
                          <Badge variant="destructive">{report.reason}</Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{report.content}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>舉報者：{report.reportedBy}</span>
                          <span>舉報時間：{report.createdAt}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          查看
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Ban className="h-4 w-4 mr-1" />
                          處罰
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {reportedContent.filter(r => r.status === 'pending').length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
                    <p className="text-muted-foreground">沒有待處理的舉報</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* 拒絕社群模態框 */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>拒絕社群申請</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  請說明拒絕的原因，這將發送給申請者。
                </p>
                <Textarea
                  placeholder="請輸入拒絕原因..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowRejectModal(null);
                      setRejectReason('');
                    }}
                  >
                    取消
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleRejectCommunity(showRejectModal)}
                  >
                    確認拒絕
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
