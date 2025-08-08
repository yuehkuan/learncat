import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Search,
  User,
  Heart,
  ShoppingCart,
  Users,
  GraduationCap,
  Menu,
  Bell,
  LogOut,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CartDropdown from "./CartDropdown";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCreateCourse = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/create-course' } } });
      return;
    }

    if (!user.isEmailVerified) {
      navigate('/verify-email');
      return;
    }

    navigate('/create-course');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">學習無界</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="搜尋課程、講師或主題..."
                  className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link 
                to="/courses" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/courses") ? "text-primary" : "text-muted-foreground"
                )}
              >
                探索課程
              </Link>
              <Link 
                to="/community" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/community") ? "text-primary" : "text-muted-foreground"
                )}
              >
                學習社群
              </Link>
              <button
                onClick={handleCreateCourse}
                className="text-sm font-medium transition-colors bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-md border"
              >
                我要開課
              </button>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  {/* Wishlist */}
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <Heart className="h-5 w-5" />
                  </Button>

                  {/* Cart */}
                  <div className="hidden md:flex">
                    <CartDropdown />
                  </div>

                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <Bell className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      {!user.isEmailVerified && (
                        <Link
                          to="/verify-email"
                          className="text-xs text-warning hover:underline"
                        >
                          驗證Email
                        </Link>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        個人資料
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/courses/purchased" className="cursor-pointer">
                        <BookOpen className="mr-2 h-4 w-4" />
                        我的課程
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCreateCourse} className="cursor-pointer">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      我要開課
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        設定
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      登出
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">登入</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register">註冊</Link>
                  </Button>
                </div>
              )}

              {/* Mobile menu */}
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">學習無界</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                打造最優質的線上學習體驗，讓知識傳播無界限
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">快速連結</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                    探索課程
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">
                    學習社群
                  </Link>
                </li>
                <li>
                  <Link to="/teach" className="text-muted-foreground hover:text-primary transition-colors">
                    開始教學
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    關於我們
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4">熱門分類</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/courses/programming" className="text-muted-foreground hover:text-primary transition-colors">
                    程式���計
                  </Link>
                </li>
                <li>
                  <Link to="/courses/design" className="text-muted-foreground hover:text-primary transition-colors">
                    設計創作
                  </Link>
                </li>
                <li>
                  <Link to="/courses/business" className="text-muted-foreground hover:text-primary transition-colors">
                    商業管理
                  </Link>
                </li>
                <li>
                  <Link to="/courses/language" className="text-muted-foreground hover:text-primary transition-colors">
                    語言學習
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">幫助與支援</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                    幫助中心
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    聯��我們
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    隱私政策
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    服務條款
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 學習無界. 版權所有.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
