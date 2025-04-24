
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface FeaturedPostProps {
  post: Post;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900/70 to-gray-900/30">
      <img 
        src={post.coverImage} 
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90" 
      />
      <div className="relative z-10 flex flex-col h-full min-h-[24rem] p-6 md:p-10">
        <div className="flex-1">
          <div className="inline-block text-white bg-primary/80 px-3 py-1 text-sm font-medium rounded-full mb-4">
            {post.category}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow">
            {post.title}
          </h1>
          <p className="text-white/90 text-lg mb-6 md:w-3/4 max-w-prose drop-shadow">
            {post.excerpt}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full border-2 border-white mr-3"
            />
            <div>
              <div className="text-white font-medium">{post.author.name}</div>
              <div className="text-white/80 text-sm">{post.date}</div>
            </div>
          </div>
          <Button asChild className="bg-white text-gray-900 hover:bg-white/90">
            <Link to={`/blog/${post.id}`}>
              Đọc ngay <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
