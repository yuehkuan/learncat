import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useModal } from '@/contexts/ModalContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Share2, 
  Copy, 
  Check,
  MessageCircle
} from 'lucide-react';

interface ShareCourseProps {
  courseId: string;
  courseTitle: string;
  fullWidth?: boolean;
}

export default function ShareCourse({ courseId, courseTitle, fullWidth = false }: ShareCourseProps) {
  const [copied, setCopied] = useState(false);
  const { showAlert } = useModal();
  
  const courseUrl = `${window.location.origin}/courses/${courseId}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(courseUrl);
      setCopied(true);
      showAlert('連結已複製！', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showAlert('複製失敗，請手動複製連結', 'error');
    }
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(courseUrl)}&quote=${encodeURIComponent(`我正在學習這門課程：${courseTitle}`)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleShareLine = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(courseUrl)}&text=${encodeURIComponent(`我正在學習這門課程：${courseTitle}`)}`;
    window.open(lineUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={fullWidth ? "w-full" : ""}
        >
          <Share2 className="h-4 w-4 mr-2" />
          分享
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              分享課程
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 複製連結 */}
            <div>
              <label className="text-sm font-medium mb-2 block">課程連結</label>
              <div className="flex gap-2">
                <Input 
                  value={courseUrl} 
                  readOnly 
                  className="text-xs"
                />
                <Button 
                  size="sm" 
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* 社群分享 */}
            <div>
              <label className="text-sm font-medium mb-3 block">分享到社群</label>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleShareFacebook}
                  className="flex items-center gap-2 h-auto py-3"
                >
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                  <span className="text-sm">Facebook</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleShareLine}
                  className="flex items-center gap-2 h-auto py-3"
                >
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">LINE</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
