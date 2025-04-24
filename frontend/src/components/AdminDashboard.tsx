
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  AlertCircle, 
  MoreHorizontal, 
  ArrowUpRight 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng lượt xem
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +12.5% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Người dùng mới
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +8.2% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bài viết
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +4.3% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bình luận
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +19.2% <ArrowUpRight className="ml-1 h-3 w-3" />
              </span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Số liệu thống kê</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
              <p className="text-muted-foreground">Biểu đồ thống kê lượt xem theo thời gian sẽ hiển thị ở đây</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>
              Có 8 hoạt động trong 24 giờ qua
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </span>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Nguyễn Văn A đã đăng ký tài khoản</p>
                  <p className="text-xs text-muted-foreground">2 giờ trước</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Bài viết mới đã được tạo: "Bắt đầu với React"</p>
                  <p className="text-xs text-muted-foreground">5 giờ trước</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Trần Thị B đã bình luận về bài viết "Bắt đầu với React"</p>
                  <p className="text-xs text-muted-foreground">8 giờ trước</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                </span>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Có một báo cáo bình luận không phù hợp</p>
                  <p className="text-xs text-muted-foreground">12 giờ trước</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bài viết phổ biến</CardTitle>
            <CardDescription>
              Top 5 bài viết được xem nhiều nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Bắt đầu với React và TypeScript", views: "4,320" },
                { title: "Tối ưu hóa hiệu suất trong ứng dụng React", views: "3,891" },
                { title: "Thiết kế UI/UX hiện đại với Tailwind CSS", views: "2,789" },
                { title: "Quản lý trạng thái toàn cục với Redux", views: "2,546" },
                { title: "Xây dựng API với Node.js và Express", views: "2,103" },
              ].map((post, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{post.title}</p>
                    <p className="text-xs text-muted-foreground">{post.views} lượt xem</p>
                  </div>
                  <TrendingUp className={`h-4 w-4 ${index < 2 ? "text-emerald-500" : "text-muted-foreground"}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danh mục phổ biến</CardTitle>
            <CardDescription>
              Thống kê bài viết theo danh mục
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Lập trình", posts: 45, percent: 36 },
                { name: "UI/UX", posts: 32, percent: 26 },
                { name: "Backend", posts: 22, percent: 18 },
                { name: "Hiệu suất", posts: 15, percent: 12 },
                { name: "Bảo mật", posts: 10, percent: 8 },
              ].map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category.posts} bài viết</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${category.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Người dùng mới</CardTitle>
            <CardDescription>
              Người dùng đăng ký gần đây
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Nguyễn Văn A", email: "nguyenvana@example.com", time: "2 giờ trước" },
                { name: "Trần Thị B", email: "tranthib@example.com", time: "5 giờ trước" },
                { name: "Lê Văn C", email: "levanc@example.com", time: "1 ngày trước" },
                { name: "Phạm Thị D", email: "phamthid@example.com", time: "2 ngày trước" },
                { name: "Hoàng Minh E", email: "hoangminhe@example.com", time: "3 ngày trước" },
              ].map((user, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">{user.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
