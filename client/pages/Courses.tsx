import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Layout from "@/components/Layout";
import {
  Star,
  Users,
  Clock,
  Filter,
  Search,
  Grid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function Courses() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // 模擬課程資料
  const courses = [
    {
      id: 999,
      title: "金流測試課程 - PayPal 支付系統驗證",
      instructor: "系統管理員",
      rating: 5.0,
      students: 1,
      price: 1,
      originalPrice: 100,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      category: "系統測試",
      level: "初級",
      duration: "5分鐘",
      description: "專門用於測試PayPal金流系統的測試課程，價格為NT$1",
      lastUpdated: "2024年3月"
    },
    {
      id: 1,
      title: "React 完整開發指南 - 從零基礎到專案實戰",
      instructor: "王小明",
      rating: 4.9,
      students: 15420,
      price: 1899,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      category: "程式設計",
      level: "中級",
      duration: "24小時",
      description: "完整學習 React 生態系統，包含 Hooks、Router、狀態管理等現代開發技巧",
      lastUpdated: "2024年1月"
    },
    {
      id: 2,
      title: "UI/UX 設計從零開始 - 打造使用者體驗",
      instructor: "李美慧",
      rating: 4.8,
      students: 8750,
      price: 1499,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
      category: "設計創作",
      level: "初級",
      duration: "18小時",
      description: "學習設計思維、使用者研究、原型設計及介面設計的完整流程",
      lastUpdated: "2024年2月"
    },
    {
      id: 3,
      title: "Python 數據分析實戰 - 機器學習應用",
      instructor: "陳志強",
      rating: 4.7,
      students: 12300,
      price: 2199,
      originalPrice: 3299,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      category: "資料科學",
      level: "中級",
      duration: "32小時",
      description: "掌握 Python 數據分析工具，學習機器學習演算法與實際應用",
      lastUpdated: "2024年1月"
    },
    {
      id: 4,
      title: "商業策略與創新思維 - 企業管理精髓",
      instructor: "張經理",
      rating: 4.6,
      students: 6850,
      price: 1699,
      originalPrice: 2499,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      category: "商業管理",
      level: "高級",
      duration: "16小時",
      description: "學習商業戰略思維、市場分析、創新管理等企業經營核心能力",
      lastUpdated: "2024年3月"
    },
    {
      id: 5,
      title: "JavaScript 進階開發 - ES6+ 現代語法",
      instructor: "林開發",
      rating: 4.8,
      students: 9200,
      price: 1599,
      originalPrice: 2199,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
      category: "程式設計",
      level: "��級",
      duration: "20小時",
      description: "深入學習 JavaScript 進階概念，掌握現代開發模��與最佳實踐",
      lastUpdated: "2024年2月"
    },
    {
      id: 6,
      title: "數位行銷全攻略 - 社群媒體與廣告投放",
      instructor: "黃行銷",
      rating: 4.5,
      students: 7650,
      price: 1299,
      originalPrice: 1899,
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop",
      category: "行銷企劃",
      level: "初級",
      duration: "14小時",
      description: "學習完整數位行銷策略，包含社群經營、廣告投放與數據��析",
      lastUpdated: "2024年3月"
    }
  ];

  const categories = [
    "系統測試",
    "程式設計",
    "設計創作",
    "商業管理",
    "資料科學",
    "行銷企劃",
    "語言學習"
  ];

  const levels = ["初級", "中級", "高級"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
    setCurrentPage(1); // 篩選改變時重置到第一頁
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, level]);
    } else {
      setSelectedLevels(selectedLevels.filter(l => l !== level));
    }
    setCurrentPage(1); // 篩選改變時重置到第一頁
  };

  const handleClearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  // 篩選和排序課程
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      // 價格篩選
      if (course.price < priceRange[0] || course.price > priceRange[1]) {
        return false;
      }

      // 分類篩選
      if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
        return false;
      }

      // 難度篩選
      if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) {
        return false;
      }

      // 搜尋篩選
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
        );
      }

      return true;
    });

    // 排序
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.students - a.students);
        break;
    }

    return filtered;
  }, [courses, priceRange, selectedCategories, selectedLevels, searchQuery, sortBy]);

  // 分頁邏輯
  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredAndSortedCourses.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">探索課程</h1>
          <p className="text-muted-foreground">發現適合你的學習內容，提升專業技能</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="搜尋課程、講師或關鍵字..."
                className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-sm ring-offset-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">熱門程度</SelectItem>
                <SelectItem value="newest">最新課程</SelectItem>
                <SelectItem value="rating">評價最高</SelectItem>
                <SelectItem value="price-low">價格由低到高</SelectItem>
                <SelectItem value="price-high">價格由高到低</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  篩選條件
                </h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">價格範圍</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={5000}
                    min={0}
                    step={100}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>NT$ {priceRange[0]}</span>
                    <span>NT$ {priceRange[1]}</span>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3">課程分類</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Levels */}
                <div>
                  <h4 className="font-medium mb-3">難度等級</h4>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={level}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={(checked) => 
                            handleLevelChange(level, checked as boolean)
                          }
                        />
                        <label htmlFor={level} className="text-sm cursor-pointer">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  清除所有篩選
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Course List */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted-foreground">
                找到 {filteredAndSortedCourses.length} 門課程
                {filteredAndSortedCourses.length !== courses.length && (
                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    已篩選
                  </span>
                )}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-muted-foreground">
                  第 {currentPage} 頁，共 {totalPages} 頁
                </p>
              )}
            </div>

            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-6"
            }>
              {currentCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-md ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                >
                  <CardHeader className={`p-0 ${viewMode === 'list' ? 'w-64 shrink-0' : ''}`}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === 'list' ? 'w-64 h-full' : 'w-full h-48'
                        }`}
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {course.category}
                      </Badge>
                      <Badge variant="secondary" className="absolute top-3 right-3">
                        {course.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <div className="flex-1 flex flex-col">
                    <CardContent className="p-4 flex-1">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">by {course.instructor}</p>
                      
                      {viewMode === 'list' && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {course.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {viewMode === 'list' && (
                        <p className="text-xs text-muted-foreground">
                          最後更新：{course.lastUpdated}
                        </p>
                      )}
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0 space-y-3">
                      {/* 課程類別 */}
                      <div className="w-full">
                        <Badge variant="outline" className="text-xs">
                          {course.category}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">
                            NT$ {course.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            NT$ {course.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <Link to={`/courses/${course.id}`}>
                          <Button size="sm" className="shrink-0">
                            查看詳情
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    上一頁
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1"
                  >
                    下一頁
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* 無結果狀態 */}
            {filteredAndSortedCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>沒有找到符合篩選條件的課程</p>
                  <p className="text-sm mt-1">請嘗試調整篩選條件或清除篩選</p>
                </div>
                <Button onClick={handleClearFilters} variant="outline">
                  清除所有篩選
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
