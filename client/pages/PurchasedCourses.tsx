import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import {
  Play,
  Clock,
  BookOpen,
  Trophy,
  Download,
  Star
} from 'lucide-react';

export default function PurchasedCourses() {
  // 模擬已購買的課程資料
  const purchasedCourses = [
    {
      id: 999,
      title: "金流測試課程 - PayPal 支付系統驗證",
      instructor: "系統管理員",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      progress: 0,
      totalLessons: 5,
      completedLessons: 0,
      duration: "5分鐘",
      certificate: false,
      rating: 5.0,
      purchaseDate: "2024年3月",
      lastWatched: null
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">我的課程</h1>
            <p className="text-muted-foreground">
              繼續您的學習旅程，追蹤學習進度
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{purchasedCourses.length}</div>
                <div className="text-sm text-muted-foreground">已購買課程</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">
                  {purchasedCourses.reduce((acc, course) => acc + parseInt(course.duration), 0)}分
                </div>
                <div className="text-sm text-muted-foreground">總學習時間</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">
                  {purchasedCourses.filter(course => course.certificate).length}
                </div>
                <div className="text-sm text-muted-foreground">獲得證書</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">
                  {(purchasedCourses.reduce((acc, course) => acc + course.rating, 0) / purchasedCourses.length).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">平均評分</div>
              </CardContent>
            </Card>
          </div>

          {/* Courses List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">我的課程</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  全部
                </Button>
                <Button variant="outline" size="sm">
                  進行中
                </Button>
                <Button variant="outline" size="sm">
                  已完成
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {purchasedCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="flex">
                    {/* Course Image */}
                    <div className="relative w-48 shrink-0">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover rounded-l-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" className="rounded-full">
                          <Play className="h-5 w-5 ml-0.5" />
                        </Button>
                      </div>
                      {course.progress > 0 && (
                        <div className="absolute bottom-2 left-2 right-2">
                          <Progress value={course.progress} className="h-1" />
                        </div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          by {course.instructor}
                        </p>

                        {/* Progress */}
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>學習進度</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{course.completedLessons}/{course.totalLessons} 課程</span>
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                          {course.certificate && (
                            <Badge variant="secondary" className="text-xs">
                              <Trophy className="h-3 w-3 mr-1" />
                              證書
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            購買於 {course.purchaseDate}
                          </Badge>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link to={`/courses/${course.id}/learn`} className="flex-1">
                          <Button className="w-full" size="sm">
                            {course.progress > 0 ? '繼續學習' : '開始學習'}
                          </Button>
                        </Link>
                        {course.certificate && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {purchasedCourses.length === 0 && (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">還沒有購買任何課程</h3>
                  <p className="text-muted-foreground mb-6">
                    開始探索我們豐富的課程內容，找到適合您的學習路徑
                  </p>
                  <Link to="/courses">
                    <Button>
                      探索課程
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
