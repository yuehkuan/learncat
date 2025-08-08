import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Layout from '@/components/Layout';
import { useModal } from '@/contexts/ModalContext';
import { 
  Upload, 
  Play, 
  Save, 
  Eye, 
  FileVideo, 
  CheckCircle,
  AlertCircle,
  Edit3
} from 'lucide-react';

interface LessonDetail {
  id: string;
  title: string;
  description: string;
  videoFile?: File;
  videoUrl?: string;
  duration: number;
  status: 'draft' | 'uploaded' | 'processing' | 'completed';
}

export default function EditCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useModal();
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  
  const courseData = location.state?.courseData;
  
  if (!courseData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">找不到課程資料</h2>
              <p className="text-muted-foreground mb-4">
                請重新開始課程創建流程
              </p>
              <Button onClick={() => navigate('/create-course')}>
                重新創建課程
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const [lessons, setLessons] = useState<LessonDetail[]>(
    courseData.lessons.map((lesson: any) => ({
      ...lesson,
      description: '',
      status: 'draft' as const
    }))
  );

  const [currentLesson, setCurrentLesson] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const completedLessons = lessons.filter(lesson => lesson.status === 'completed').length;
  const progress = (completedLessons / lessons.length) * 100;

  const updateLesson = (field: keyof LessonDetail, value: any) => {
    setLessons(prev => prev.map((lesson, index) =>
      index === currentLesson ? { ...lesson, [field]: value } : lesson
    ));
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 檢查檔案類型
      if (!file.type.startsWith('video/')) {
        showAlert('請選擇影片檔案', 'error');
        return;
      }

      // 檢查檔案大小 (限制 500MB)
      if (file.size > 500 * 1024 * 1024) {
        showAlert('影片檔案大小不能超過 500MB', 'error');
        return;
      }

      updateLesson('videoFile', file);
      updateLesson('status', 'uploaded');
      
      // 創建預覽 URL
      const videoUrl = URL.createObjectURL(file);
      updateLesson('videoUrl', videoUrl);
    }
  };

  const handleSaveLesson = async () => {
    setIsSaving(true);
    
    // 模擬保存過程
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateLesson('status', 'completed');
    setIsSaving(false);
  };

  const handlePublishCourse = async () => {
    const allCompleted = lessons.every(lesson => lesson.status === 'completed');
    
    if (!allCompleted) {
      showAlert('請完成所有課程內容才能發布', 'warning');
      return;
    }

    setIsSaving(true);
    
    // 模擬發布過程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSaving(false);
    
    // 跳轉到成��頁面
    navigate('/course-published', { 
      state: { 
        courseTitle: courseData.title,
        lessonCount: lessons.length 
      }
    });
  };

  const currentLessonData = lessons[currentLesson];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
                <p className="text-muted-foreground">{courseData.category}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">
                  完成進度
                </div>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Lesson List Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">課程大綱</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {lessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(index)}
                        className={`w-full text-left p-3 border-b transition-colors ${
                          currentLesson === index
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              第 {index + 1} 課
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {lesson.title || '未命名課程'}
                            </div>
                          </div>
                          <div className="ml-2">
                            {lesson.status === 'completed' ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : lesson.status === 'uploaded' ? (
                              <FileVideo className="h-4 w-4 text-primary" />
                            ) : (
                              <Edit3 className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Lesson Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      第 {currentLesson + 1} 課設定
                    </CardTitle>
                    <Badge variant={
                      currentLessonData.status === 'completed' ? 'default' :
                      currentLessonData.status === 'uploaded' ? 'secondary' : 'outline'
                    }>
                      {currentLessonData.status === 'completed' ? '已完成' :
                       currentLessonData.status === 'uploaded' ? '已上傳' : '編輯中'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="lesson-title">課程標題</Label>
                    <Input
                      id="lesson-title"
                      value={currentLessonData.title}
                      onChange={(e) => updateLesson('title', e.target.value)}
                      placeholder="輸入課程標題"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lesson-description">課程說明</Label>
                    <Textarea
                      id="lesson-description"
                      value={currentLessonData.description}
                      onChange={(e) => updateLesson('description', e.target.value)}
                      placeholder="描述這堂課程的內容和學習目標..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="lesson-duration">預計時長</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="lesson-duration"
                        type="number"
                        min="1"
                        max="120"
                        value={currentLessonData.duration}
                        onChange={(e) => updateLesson('duration', parseInt(e.target.value) || 0)}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">分鐘</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>課程影片</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentLessonData.videoUrl ? (
                    <div className="space-y-4">
                      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                        <video
                          src={currentLessonData.videoUrl}
                          controls
                          className="w-full h-full"
                        >
                          您的瀏覽器不支援影片播放
                        </video>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRefs.current[currentLessonData.id]?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          重新上傳
                        </Button>
                        
                        <Button
                          onClick={handleSaveLesson}
                          disabled={isSaving || !currentLessonData.title || !currentLessonData.description}
                        >
                          {isSaving ? (
                            <>
                              <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                              儲存中...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              儲存課程
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <FileVideo className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">上傳課程影片</h3>
                      <p className="text-muted-foreground mb-4">
                        支援 MP4、MOV、AVI 格式，檔案大小限制 500MB
                      </p>
                      <Button
                        onClick={() => fileInputRefs.current[currentLessonData.id]?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        選擇影片檔案
                      </Button>
                    </div>
                  )}

                  <input
                    ref={(el) => { fileInputRefs.current[currentLessonData.id] = el; }}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              {/* Course Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">課程發布</h3>
                      <p className="text-sm text-muted-foreground">
                        完成所有課程內容後即可發布上線
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        預覽課程
                      </Button>
                      <Button
                        onClick={handlePublishCourse}
                        disabled={progress < 100 || isSaving}
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                            發布中...
                          </>
                        ) : (
                          '發布課程'
                        )}
                      </Button>
                    </div>
                  </div>

                  {progress < 100 && (
                    <Alert className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        還有 {lessons.length - completedLessons} 個課程尚未完成，
                        請完成所有課程內容後再發布。
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
