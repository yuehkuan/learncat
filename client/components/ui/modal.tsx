import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
  showCloseButton?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  className?: string;
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const colorMap = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  type = 'info',
  showCloseButton = true,
  onConfirm,
  confirmText = '確定',
  cancelText = '取消',
  className
}: ModalProps) {
  if (!isOpen) return null;

  const Icon = iconMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className={cn(
        "relative z-10 w-full max-w-md mx-4 shadow-2xl border-0",
        className
      )}>
        {title && (
          <CardHeader className="flex flex-row items-center gap-3 pb-4">
            <Icon className={cn("h-6 w-6", colorMap[type])} />
            <CardTitle className="flex-1">{title}</CardTitle>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
        )}
        
        <CardContent className={title ? "pt-0" : "pt-6"}>
          {!title && showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <div className="mb-6">
            {!title && (
              <div className="flex items-center gap-3 mb-4">
                <Icon className={cn("h-6 w-6", colorMap[type])} />
                <div className="flex-1">
                  {children}
                </div>
              </div>
            )}
            {title && children}
          </div>
          
          <div className="flex gap-3 justify-end">
            {onConfirm && (
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>
            )}
            <Button 
              onClick={onConfirm || onClose}
              variant={type === 'error' ? 'destructive' : 'default'}
            >
              {confirmText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
