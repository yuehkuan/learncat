import React, { createContext, useContext, useState } from 'react';
import { MockPayPalAPI } from '@/lib/paypal';

interface PaymentItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  instructor?: string;
  quantity: number;
}

interface PaymentContextType {
  isProcessing: boolean;
  paymentItems: PaymentItem[];
  cartItemCount: number;
  cartTotal: number;
  addToCart: (item: PaymentItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  processPayPalPayment: (amount: number, currency: string) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentItems, setPaymentItems] = useState<PaymentItem[]>([]);

  const cartItemCount = paymentItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = paymentItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const addToCart = (item: PaymentItem) => {
    setPaymentItems(prev => {
      const existingIndex = prev.findIndex(p => p.id === item.id);
      if (existingIndex !== -1) {
        // 如果物品已存在，增加數量
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      // 如果物品不存在，添加新物品
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setPaymentItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setPaymentItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setPaymentItems([]);
  };

  const processPayPalPayment = async (amount: number, currency: string = 'TWD'): Promise<boolean> => {
    setIsProcessing(true);

    try {
      console.log('Processing PayPal payment:', { amount, currency, items: paymentItems });

      // 步驟 1: 創建 PayPal 訂單
      const courseTitle = paymentItems.length > 0 ? paymentItems[0].title : '課程購買';
      const order = await MockPayPalAPI.createOrder(amount, courseTitle);

      console.log('PayPal order created:', order);

      // 步驟 2: 在實際應用中，這裡會重定向到 PayPal 進行付款
      // 目前使用模擬流程直接執行付款
      const captureResult = await MockPayPalAPI.captureOrder(order.id);

      console.log('PayPal payment captured:', captureResult);

      if (captureResult.status === 'COMPLETED') {
        clearCart();
        return true;
      } else {
        throw new Error('Payment capture failed');
      }
    } catch (error) {
      console.error('PayPal payment error:', error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const value = {
    isProcessing,
    paymentItems,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    processPayPalPayment
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};
