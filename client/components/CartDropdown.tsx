import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { usePayment } from '@/contexts/PaymentContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  ShoppingBag
} from 'lucide-react';

export default function CartDropdown() {
  const { 
    paymentItems, 
    cartItemCount, 
    cartTotal, 
    removeFromCart, 
    updateCartItemQuantity 
  } = usePayment();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateCartItemQuantity(id, newQuantity);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {cartItemCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              購物車 ({cartItemCount} 項商品)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">購物車是空的</p>
                <Link to="/courses">
                  <Button className="mt-3" size="sm">
                    去逛逛課程
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 購物車項目 */}
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {paymentItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {item.title}
                        </h4>
                        {item.instructor && (
                          <p className="text-xs text-muted-foreground mb-2">
                            by {item.instructor}
                          </p>
                        )}
                        
                        {/* 數量控制 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-6 w-6"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input 
                              type="number" 
                              value={item.quantity} 
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                              className="w-12 h-6 text-center text-xs"
                              min="1"
                            />
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-6 w-6"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              NT$ {(item.price * item.quantity).toLocaleString()}
                            </span>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-6 w-6 text-destructive hover:text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* 總計 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">小計</span>
                    <span className="font-bold text-lg text-primary">
                      NT$ {cartTotal.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* 操作按鈕 */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/courses">
                      <Button variant="outline" className="w-full" size="sm">
                        繼續購物
                      </Button>
                    </Link>
                    <Link to="/checkout" state={{ cartItems: paymentItems }}>
                      <Button className="w-full" size="sm">
                        去結帳
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
