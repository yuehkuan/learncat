import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import ShareCourse from "@/components/ShareCourse";
import { usePayment } from "@/contexts/PaymentContext";
import { useModal } from "@/contexts/ModalContext";
import {
  Star,
  Users,
  Clock,
  Play,
  CheckCircle,
  ChevronRight,
  Heart,
  Eye,
  UserPlus
} from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = usePayment();
  const { showAlert } = useModal();

  // 模擬課程資料庫
  const courses = {
    "999": {
      id: 999,
      title: "金流測試課程 - PayPal 支付系統驗證",
      subtitle: "專門用於測試PayPal金流系統的課程",
      instructor: {
        name: "系統管理員",
        title: "系統測試工程師"
      },
      rating: 5.0,
      reviews: 1,
      students: 1,
      price: 1,
      originalPrice: 100,
      video: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
      category: "系統測試",
      level: "初級",
      duration: "5分鐘",
      lectures: 5,
      language: "繁體中文",
      lastUpdated: "2024年3月",
      description: "這是專門用於測試PayPal金流系統的測試課程，價格設定為NT$1，用於驗證支付流程是否正常運作。課程內容簡單，主要目的是測試金流功能。",
      whatYouLearn: [
        "了解PayPal支付流程",
        "測試金流系統運作",
        "驗證支付成功流程",
        "學習線上支付安全",
        "體驗購課流程"
      ],
      followers: 50,
      purchaseCount: 25
    },
    "1": {
      id: 1,
      title: "React 完整開發指南 - 從零基礎到專案實戰",
      subtitle: "掌握現代前端開發技術，成為 React 專家",
      instructor: {
        name: "王小明",
        title: "資深前端工程師"
      },
      rating: 4.9,
      reviews: 2847,
      students: 15420,
      price: 1899,
      originalPrice: 2999,
      video: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
      category: "程式設計",
      level: "中級",
      duration: "24小時",
      lectures: 156,
      language: "繁體中文",
      lastUpdated: "2024年1月",
      description: "這是一門完整的 React 開發課程，從基礎概念到進階應用，讓你掌握現代前端開發的核心技術。課程包含大量實戰專案，幫助你建立真正的開發能力。",
      whatYouLearn: [
        "掌握 React 基礎概念與核心原理",
        "學會使用 React Hooks 管理狀態",
        "了解 React Router 路由設計",
        "掌握狀態管理工具 Redux/Zustand",
        "學習現代開發工具與最佳實踐",
        "完成多個實戰專案作品集"
      ],
      followers: 2847,
      purchaseCount: 15420
    }
  };

  const course = courses[id as keyof typeof courses] || courses["1"];

  const handleBuyNow = () => {
    navigate('/checkout', {
      state: {
        course: {
          id: course.id.toString(),
          title: course.title,
          price: course.price,
          image: course.video,
          instructor: course.instructor.name
        }
      }
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: course.id.toString(),
      title: course.title,
      price: course.price,
      image: course.video,
      instructor: course.instructor.name,
      quantity: 1
    });
    showAlert('課程已加入購物車！', 'success');
  };

  const handleFollow = () => {
    showAlert('已追蹤課程！', 'success');
  };

  const handleFavorite = () => {
    showAlert('已加入最愛！', 'success');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">首頁</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/courses" className="hover:text-primary">課程</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{course.category}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary text-primary-foreground">
                  {course.category}
                </Badge>
                <Badge variant="secondary">{course.level}</Badge>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{course.subtitle}</p>
              
              <div className="flex items-center gap-6 text-sm flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviews.toLocaleString()} 評價)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{course.followers?.toLocaleString() || 0} 追蹤人數</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.purchaseCount?.toLocaleString() || course.students.toLocaleString()} 購買人數</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <span className="text-sm">講師：{course.instructor.name}</span>
                <span className="text-sm text-muted-foreground">
                  ���後更新：{course.lastUpdated}
                </span>
              </div>
            </div>

            {/* Video Preview */}
            <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
              <img 
                src={course.video} 
                alt="課程預覽"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button size="lg" className="rounded-full h-16 w-16 p-0">
                  <Play className="h-6 w-6 ml-1" />
                </Button>
              </div>
              <div className="absolute bottom-4 right-4">
                <Badge variant="secondary">課程預覽</Badge>
              </div>
            </div>

            {/* Course Overview */}
            <Card>
              <CardHeader>
                <CardTitle>課程簡介</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {course.description}
                </p>

                <h3 className="text-lg font-semibold mb-4">學習收穫</h3>
                <ul className="space-y-3 mb-6">
                  {course.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* 課程資訊下方的按鈕 */}
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-3">課程互動</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" onClick={handleFollow}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      追蹤
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleFavorite}>
                      <Heart className="h-4 w-4 mr-2" />
                      設為最愛
                    </Button>
                    <ShareCourse courseId={course.id.toString()} courseTitle={course.title} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Purchase Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-primary">
                        NT$ {course.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        NT$ {course.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-success">
                      限時優惠 {Math.round((1 - course.price / course.originalPrice) * 100)}% 折扣
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleBuyNow}
                    >
                      立即購買
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      onClick={handleAddToCart}
                    >
                      加入購物車
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Course Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">課程資訊</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{course.duration} 影片內容</div>
                      <div className="text-sm text-muted-foreground">{course.lectures} 個講座</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">語言</div>
                      <div className="text-sm text-muted-foreground">{course.language}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
