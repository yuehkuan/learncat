import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import Layout from '@/components/Layout';
import {
  ArrowLeft,
  Upload,
  Users,
  Eye,
  AlertTriangle,
  Check
} from 'lucide-react';

export default function CreateCommunity() {
  const { user } = useAuth();
  const { showAlert } = useModal();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    rules: '',
    isPublic: 'public',
    image: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = [
    '程式設計',
    '設計創作',
    '資料科學',
    '商業管理',
    '語言學習',
    '行銷企劃',
    '其他'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showAlert('請選擇圖片檔案', 'error');
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        showAlert('圖片檔案大小不能超過 2MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showAlert('請先登入', 'error');
      navigate('/login');
      return;
    }

    if (!formData.name || !formData.description || !formData.category) {
      showAlert('請填寫所有必填欄位', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 模擬API調用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模擬提交到審核系統
      console.log('提交社群申請:', {
        ...formData,
        createdBy: user.id,
        status: 'pending_review',
        createdAt: new Date().toISOString()
      });
      
      showAlert('社群申請已提交！請等待管理員審核，審核通過後您將收到通知。', 'success');
      navigate('/community');
    } catch (error) {
      showAlert('建立失敗，請稍後再試', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">需要登入</h2>
              <p className="text-muted-foreground mb-4">建立社群前請先登入您的帳戶</p>
              <Button onClick={() => navigate('/login')}>
                前往登入
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/community')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">建立學習社群</h1>
              <p className="text-muted-foreground">創建一個新的學習社群，與同好一起成長</p>
            </div>
          </div>

          {/* 審核提醒 */}
          <Card className="mb-6 border-warning/20 bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-warning mb-1">審核機制說明</h3>
                  <p className="text-sm text-muted-foreground">
                    為維護社群品質，所有新建立的社群都需要經過管理員審核。
                    審核通過後，您將成為該社群的版主，並可以開始管理社群內容。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* 基本資訊 */}
              <Card>
                <CardHeader>
                  <CardTitle>基本資訊</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">社群名稱 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="請輸入社群名稱"
                      maxLength={50}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.name.length}/50 字元
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description">社群描述 *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="請描述這個社群的目的和特色..."
                      rows={4}
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.description.length}/500 字元
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="category">社群分類 *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="請選擇社群分類" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tags">標籤</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="請輸入相關標籤，用逗號分隔 (例: React, JavaScript, 前端)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      用逗號分隔多個標籤，最多 10 個
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 社群圖片 */}
              <Card>
                <CardHeader>
                  <CardTitle>社群圖片</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      {imagePreview ? (
                        <div className="space-y-4">
                          <img 
                            src={imagePreview} 
                            alt="預覽" 
                            className="w-32 h-32 object-cover rounded-lg mx-auto"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setImagePreview(null);
                              setFormData(prev => ({ ...prev, image: '' }));
                            }}
                          >
                            移除圖片
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">上傳社群圖片</p>
                            <p className="text-xs text-muted-foreground">
                              支援 JPG, PNG 格式，建議尺寸 400x200px，大小限制 2MB
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                          >
                            選擇圖片
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 社群規則 */}
              <Card>
                <CardHeader>
                  <CardTitle>社群規則</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="rules">社群規則與準則</Label>
                    <Textarea
                      id="rules"
                      value={formData.rules}
                      onChange={(e) => handleInputChange('rules', e.target.value)}
                      placeholder="請設定社群的討論規則和行為準則..."
                      rows={6}
                      maxLength={1000}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.rules.length}/1000 字元
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 隱私設定 */}
              <Card>
                <CardHeader>
                  <CardTitle>隱私設定</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>社群類型</Label>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="public"
                          name="privacy"
                          value="public"
                          checked={formData.isPublic === 'public'}
                          onChange={(e) => handleInputChange('isPublic', e.target.value)}
                        />
                        <label htmlFor="public" className="flex items-center space-x-2 cursor-pointer">
                          <Eye className="h-4 w-4" />
                          <div>
                            <div className="font-medium">公開社群</div>
                            <div className="text-xs text-muted-foreground">
                              任何人都可以找到並加入這個社群
                            </div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="private"
                          name="privacy"
                          value="private"
                          checked={formData.isPublic === 'private'}
                          onChange={(e) => handleInputChange('isPublic', e.target.value)}
                        />
                        <label htmlFor="private" className="flex items-center space-x-2 cursor-pointer">
                          <Users className="h-4 w-4" />
                          <div>
                            <div className="font-medium">私人社群</div>
                            <div className="text-xs text-muted-foreground">
                              需要申請或邀請才能加入
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 提交按鈕 */}
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/community')}
                >
                  取消
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                      提交審核中...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      提交審核
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
