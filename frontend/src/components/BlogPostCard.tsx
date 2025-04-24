
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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

interface BlogPostCardProps {
  post: Post;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link to={`/blog/${post.id}`} className="relative block overflow-hidden h-48">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      </Link>
      <div className="flex flex-col flex-1 p-5">
        <CardHeader className="p-0 pb-2">
          <div className="text-sm text-muted-foreground mb-1">{post.category} • {post.date}</div>
          <Link to={`/blog/${post.id}`} className="font-bold text-xl hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardHeader>
        <CardContent className="p-0 py-2 flex-1">
          <p className="text-muted-foreground">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="p-0 pt-4 flex items-center">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-8 w-8 rounded-full mr-2"
          />
          <span className="text-sm">{post.author.name}</span>
        </CardFooter>
      </div>
    </Card>
  );
};
