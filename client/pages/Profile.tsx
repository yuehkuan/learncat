import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import Layout from '@/components/Layout';
import { 
  Camera, 
  Save, 
  Mail, 
  User, 
  FileText,
  Heart,
  Upload
} from 'lucide-react';

interface Interest {
  id: string;
  category: string;
  subcategories: string[];
}

const interests: Interest[] = [
  {
    id: 'programming',
    category: '程式設計',
    subcategories: [
      'Frontend 開發', 'Backend 開發', 'Full Stack 開發', 
      'Mobile App 開發', '遊戲開發', 'DevOps', 
      '資料庫設計', 'API 開發'
    ]
  },
  {
    id: 'design',
    category: '設計創作',
    subcategories: [
      'UI/UX 設計', '平面設計', '��頁設計', 
      '插畫設計', '品牌設計', '3D 設計', 
      '動畫設計', '產品設計'
    ]
  },
  {
    id: 'business',
    category: '商業管理',
    subcategories: [
      '專案管理', '人力資源', '財務管理', 
      '策略規劃', '領導力', '創業', 
      '供應鏈管理', '品質管理'
    ]
  },
  {
    id: 'marketing',
    category: '行銷企劃',
    subcategories: [
      '數位行銷', '社群媒體行銷', '內容行銷', 
      'SEO/SEM', '品牌行銷', '電商行銷', 
      '廣告投放', '市場研究'
    ]
  },
  {
    id: 'data',
    category: '資料科學',
    subcategories: [
      '數據分析', '機器學習', '深度學習', 
      '資料視覺化', '統計學', 'Big Data', 
      'AI 應用', '資料挖掘'
    ]
  },
  {
    id: 'language',
    category: '語言學習',
    subcategories: [
      '英語', '日語', '韓語', 
      '西班牙語', '法語', '德語', 
      '中文', '程式語言'
    ]
  },
  {
    id: 'creative',
    category: '創意技能',
    subcategories: [
      '攝影', '影片製作', '音樂製作', 
      '寫作', '繪畫', '手工藝', 
      '料理', '園藝'
    ]
  },
  {
    id: 'personal',
    category: '個人發展',
    subcategories: [
      '時間管理', '溝通技巧', '簡報技巧', 
      '心理學', '投資理財', '健康管理', 
      '生活規劃', '職涯發展'
    ]
  }
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { showAlert } = useModal();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>(user?.interests || []);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Load user data when component mounts or user changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
      setSelectedInterests(user.interests || []);
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 檢��檔案類型
      if (!file.type.startsWith('image/')) {
        showAlert('請選擇圖片檔案', 'error');
        return;
      }

      // 檢查檔案大小 (限制 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showAlert('圖片檔案大小不能超過 5MB', 'error');
        return;
      }

      setAvatarFile(file);
      
      // 創建預覽 URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests(prev => [...prev, interestId]);
    } else {
      setSelectedInterests(prev => prev.filter(id => id !== interestId));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // 模擬保存過程
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 如果有上傳頭像，使用預覽 URL
      let finalAvatar = formData.avatar;
      if (avatarPreview) {
        finalAvatar = avatarPreview;
      }

      // 更新用戶資料
      const updatedData = {
        name: formData.name,
        bio: formData.bio,
        avatar: finalAvatar,
        interests: selectedInterests
      };

      updateUser(updatedData);

      // 清空檔案預覽
      setAvatarFile(null);
      setAvatarPreview(null);

      showAlert('個人資料已更新！', 'success');
    } catch (error) {
      showAlert('保存失敗，請稍後再試', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">請先登入查看個人資料</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <User className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">個人資料</h1>
              <p className="text-muted-foreground">管理您的帳戶資訊和偏好設定</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Avatar Section */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    頭像設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={avatarPreview || formData.avatar} />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {formData.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>點擊相機圖示上傳新頭像</p>
                    <p>支援 JPG, PNG 格式，大小限制 5MB</p>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    基本資訊
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">暱稱</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="請輸入您的暱稱"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          value={user.email}
                          disabled
                          className="bg-muted"
                        />
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Email 無法修改
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">個人簡介</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="介紹一下您自己..."
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.bio.length}/500 字元
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    學習興趣
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    選擇您感興趣的學習領域，我們會為您推薦相關課程
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {interests.map((interest) => (
                      <div key={interest.id} className="space-y-3">
                        <h3 className="font-medium text-lg">{interest.category}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {interest.subcategories.map((subcategory) => {
                            const interestKey = `${interest.id}-${subcategory}`;
                            return (
                              <div key={interestKey} className="flex items-center space-x-2">
                                <Checkbox
                                  id={interestKey}
                                  checked={selectedInterests.includes(interestKey)}
                                  onCheckedChange={(checked) => 
                                    handleInterestChange(interestKey, checked as boolean)
                                  }
                                />
                                <label 
                                  htmlFor={interestKey} 
                                  className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {subcategory}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedInterests.length > 0 && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-3">已選擇的興趣 ({selectedInterests.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedInterests.map((interestKey) => {
                          const [categoryId, subcategory] = interestKey.split('-');
                          const category = interests.find(i => i.id === categoryId);
                          return (
                            <Badge key={interestKey} variant="secondary" className="text-xs">
                              {category?.category}: {subcategory}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving}
                  size="lg"
                  className="px-8"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                      儲存中...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      儲存變更
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
