import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { useModal } from '@/contexts/ModalContext';
import { 
  CheckCircle, 
  Share2, 
  Eye, 
  BarChart3, 
  Users,
  ArrowRight
} from 'lucide-react';

export default function CoursePublished() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useModal();
  
  const courseTitle = location.state?.courseTitle || '您的課程';
  const lessonCount = location.state?.lessonCount || 0;

  const handleShare = () => {
    // 模擬分享功能
    if (navigator.share) {
      navigator.share({
        title: courseTitle,
        text: `我剛在學��無界發布了新課程：${courseTitle}`,
        url: window.location.origin + '/courses/new-course'
      });
    } else {
      // 複製到剪貼簿
      navigator.clipboard.writeText(window.location.origin + '/courses/new-course');
      showAlert('課程連結已複製到剪貼簿', 'success');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-success">
              課程發布成功！
            </h1>
            <p className="text-lg text-muted-foreground">
              恭喜您成功發布了第一門課程
            </p>
          </div>

          {/* Course Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">{courseTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{lessonCount}</div>
                  <div className="text-sm text-muted-foreground">課程數量</div>
                </div>
                <div className="p-4 bg-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success">已上線</div>
                  <div className="text-sm text-muted-foreground">發布狀態</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold mb-4">接下來您可以：</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Eye className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-medium mb-2">預覽課程</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    查看學員看到的課程頁面
                  </p>
                  <Button variant="outline" size="sm">
                    立即預覽
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Share2 className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-medium mb-2">分享課程</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    分享給朋友和社群媒體
                  </p>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    立即分享
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-medium mb-2">查看數據</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    追蹤課程表現和收益
                  </p>
                  <Button variant="outline" size="sm">
                    查看統計
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-medium mb-2">管理學員</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    與學員互動和回答問題
                  </p>
                  <Button variant="outline" size="sm">
                    學員管理
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full md:w-auto"
              onClick={() => navigate('/create-course')}
            >
              創建另一門課程
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
              >
                返回首頁
              </Button>
            </div>
          </div>

          {/* Tips */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3 text-blue-900">💡 講師小貼士</h3>
              <ul className="text-sm text-blue-700 space-y-2 text-left">
                <li>• 定期更新課程內容，保持新鮮度</li>
                <li>• 積極回應學員問題，提高課程評價</li>
                <li>• 透過數據分析了解學員需求</li>
                <li>• 考慮開設進階課程形成系列</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
