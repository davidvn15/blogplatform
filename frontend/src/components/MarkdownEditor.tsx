
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, FileText, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Hàm đơn giản để hiển thị nội dung Markdown
const SimpleMarkdownRenderer = ({ children }: { children: string }) => {
  // Chuyển đổi cơ bản đoạn markdown thành HTML
  const renderMarkdown = (text: string) => {
    // Chuyển đổi headings
    let html = text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Chuyển đổi bôi đậm và in nghiêng
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Chuyển đổi đường link
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Chuyển đổi danh sách
      .replace(/^\s*-\s*(.*$)/gim, '<li>$1</li>')
      // Chuyển đổi xuống dòng
      .replace(/\n/gim, '<br />');
    
    // Wrap danh sách vào thẻ ul
    html = html.replace(/<li>.*?<\/li>/gs, match => {
      return '<ul>' + match + '</ul>';
    });
    
    return { __html: html };
  };

  return <div dangerouslySetInnerHTML={renderMarkdown(children)} />;
};

export const MarkdownEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSaveDraft = () => {
    if (!title) {
      toast({
        title: "Thiếu tiêu đề",
        description: "Vui lòng nhập tiêu đề cho bài viết.",
        variant: "destructive"
      });
      return;
    }

    // Mock saving draft
    toast({
      title: "Thành công",
      description: "Bài viết đã được lưu dưới dạng bản nháp.",
    });
  };

  const handlePublish = () => {
    if (!title || !content || !category) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập đầy đủ tiêu đề, nội dung và danh mục.",
        variant: "destructive"
      });
      return;
    }

    // Mock publishing
    toast({
      title: "Thành công",
      description: "Bài viết đã được xuất bản thành công.",
    });
    
    // Navigate back to posts list
    navigate('/admin');
  };

  return (
    <div className="container py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Tạo bài viết mới</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin bài viết</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                placeholder="Nhập tiêu đề bài viết"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Danh mục</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
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

              <div>
                <Label htmlFor="tags">Thẻ (phân cách bởi dấu phẩy)</Label>
                <Input
                  id="tags"
                  placeholder="React, TypeScript, Frontend,..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="featuredImage">Hình ảnh nổi bật (URL)</Label>
              <Input
                id="featuredImage"
                placeholder="https://example.com/image.jpg"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nội dung</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="edit">
              <TabsList className="mb-4">
                <TabsTrigger value="edit">
                  <FileText className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Xem trước
                </TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <div className="border rounded-md">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[500px] p-4 font-mono text-sm resize-none outline-none border-0 focus:ring-0"
                    placeholder="Viết nội dung bài viết của bạn ở đây sử dụng Markdown..."
                  ></textarea>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Hỗ trợ cú pháp Markdown: **in đậm**, *in nghiêng*, # Tiêu đề, [Liên kết](url), ![Hình ảnh](url), v.v...
                </div>
              </TabsContent>
              <TabsContent value="preview">
                <div className="border rounded-md p-4 min-h-[500px] prose dark:prose-invert max-w-none">
                  {content ? (
                    <SimpleMarkdownRenderer>{content}</SimpleMarkdownRenderer>
                  ) : (
                    <p className="text-muted-foreground italic">Nội dung xem trước sẽ xuất hiện ở đây...</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Lưu bản nháp
            </Button>
            <Button onClick={handlePublish}>
              Xuất bản
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MarkdownEditor;
