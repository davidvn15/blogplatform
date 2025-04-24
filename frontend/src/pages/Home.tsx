
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BlogPostCard } from "@/components/BlogPostCard";
import { FeaturedPost } from "@/components/FeaturedPost";
import { Separator } from "@/components/ui/separator";
import { BlogCategories } from "@/components/BlogCategories";
import { Newsletter } from "@/components/Newsletter";
import { ChevronRight } from "lucide-react";
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

const Home: React.FC = () => {
  // Mock data for demo
  const featuredPost: Post = {
    id: "1",
    title: "Bắt đầu với React và TypeScript trong năm 2025",
    excerpt: "Khám phá các tính năng mới nhất và cách tạo ứng dụng hiện đại với React và TypeScript",
    date: "2025-04-05",
    author: {
      name: "Nguyễn Văn A",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    category: "Lập trình",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
  };

  const recentPosts: Post[] = [
    {
      id: "2",
      title: "Tối ưu hóa hiệu suất trong ứng dụng React",
      excerpt: "Các kỹ thuật và phương pháp để cải thiện tốc độ và trải nghiệm người dùng",
      date: "2025-04-01",
      author: {
        name: "Trần Thị B",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Hiệu suất",
      coverImage: "https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "3",
      title: "Thiết kế UI/UX hiện đại với Tailwind CSS",
      excerpt: "Tạo giao diện đẹp mắt và đáp ứng nhanh với Tailwind CSS",
      date: "2025-03-28",
      author: {
        name: "Lê Văn C",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "UI/UX",
      coverImage: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "4",
      title: "Quản lý trạng thái toàn cục với Redux Toolkit",
      excerpt: "Cách tốt nhất để quản lý trạng thái ứng dụng phức tạp trong React",
      date: "2025-03-25",
      author: {
        name: "Phạm Thị D",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
      category: "Redux",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <FeaturedPost post={featuredPost} />
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Bài viết mới nhất</h2>
          <Link to="/blog" className="flex items-center text-primary hover:underline">
            Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <section>
            <h2 className="text-3xl font-bold mb-6">Bài viết nổi bật</h2>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="h-48 md:h-full w-full object-cover" 
                      />
                    </div>
                    <div className="md:w-2/3 p-4">
                      <CardHeader className="p-0 pb-2">
                        <div className="text-sm text-muted-foreground mb-1">{post.category} • {post.date}</div>
                        <CardTitle className="text-xl">
                          <Link to={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 py-2">
                        <p className="text-muted-foreground">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="p-0 pt-2 flex items-center">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className="text-sm">{post.author.name}</span>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
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

export default Home;
