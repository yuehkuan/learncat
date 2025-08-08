// PayPal API 配置
// 實際使用時需要替換為真實的 PayPal API 金鑰

export interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  environment: 'sandbox' | 'production';
  currency: string;
}

export const paypalConfig: PayPalConfig = {
  // 這些是測試用的佔位符，實際使用時需要替換
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID',
  clientSecret: import.meta.env.VITE_PAYPAL_CLIENT_SECRET || 'YOUR_PAYPAL_CLIENT_SECRET',
  environment: 'sandbox', // 開發環境使用 sandbox，正式環境使用 production
  currency: 'TWD'
};

export interface PayPalOrderRequest {
  intent: 'CAPTURE';
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    description?: string;
  }>;
  application_context: {
    return_url: string;
    cancel_url: string;
    brand_name: string;
    landing_page: string;
    user_action: string;
  };
}

export interface PayPalOrderResponse {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export class PayPalAPI {
  private static baseURL = paypalConfig.environment === 'sandbox' 
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  // 獲取 PayPal 訪問令牌
  static async getAccessToken(): Promise<string> {
    try {
      const auth = btoa(`${paypalConfig.clientId}:${paypalConfig.clientSecret}`);
      
      const response = await fetch(`${this.baseURL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Failed to get PayPal access token:', error);
      throw new Error('PayPal 認證失敗');
    }
  }

  // 創建 PayPal 訂單
  static async createOrder(amount: number, description: string = ''): Promise<PayPalOrderResponse> {
    try {
      const accessToken = await this.getAccessToken();
      
      const orderRequest: PayPalOrderRequest = {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: paypalConfig.currency,
            value: amount.toString()
          },
          description
        }],
        application_context: {
          return_url: `${window.location.origin}/payment/success`,
          cancel_url: `${window.location.origin}/payment/cancel`,
          brand_name: '學習無界',
          landing_page: 'LOGIN',
          user_action: 'PAY_NOW'
        }
      };

      const response = await fetch(`${this.baseURL}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderRequest)
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create PayPal order:', error);
      throw new Error('PayPal 訂單創建失敗');
    }
  }

  // 執行 PayPal 訂單
  static async captureOrder(orderId: string): Promise<any> {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`${this.baseURL}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to capture PayPal order:', error);
      throw new Error('PayPal 付款執行失敗');
    }
  }
}

// 用於開發測試的模擬 PayPal API
export class MockPayPalAPI {
  static async createOrder(amount: number, description: string = ''): Promise<PayPalOrderResponse> {
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: `MOCK_ORDER_${Date.now()}`,
      status: 'CREATED',
      links: [
        {
          href: `https://www.sandbox.paypal.com/checkoutnow?token=MOCK_TOKEN_${Date.now()}`,
          rel: 'approve',
          method: 'GET'
        }
      ]
    };
  }

  static async captureOrder(orderId: string): Promise<any> {
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 模擬 90% 成功率
    const success = Math.random() > 0.1;
    
    if (success) {
      return {
        id: orderId,
        status: 'COMPLETED',
        purchase_units: [{
          payments: {
            captures: [{
              id: `CAPTURE_${Date.now()}`,
              status: 'COMPLETED',
              amount: {
                currency_code: 'TWD',
                value: '1.00'
              }
            }]
          }
        }]
      };
    } else {
      throw new Error('付款失敗');
    }
  }
}
