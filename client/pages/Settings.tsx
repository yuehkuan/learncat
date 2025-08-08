import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import Layout from '@/components/Layout';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Globe, 
  Moon,
  Save,
  AlertTriangle
} from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const { showAlert } = useModal();
  
  const [settings, setSettings] = useState({
    notifications: {
      courseUpdates: true,
      newCourses: true,
      marketing: false,
      weeklyDigest: true
    },
    privacy: {
      profileVisible: true,
      showProgress: true,
      allowMessages: true
    },
    preferences: {
      language: 'zh-TW',
      theme: 'light',
      autoplay: true
    }
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // 模擬保存過程
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Saving settings:', settings);
    
    setIsSaving(false);
    showAlert('設定已更新！', 'success');
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">請先登入查看設定</p>
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
            <SettingsIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">帳戶設定</h1>
              <p className="text-muted-foreground">管理您的偏好設定和隱私選項</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  通知設定
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  管理您想要接收的通知類型
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">課程更新通知</Label>
                    <p className="text-sm text-muted-foreground">
                      當您購買的課程有新內容時通知您
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.courseUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('courseUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">新課程推薦</Label>
                    <p className="text-sm text-muted-foreground">
                      根據您的興趣推薦新課程
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.newCourses}
                    onCheckedChange={(checked) => handleNotificationChange('newCourses', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">行銷資訊</Label>
                    <p className="text-sm text-muted-foreground">
                      接收特惠活動和優惠資訊
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">週報摘要</Label>
                    <p className="text-sm text-muted-foreground">
                      每週學習進度和建議摘要
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyDigest}
                    onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  隱私設定
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  控制您的個人資訊顯示方式
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">公開個人資料</Label>
                    <p className="text-sm text-muted-foreground">
                      讓其他用戶能夠查看您的個人資料
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.profileVisible}
                    onCheckedChange={(checked) => handlePrivacyChange('profileVisible', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">顯示學習進度</Label>
                    <p className="text-sm text-muted-foreground">
                      在個人資料中顯示課程完成進度
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.showProgress}
                    onCheckedChange={(checked) => handlePrivacyChange('showProgress', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">允許私人訊息</Label>
                    <p className="text-sm text-muted-foreground">
                      讓其他用戶能夠發送私人訊息給您
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.allowMessages}
                    onCheckedChange={(checked) => handlePrivacyChange('allowMessages', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* General Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  一般偏好
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  自訂您的使用體驗
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base">語言設定</Label>
                    <Select 
                      value={settings.preferences.language} 
                      onValueChange={(value) => handlePreferenceChange('language', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-TW">繁體中文</SelectItem>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base">主題設定</Label>
                    <Select 
                      value={settings.preferences.theme} 
                      onValueChange={(value) => handlePreferenceChange('theme', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">淺色主題</SelectItem>
                        <SelectItem value="dark">深色主題</SelectItem>
                        <SelectItem value="system">跟隨系統</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">自動播放影片</Label>
                    <p className="text-sm text-muted-foreground">
                      課程影片結束後自動播放下一個
                    </p>
                  </div>
                  <Switch
                    checked={settings.preferences.autoplay}
                    onCheckedChange={(checked) => handlePreferenceChange('autoplay', checked.toString())}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  危險操作
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  這些操作無法復原，請謹慎操作
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-destructive/20 rounded-lg">
                  <h3 className="font-medium text-destructive mb-2">刪除帳戶</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    永久刪除您的帳戶和所有相關資料。此操作無法復原。
                  </p>
                  <Button variant="destructive" size="sm">
                    刪除帳戶
                  </Button>
                </div>
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
    </Layout>
  );
}
