import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Mail, CheckCircle, Clock, RefreshCw } from 'lucide-react';

export default function VerifyEmail() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  
  const { user, verifyEmail, resendVerification } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const email = location.state?.email || user?.email;
  const fromRegistration = location.state?.fromRegistration;
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleVerifyEmail(token);
    }
  }, [token]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerifyEmail = async (verificationToken: string) => {
    setIsVerifying(true);
    setMessage('');

    const success = await verifyEmail(verificationToken);
    
    if (success) {
      setIsVerified(true);
      setMessage('Email驗證成功！');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setMessage('驗證失敗，請檢查驗證連結或重新發送驗證郵件');
    }
    
    setIsVerifying(false);
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    setMessage('');

    const success = await resendVerification();
    
    if (success) {
      setMessage('驗證郵件已重新發送，請檢查您的信箱');
      setResendCooldown(60); // 60秒冷卻時間
    } else {
      setMessage('發送失敗，請稍後再試');
    }
    
    setIsResending(false);
  };

  if (!email) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  找不到Email資訊，請重新註冊或登入
                </p>
                <Button asChild className="mt-4">
                  <a href="/register">重新註冊</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (isVerified) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <CardTitle className="text-2xl text-success">驗證成功！</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  您的Email已成功驗證，即將跳轉到首頁...
                </p>
                <Button onClick={() => navigate('/')} className="w-full">
                  立即進入
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">驗證您的Email</CardTitle>
              <p className="text-muted-foreground">
                {fromRegistration 
                  ? '註冊成功！我們已發送驗證郵件到您的信箱'
                  : '請檢查您的信箱並點擊驗證連結'
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {message && (
                <Alert variant={isVerified ? "default" : "destructive"}>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <div className="text-center space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    驗證郵件已發送到：
                  </p>
                  <p className="font-medium">{email}</p>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>請檢查您的信箱（包括垃圾郵件夾）</p>
                  <p>點擊郵件中的驗證連結完成驗證</p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleResendVerification}
                    disabled={isResending || resendCooldown > 0}
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        發送中...
                      </>
                    ) : resendCooldown > 0 ? (
                      <>
                        <Clock className="mr-2 h-4 w-4" />
                        {resendCooldown}秒後可重新發送
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        重新發送驗證郵件
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate('/login')}
                  >
                    返回登入
                  </Button>
                </div>
              </div>

              {/* 模擬驗證連結（開發用） */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 mb-2">
                  開發模式 - 點擊下方連結模擬驗證：
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVerifyEmail('demo-token')}
                  disabled={isVerifying}
                  className="w-full"
                >
                  {isVerifying ? '驗證中...' : '模擬驗證Email'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
