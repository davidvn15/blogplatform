
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BlogPostCard } from "@/components/BlogPostCard";
import { BlogCategories } from "@/components/BlogCategories";
import { Newsletter } from "@/components/Newsletter";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  coverImage: string;
}

const Categories: React.FC = () => {
  // Mock categories for the page
  const categories = [
    { name: "Lập trình", count: 12, description: "Các bài viết về ngôn ngữ lập trình, framework và các công nghệ phát triển phần mềm." },
    { name: "UI/UX", count: 8, description: "Bài viết về thiết kế giao diện người dùng, trải nghiệm người dùng và xu hướng thiết kế." },
    { name: "Hiệu suất", count: 5, description: "Các kỹ thuật và phương pháp tối ưu hóa hiệu suất cho ứng dụng web." },
    { name: "Backend", count: 7, description: "Phát triển phía máy chủ, cơ sở dữ liệu, API và kiến trúc hệ thống." },
    { name: "Redux", count: 3, description: "Quản lý trạng thái ứng dụng với Redux và các thư viện liên quan." },
    { name: "Bảo mật", count: 4, description: "Bảo mật web, xác thực người dùng và các biện pháp bảo vệ ứng dụng." },
  ];

  // Mock posts by category (for the first category only)
  const categoryPosts: Post[] = [
    {
      id: "1",
      title: "Bắt đầu với TypeScript trong năm 2025",
      excerpt: "Khám phá các tính năng mới nhất và cách tạo ứng dụng hiện đại với TypeScript",
      date: "2025-04-05",
      author: {
        name: "Nguyễn Văn A",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Lập trình",
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "2", 
      title: "React Hooks: Thực hành tốt nhất năm 2025",
      excerpt: "Các kỹ thuật sử dụng React Hooks hiệu quả cho ứng dụng hiện đại",
      date: "2025-03-28",
      author: {
        name: "Trần Thị B",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Lập trình",
      coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "3",
      title: "Tối ưu hóa hiệu suất trong React",
      excerpt: "Cách cải thiện tốc độ và hiệu suất cho ứng dụng React của bạn",
      date: "2025-03-15",
      author: {
        name: "Lê Văn C",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Lập trình",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Danh mục</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <Link to={`/categories/${category.name}`} className="hover:text-primary transition-colors">
                      {category.name} <span className="text-muted-foreground text-lg">({category.count})</span>
                    </Link>
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                
                {category.name === "Lập trình" && (
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Bài viết gần đây</h3>
                    <div className="grid gap-4">
                      {categoryPosts.map((post) => (
                        <div key={post.id} className="flex gap-4 items-start">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded-md" 
                          />
                          <div>
                            <Link to={`/blog/${post.id}`} className="font-medium hover:text-primary transition-colors">
                              {post.title}
                            </Link>
                            <div className="text-sm text-muted-foreground mt-1">
                              {post.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <BlogCategories />
          <Separator className="my-8" />
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Categories;
