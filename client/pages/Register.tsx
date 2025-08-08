import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return '請填寫所有欄位';
    }
    
    if (formData.password.length < 6) {
      return '密碼至少需要6個字元';
    }
    
    if (formData.password !== formData.confirmPassword) {
      return '密碼確認不符';
    }
    
    if (!agreeTerms) {
      return '請同意服務條款';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsLoading(true);

    const success = await register(formData.email, formData.password, formData.name);
    
    if (success) {
      navigate('/verify-email', { 
        state: { email: formData.email, fromRegistration: true }
      });
    } else {
      setError('註冊失敗，請稍後再試');
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '' };
    if (password.length < 6) return { strength: 1, text: '密碼強度：弱' };
    if (password.length < 8) return { strength: 2, text: '密碼強度：中等' };
    return { strength: 3, text: '密碼強度：強' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">創建帳號</CardTitle>
              <p className="text-muted-foreground">
                加入學習無界，開始您的學習之旅
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="請輸入您的姓名"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="請輸入您的Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">密碼</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="請輸入密碼（至少6個字元）"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {formData.password && (
                    <div className="text-xs text-muted-foreground">
                      {passwordStrength.text}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">確認密碼</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="請再次輸入密碼"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    disabled={isLoading}
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="text-xs text-destructive">
                      密碼確認不符
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="text-sm">
                    我同意{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      服務條款
                    </Link>{' '}
                    和{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      隱私政策
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  註冊
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">已經有帳號？</span>
                  <Link to="/login" className="text-primary hover:underline ml-1">
                    立即登入
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
