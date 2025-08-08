import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { usePayment } from "@/contexts/PaymentContext";
import { useModal } from "@/contexts/ModalContext";
import {
  BookOpen,
  Users,
  Trophy,
  Star,
  Play,
  Clock,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  Globe,
  Heart,
  ShoppingCart
} from "lucide-react";

export default function Index() {
  const { addToCart } = usePayment();
  const { showAlert } = useModal();

  const handleAddToCart = (course: any) => {
    addToCart({
      id: course.id.toString(),
      title: course.title,
      price: course.price,
      image: course.image,
      instructor: course.instructor,
      quantity: 1
    });
    showAlert('課程已加入購物車！', 'success');
  };

  const handleAddToWishlist = (course: any) => {
    showAlert('課程已加入追蹤！', 'success');
  };

  // 模擬課程資料
  const featuredCourses = [
    {
      id: 1,
      title: "React 完整開發指南",
      instructor: "王小明",
      rating: 4.9,
      students: 15420,
      price: 1899,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      category: "程式設計",
      level: "中級",
      duration: "24小時"
    },
    {
      id: 2,
      title: "UI/UX 設計從零開始",
      instructor: "李美慧",
      rating: 4.8,
      students: 8750,
      price: 1499,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
      category: "設計創作",
      level: "初級",
      duration: "18小時"
    },
    {
      id: 3,
      title: "Python 數據分析實戰",
      instructor: "陳志強",
      rating: 4.7,
      students: 12300,
      price: 2199,
      originalPrice: 3299,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      category: "資料科學",
      level: "中級",
      duration: "32小時"
    },
    {
      id: 4,
      title: "商業策略與創新思維",
      instructor: "張經理",
      rating: 4.6,
      students: 6850,
      price: 1699,
      originalPrice: 2499,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      category: "商業管理",
      level: "高級",
      duration: "16小時"
    }
  ];

  const categories = [
    { name: "程式設計", count: 1250, icon: "💻" },
    { name: "設計創作", count: 890, icon: "🎨" },
    { name: "商業管理", count: 650, icon: "📊" },
    { name: "語言學習", count: 420, icon: "🌍" },
    { name: "資料科學", count: 380, icon: "📈" },
    { name: "行銷企劃", count: 320, icon: "📊" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  學習無界限
                  <span className="block text-3xl lg:text-5xl text-primary-foreground/80">
                    開啟你的學習之旅
                  </span>
                </h1>
                <p className="text-xl text-primary-foreground/90 max-w-2xl">
                  超過 10,000 門優質課程，由頂尖講師親自授課。無論你想學習什麼，我們都有適合的課程等著你。
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  開始探索課程
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-100">
                  觀看介紹影片
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">10,000+</div>
                  <div className="text-primary-foreground/80">優質課程</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500,000+</div>
                  <div className="text-primary-foreground/80">學習人次</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1,200+</div>
                  <div className="text-primary-foreground/80">專業講師</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                  alt="學習情境" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">精選熱門課程</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              從數千門課程中精心挑選，這些是學員���價最高、最受歡迎的課程
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      {course.category}
                    </Badge>
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  {/* 價格區域往上移 */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        NT$ {course.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        NT$ {course.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {/* 按鈕區域 */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-2">
                      <Link to={`/courses/${course.id}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          課程詳情
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddToWishlist(course)}
                        className="px-3"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddToCart(course)}
                        className="px-3"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/courses">
              <Button variant="outline" size="lg">
                查看所有課程
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">熱門學習分類</h2>
            <p className="text-lg text-muted-foreground">
              探索各種專業領域，找到最適合你的學習方向
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/courses/${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md group-hover:scale-105">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} 門課程
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">為什麼選擇學習無界？</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我們提供完整的學習生態系統，讓你的學習之路更加順暢
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">��尖講師</h3>
              <p className="text-muted-foreground">
                來自業界的專家講解，分享實戰經驗與最新知識
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">學習社群</h3>
              <p className="text-muted-foreground">
                與志同道合的學員一起學習，互相鼓勵成長
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">認證證書</h3>
              <p className="text-muted-foreground">
                完成課程後獲得專業認證，提升職場競爭力
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">隨時隨地</h3>
              <p className="text-muted-foreground">
                支援多平台學習，讓你隨時隨地都能提升自己
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            準備好開始你的學習之旅了嗎？
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            加入超過 50 萬名學員的行列，開始你的技能提升之路
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/register">免費註冊</Link>
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-100" asChild>
              <Link to="/create-course">我要開課</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
