
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { AdminLayout } from "@/components/AdminLayout";
import { AdminPostList } from "@/components/AdminPostList";
import { AdminCommentList } from "@/components/AdminCommentList";
import { AdminUserList } from "@/components/AdminUserList";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useToast } from '@/hooks/use-toast';

const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !content || !category) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ các thông tin cần thiết.",
        variant: "destructive"
      });
      return;
    }

    // Mock API call to save post
    toast({
      title: "Thành công",
      description: "Bài viết đã được lưu thành công.",
    });

    // Reset form
    setTitle('');
    setContent('');
    setExcerpt('');
    setCategory('');
    setTags('');
    setCoverImage('');
  };

  const handlePublish = () => {
    if (!title || !content || !category) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ các thông tin cần thiết.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Thành công",
      description: "Bài viết đã được xuất bản thành công.",
    });
  };

  return (
    <AdminLayout>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Tổng quan</TabsTrigger>
          <TabsTrigger value="posts">Bài viết</TabsTrigger>
          <TabsTrigger value="new-post">Bài viết mới</TabsTrigger>
          <TabsTrigger value="comments">Bình luận</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="pt-4">
          <AdminDashboard />
        </TabsContent>
        
        <TabsContent value="posts" className="pt-4">
          <AdminPostList />
        </TabsContent>
        
        <TabsContent value="new-post" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tạo bài viết mới</CardTitle>
              <CardDescription>
                Tạo và xuất bản bài viết mới cho blog của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    placeholder="Nhập tiêu đề bài viết"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Lập trình</SelectItem>
                        <SelectItem value="design">Thiết kế</SelectItem>
                        <SelectItem value="performance">Hiệu suất</SelectItem>
                        <SelectItem value="seo">SEO</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Thẻ (phân cách bởi dấu phẩy)</Label>
                    <Input
                      id="tags"
                      placeholder="React, TypeScript, Frontend,..."
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Tóm tắt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Nhập tóm tắt ngắn về bài viết của bạn"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Ảnh bìa URL</Label>
                  <Input
                    id="coverImage"
                    placeholder="https://example.com/image.jpg"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung</Label>
                  <Textarea
                    id="content"
                    placeholder="Nhập nội dung bài viết của bạn tại đây..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[300px]"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" variant="outline" onClick={handleSubmit}>
                Lưu bản nháp
              </Button>
              <Button onClick={handlePublish}>Xuất bản</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="comments" className="pt-4">
          <AdminCommentList />
        </TabsContent>
        
        <TabsContent value="users" className="pt-4">
          <AdminUserList />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Admin;
