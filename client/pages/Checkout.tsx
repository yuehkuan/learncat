import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { usePayment } from '@/contexts/PaymentContext';
import { useModal } from '@/contexts/ModalContext';
import Layout from '@/components/Layout';
import {
  CreditCard,
  Lock,
  ShoppingCart,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

interface CheckoutItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  instructor?: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { processPayPalPayment, isProcessing } = usePayment();
  const { showAlert } = useModal();
  
  // 從路由狀態獲取課程資訊
  const courseData = location.state?.course as CheckoutItem;
  
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'credit'>('paypal');
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  if (!courseData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">沒有選擇課程</p>
              <Button onClick={() => navigate('/courses')}>
                返回課程列表
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayPalPayment = async () => {
    if (!user) {
      showAlert('請先登入', 'warning');
      navigate('/login');
      return;
    }

    try {
      const success = await processPayPalPayment(courseData.price, 'TWD');
      
      if (success) {
        showAlert('付款成功！課程已加入您的學習清單', 'success');
        navigate('/courses/purchased');
      } else {
        showAlert('付款失敗，請稍後再試', 'error');
      }
    } catch (error) {
      showAlert('付款過程中發生錯誤', 'error');
    }
  };

  const handleCreditCardPayment = async () => {
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      showAlert('請填寫完整的信用卡資訊', 'warning');
      return;
    }

    // 模擬信用卡支付
    await new Promise(resolve => setTimeout(resolve, 2000));
    showAlert('信用卡支付功能開發中', 'info');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">結帳</h1>
              <p className="text-muted-foreground">完成購買以開始學習</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    帳單資訊
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">名字</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="請輸入名字"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">姓氏</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="請輸入姓氏"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="請輸入電子郵件"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">地址</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="請輸入地址"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">城市</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="請輸入城市"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">郵遞區號</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="請輸入郵遞區號"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    付款方式
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'paypal' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-muted hover:border-primary/50'
                      }`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <div className="flex items-center justify-center h-12">
                        <span className="text-xl font-bold text-blue-600">PayPal</span>
                      </div>
                      <p className="text-sm text-center text-muted-foreground mt-2">
                        安全快速的線上支付
                      </p>
                    </div>
                    
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'credit' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-muted hover:border-primary/50'
                      }`}
                      onClick={() => setPaymentMethod('credit')}
                    >
                      <div className="flex items-center justify-center h-12">
                        <CreditCard className="h-8 w-8" />
                      </div>
                      <p className="text-sm text-center text-muted-foreground mt-2">
                        信用卡 / 金融卡
                      </p>
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'credit' && (
                    <div className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="cardNumber">卡號</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">有效期限</Label>
                          <Input
                            id="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Info */}
                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                      <div className="flex items-center gap-2 text-blue-800">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">PayPal 安全支付</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-2">
                        點擊下方按鈕將跳轉至 PayPal 完成付款
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      訂單摘要
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Course Item */}
                    <div className="flex gap-3">
                      {courseData.image && (
                        <img 
                          src={courseData.image} 
                          alt={courseData.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {courseData.title}
                        </h4>
                        {courseData.instructor && (
                          <p className="text-xs text-muted-foreground">
                            by {courseData.instructor}
                          </p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>小計</span>
                        <span>NT$ {courseData.price}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>稅金</span>
                        <span>NT$ 0</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>總計</span>
                      <span className="text-primary">NT$ {courseData.price}</span>
                    </div>

                    {/* Payment Button */}
                    <div className="space-y-3 pt-4">
                      {paymentMethod === 'paypal' ? (
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700" 
                          size="lg"
                          onClick={handlePayPalPayment}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                              處理中...
                            </>
                          ) : (
                            <>使用 PayPal 付款</>
                          )}
                        </Button>
                      ) : (
                        <Button 
                          className="w-full" 
                          size="lg"
                          onClick={handleCreditCardPayment}
                        >
                          完成付款
                        </Button>
                      )}
                      
                      <p className="text-xs text-center text-muted-foreground">
                        點擊完成付款即表示您同意我們的服務條款
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
