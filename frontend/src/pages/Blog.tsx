
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BlogPostCard } from "@/components/BlogPostCard";
import { BlogCategories } from "@/components/BlogCategories";
import { Newsletter } from "@/components/Newsletter";
import { Separator } from "@/components/ui/separator";
import { Search } from 'lucide-react';
import { blogApiService, Post } from '@/services/blogApi';
import { Skeleton } from '@/components/ui/skeleton';

interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 6,
    totalItems: 0,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Danh sách danh mục cho dropdown
  const categories = ['Lập trình', 'Hiệu suất', 'UI/UX', 'Redux', 'Backend', 'Bảo mật'];

  // Fetch posts từ API
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await blogApiService.getPosts({
        category: category !== 'all' ? category : undefined,
        search,
        sortBy,
        page: pagination.page,
        pageSize: pagination.pageSize
      });
      
      setPosts(response.posts);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý khi người dùng nhấn Enter hoặc nút tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset về trang 1 khi tìm kiếm
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Gọi API khi các bộ lọc thay đổi
  useEffect(() => {
    fetchPosts();
  }, [search, category, sortBy, pagination.page]);

  // Render bài viết hoặc skeleton loading
  const renderPosts = () => {
    if (isLoading) {
      return Array(6).fill(0).map((_, index) => (
        <div key={`skeleton-${index}`} className="flex flex-col space-y-3">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      ));
    }

    if (posts.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy bài viết nào</h3>
          <p className="text-muted-foreground">Vui lòng thử lại với từ khóa khác hoặc danh mục khác.</p>
        </div>
      );
    }

    return posts.map((post) => (
      <BlogPostCard key={post.id} post={post} />
    ));
  };

  // Render phân trang
  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (pagination.page > 1) {
                  handlePageChange(pagination.page - 1);
                }
              }} 
              className={pagination.page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter(page => {
              // Hiển thị trang hiện tại, trang đầu, trang cuối và các trang xung quanh trang hiện tại
              const current = pagination.page;
              return page === 1 || 
                    page === pagination.totalPages || 
                    (page >= current - 1 && page <= current + 1);
            })
            .map((page, index, array) => {
              // Thêm ellipsis nếu có khoảng trống
              const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
              const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1;

              return (
                <React.Fragment key={page}>
                  {showEllipsisBefore && (
                    <PaginationItem>
                      <span className="px-4">...</span>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      isActive={page === pagination.page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  {showEllipsisAfter && (
                    <PaginationItem>
                      <span className="px-4">...</span>
                    </PaginationItem>
                  )}
                </React.Fragment>
              );
            })}
          
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (pagination.page < pagination.totalPages) {
                  handlePageChange(pagination.page + 1);
                }
              }}
              className={pagination.page >= pagination.totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Khám phá những bài viết mới nhất về lập trình, phát triển web và thiết kế UI/UX
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="lg:w-3/4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                className="pl-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'newest' | 'oldest')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất trước</SelectItem>
                  <SelectItem value="oldest">Cũ nhất trước</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {renderPosts()}
          </div>

          {renderPagination()}
        </div>

        <div className="lg:w-1/4">
          <BlogCategories />
          <Separator className="my-8" />
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Blog;
