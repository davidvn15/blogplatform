
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import BuyMeACoffee from './pages/BuyMeACoffee';
import AuthorDiscussions from './pages/AuthorDiscussions';
import CreatePost from './pages/CreatePost';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:category" element={<Categories />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/buy-me-a-coffee" element={<BuyMeACoffee />} />
      <Route path="/author-discussions" element={<AuthorDiscussions />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/admin/create-post" element={<CreatePost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
