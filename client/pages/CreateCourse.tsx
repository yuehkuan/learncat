import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  BookOpen,
  Clock,
  Target,
  Users
} from 'lucide-react';

interface CourseData {
  category: string;
  title: string;
  description: string;
  targetAudience: string;
  courseCount: number;
  lessons: Array<{
    id: string;
    title: string;
    duration: number;
  }>;
}

export default function CreateCourse() {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState<CourseData>({
    category: '',
    title: '',
    description: '',
    targetAudience: '',
    courseCount: 1,
    lessons: [{ id: '1', title: '', duration: 10 }]
  });

  const navigate = useNavigate();
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const categories = [
    '程式設計',
    '設計創作',
    '商業管理',
    '資料科學',
    '行銷企劃',
    '語言學習',
    '生活技能',
    '健康運動'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // 完成後跳轉到課程編輯頁面
      navigate('/edit-course', { state: { courseData } });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateCourseData = (field: keyof CourseData, value: any) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const addLesson = () => {
    const newLesson = {
      id: Date.now().toString(),
      title: '',
      duration: 10
    };
    setCourseData(prev => ({
      ...prev,
      lessons: [...prev.lessons, newLesson]
    }));
  };

  const removeLesson = (id: string) => {
    if (courseData.lessons.length > 1) {
      setCourseData(prev => ({
        ...prev,
        lessons: prev.lessons.filter(lesson => lesson.id !== id)
      }));
    }
  };

  const updateLesson = (id: string, field: 'title' | 'duration', value: string | number) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.map(lesson =>
        lesson.id === id ? { ...lesson, [field]: value } : lesson
      )
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return courseData.category && courseData.title;
      case 2:
        return courseData.description && courseData.targetAudience;
      case 3:
        return courseData.courseCount > 0;
      case 4:
        return courseData.lessons.every(lesson => lesson.title && lesson.duration > 0);
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">選擇課程類型和主題</h2>
              <p className="text-muted-foreground">
                告訴我們您想要教授什麼內容
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="category">課程分類</Label>
                <Select value={courseData.category} onValueChange={(value) => updateCourseData('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="請選擇課程分類" />
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
                <Label htmlFor="title">課程主題</Label>
                <Input
                  id="title"
                  placeholder="例如：React 完整開發指南"
                  value={courseData.title}
                  onChange={(e) => updateCourseData('title', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">課程詳細說明</h2>
              <p className="text-muted-foreground">
                詳細描述您的課程內容和目標學員
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">課程說明</Label>
                <Textarea
                  id="description"
                  placeholder="描述您的課程內容、學習目標和特色..."
                  value={courseData.description}
                  onChange={(e) => updateCourseData('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="targetAudience">目標學員</Label>
                <Input
                  id="targetAudience"
                  placeholder="例如：想學習前端開發的初學者"
                  value={courseData.targetAudience}
                  onChange={(e) => updateCourseData('targetAudience', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">課程結構規劃</h2>
              <p className="text-muted-foreground">
                設定您計劃建立的課程數量
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="courseCount">預計課程數量</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateCourseData('courseCount', Math.max(1, courseData.courseCount - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-semibold w-16 text-center">
                    {courseData.courseCount}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateCourseData('courseCount', courseData.courseCount + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  建議將課程分為 3-8 個章節，每個章節 5-20 分鐘
                </p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">課程建議</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 每個課程專注於一個特定主題</li>
                  <li>• 循序漸進的學習路徑</li>
                  <li>• 理論與實作並重</li>
                  <li>• 適當的課程長度提升學習效果</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">課程大綱設計</h2>
              <p className="text-muted-foreground">
                為每個課程設定標題和預計時長
              </p>
            </div>

            <div className="space-y-4">
              {courseData.lessons.map((lesson, index) => (
                <Card key={lesson.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">第 {index + 1} 課</Badge>
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="課程標題"
                          value={lesson.title}
                          onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">時長:</Label>
                          <Input
                            type="number"
                            min="1"
                            max="120"
                            className="w-20"
                            value={lesson.duration}
                            onChange={(e) => updateLesson(lesson.id, 'duration', parseInt(e.target.value) || 0)}
                          />
                          <span className="text-sm text-muted-foreground">分鐘</span>
                        </div>
                      </div>
                      {courseData.lessons.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeLesson(lesson.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addLesson}
              >
                <Plus className="h-4 w-4 mr-2" />
                新增課程
              </Button>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">課程統計</span>
                </div>
                <div className="text-sm text-blue-700">
                  總課程數：{courseData.lessons.length} 個
                  <br />
                  總時長：{courseData.lessons.reduce((total, lesson) => total + lesson.duration, 0)} 分鐘
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">創建新課程</h1>
              <Badge variant="outline">
                步驟 {currentStep} / {totalSteps}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="p-8">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  上一步
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  {currentStep === totalSteps ? '完成設定' : '下一步'}
                  {currentStep !== totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
