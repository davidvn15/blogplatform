
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">TechBlog</span>
        </Link>
        
        <nav className="ml-auto flex gap-2 md:gap-5 items-center">
          <NavLink to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Trang chủ
          </NavLink>
          <NavLink to="/blog" className="text-sm font-medium transition-colors hover:text-primary">
            Blog
          </NavLink>
          <NavLink to="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Danh mục
          </NavLink>
          <NavLink to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            Giới thiệu
          </NavLink>
          <NavLink to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Liên hệ
          </NavLink>
          <NavLink to="/author-discussions" className="text-sm font-medium transition-colors hover:text-primary">
            Diễn đàn tác giả
          </NavLink>
          <NavLink to="/buy-me-a-coffee" className="text-sm font-medium transition-colors hover:text-primary">
            Ủng hộ
          </NavLink>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="default" size="sm">
              <Link to="/admin">Quản trị</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
