import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import ShareCourse from '@/components/ShareCourse';
import {
  Star,
  Users,
  Clock,
  Play,
  CheckCircle,
  UserPlus,
  Eye,
  ChevronRight,
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  BookOpen,
  Video,
  User,
  HelpCircle
} from 'lucide-react';

export default function CourseLearning() {
  const { id } = useParams();
  
  // 模擬課程學習資料
  const course = {
    id: 999,
    title: "金流測試課程 - PayPal 支付系統驗證",
    subtitle: "專門用於測試PayPal金流系統的課程",
    instructor: {
      name: "系統管理員",
      title: "系統測試工程師",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "擁有10年系統開發經驗，專精於支付系統架構設計與測試。",
      students: 5000,
      courses: 12,
      rating: 4.9
    },
    rating: 5.0,
    reviews: 21,
    followers: 50,
    students: 25,
    price: 1,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    category: "系統測試",
    level: "初級",
    duration: "5分鐘",
    progress: 0,
    totalLessons: 5,
    completedLessons: 0,
    description: "這是專門用於測試PayPal金流系統的測試課程，價格設定為NT$1，用於驗證支付流程是否正常運作。課程內容簡單，主要目的是測試金流功能。",
    whatYouLearn: [
      "了解PayPal支付流程",
      "測試金流系統運作", 
      "驗證支付成功流程",
      "學習線上支付安全",
      "體驗購課流程"
    ],
    curriculum: [
      { id: 1, title: "課程介紹", duration: "1分鐘", completed: false, preview: true },
      { id: 2, title: "PayPal基本概念", duration: "1分鐘", completed: false, preview: false },
      { id: 3, title: "支付流程測試", duration: "1分鐘", completed: false, preview: false },
      { id: 4, title: "安全性驗證", duration: "1分鐘", completed: false, preview: false },
      { id: 5, title: "總結與測驗", duration: "1分鐘", completed: false, preview: false }
    ],
    faqs: [
      {
        question: "這個課程適合��學習？",
        answer: "適合想要了解線上支付系統的初學者，以及需要測試PayPal金流功能的開發者。"
      },
      {
        question: "課程完成後會有證書嗎？",
        answer: "是的，完成所有課程內容並通過測驗後，您將獲得完成證書。"
      },
      {
        question: "如果遇到支付問題該怎麼辦？",
        answer: "請聯繫客服，我們會協助您解決支付相關問題。"
      }
    ]
  };

  const [activeTab, setActiveTab] = useState("overview");

  const handleFollow = () => {
    // 追蹤功能
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/courses/purchased" className="hover:text-primary flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            我的課程
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">課程學習</span>
        </nav>

        {/* 上方區塊 */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* 左側 - 課程主要圖片 */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden bg-black aspect-video mb-4">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button size="lg" className="rounded-full h-16 w-16 p-0">
                  <Play className="h-6 w-6 ml-1" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary">課程預覽</Badge>
              </div>
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-black/50 text-white border-0">
                  {course.duration}
                </Badge>
              </div>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.subtitle}</p>
          </div>

          {/* 右側 - 課程資訊與互動 */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* 評價與統計 */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviews} 則評價)</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{course.followers} 人追蹤</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{course.students} 人學習</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>總時長 {course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* 學習進度 */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>學習進度</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 mb-2" />
                  <div className="text-xs text-muted-foreground">
                    {course.completedLessons}/{course.totalLessons} 課程完成
                  </div>
                </div>

                {/* 互動按鈕 */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleFollow}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    追蹤
                  </Button>
                  
                  <ShareCourse
                    courseId={course.id.toString()}
                    courseTitle={course.title}
                    fullWidth={true}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 下方頁籤區塊 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              課程總覽
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              課程介紹
            </TabsTrigger>
            <TabsTrigger value="instructor" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              講師介紹
            </TabsTrigger>
            <TabsTrigger value="qa" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              課程問答
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              免費試看
            </TabsTrigger>
          </TabsList>

          {/* 課程總覽 */}
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>課程大綱</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.curriculum.map((lesson, index) => (
                    <div 
                      key={lesson.id}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        lesson.completed ? 'bg-success/10 border-success/20' : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          lesson.completed 
                            ? 'bg-success text-white' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {lesson.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.preview && (
                          <Badge variant="outline" className="text-xs">
                            免費試看
                          </Badge>
                        )}
                        <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                          {lesson.completed ? "重新觀看" : "開始學習"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 課程介紹 */}
          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>關於這門課程</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">課程描述</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">學習收穫</h3>
                  <ul className="space-y-3">
                    {course.whatYouLearn.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">課程詳情</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">總時長：{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{course.totalLessons} 個課程</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 講師介紹 */}
          <TabsContent value="instructor" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>講師資訊</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={course.instructor.avatar} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{course.instructor.name}</h3>
                    <p className="text-muted-foreground mb-3">{course.instructor.title}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{course.instructor.rating}</div>
                        <div className="text-xs text-muted-foreground">講師評分</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{course.instructor.students.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">學生人數</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{course.instructor.courses}</div>
                        <div className="text-xs text-muted-foreground">課程數量</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {course.instructor.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 課程問答 */}
          <TabsContent value="qa" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  常見問題
                  <Button size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    提問
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {course.faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-medium mb-2 flex items-start gap-2">
                        <HelpCircle className="h-4 w-4 mt-1 text-primary shrink-0" />
                        {faq.question}
                      </h4>
                      <p className="text-muted-foreground text-sm pl-6">
                        {faq.answer}
                      </p>
                      <div className="flex items-center gap-4 mt-3 pl-6">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          有幫助 (5)
                        </Button>
                        <Button variant="ghost" size="sm">
                          回覆
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 免費試看 */}
          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>免費試看</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.curriculum
                    .filter(lesson => lesson.preview)
                    .map((lesson) => (
                      <div 
                        key={lesson.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Video className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{lesson.title}</h4>
                            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                        <Button>
                          <Play className="h-4 w-4 mr-2" />
                          免費觀看
                        </Button>
                      </div>
                    ))}
                  
                  {course.curriculum.filter(lesson => lesson.preview).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>目前沒有免費試看內容</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
