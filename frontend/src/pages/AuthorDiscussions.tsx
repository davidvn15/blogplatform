
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Heart, Flag, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for authors and discussions
const authors = [
  { id: 1, name: "Nguyễn Văn A", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80", role: "Editor" },
  { id: 2, name: "Trần Thị B", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80", role: "Author" },
  { id: 3, name: "Lê Văn C", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80", role: "Author" },
];

const discussions = [
  { 
    id: 1, 
    author: authors[0], 
    title: "Làm thế nào để viết bài hiệu quả hơn?", 
    content: "Các bạn có mẹo nào để viết bài nhanh hơn và chất lượng hơn không? Tôi thường mất rất nhiều thời gian để viết một bài blog.", 
    createdAt: "2025-04-10T10:30:00Z",
    comments: [
      { id: 1, author: authors[1], content: "Tôi thường sử dụng phương pháp Pomodoro: làm việc tập trung 25 phút, nghỉ 5 phút. Rất hiệu quả!", createdAt: "2025-04-10T11:15:00Z" },
      { id: 2, author: authors[2], content: "Việc lên dàn ý chi tiết trước khi viết cũng giúp ích rất nhiều. Bạn có thể thử!", createdAt: "2025-04-10T13:45:00Z" }
    ],
    likes: 5
  },
  { 
    id: 2, 
    author: authors[1], 
    title: "Chủ đề blog nào đang được quan tâm trong năm 2025?", 
    content: "Tôi đang muốn mở rộng chủ đề viết blog của mình. Theo các bạn, những chủ đề nào đang được độc giả quan tâm nhiều nhất?", 
    createdAt: "2025-04-08T14:20:00Z",
    comments: [
      { id: 3, author: authors[0], content: "AI và Machine Learning vẫn đang là xu hướng rất lớn. Bạn có thể viết về cách ứng dụng chúng vào cuộc sống hàng ngày.", createdAt: "2025-04-08T15:30:00Z" }
    ],
    likes: 3
  },
  { 
    id: 3, 
    author: authors[2], 
    title: "Công cụ viết blog nào tốt nhất hiện nay?", 
    content: "Tôi đang sử dụng WordPress nhưng muốn tìm hiểu về các nền tảng khác. Các bạn đang sử dụng công cụ nào?", 
    createdAt: "2025-04-05T09:10:00Z",
    comments: [],
    likes: 2
  }
];

const AuthorDiscussions: React.FC = () => {
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [commentText, setCommentText] = useState("");
  const [activeDiscussionId, setActiveDiscussionId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCreateDiscussion = () => {
    if (!newDiscussionTitle || !newDiscussionContent) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập đầy đủ tiêu đề và nội dung thảo luận.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Thành công",
      description: "Đã tạo thảo luận mới.",
    });

    // Reset form
    setNewDiscussionTitle("");
    setNewDiscussionContent("");
  };

  const handleAddComment = (discussionId: number) => {
    if (!commentText) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập nội dung bình luận.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Thành công",
      description: "Đã thêm bình luận.",
    });

    // Reset form
    setCommentText("");
    setActiveDiscussionId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Diễn đàn tác giả</h1>
      
      <Tabs defaultValue="discussions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="discussions">Thảo luận</TabsTrigger>
          <TabsTrigger value="new">Tạo thảo luận mới</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="space-y-6 mt-6">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={discussion.author.avatar} />
                      <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{discussion.title}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        <span>{discussion.author.name}</span> • <span>{formatDate(discussion.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-1" /> {discussion.likes}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="mb-4">{discussion.content}</p>
                
                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> 
                    Bình luận ({discussion.comments.length})
                  </h4>
                  
                  {discussion.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 pt-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{comment.author.name}</div>
                          <div className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</div>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {activeDiscussionId === discussion.id ? (
                    <div className="flex gap-3 pt-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={authors[0].avatar} />
                        <AvatarFallback>{authors[0].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea 
                          placeholder="Viết bình luận của bạn..." 
                          className="mt-1" 
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setActiveDiscussionId(null);
                              setCommentText("");
                            }}
                          >
                            Hủy
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleAddComment(discussion.id)}
                          >
                            <Send className="h-4 w-4 mr-1" /> Gửi
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="text-sm mt-2"
                      onClick={() => setActiveDiscussionId(discussion.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" /> Thêm bình luận
                    </Button>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="border-t px-6 py-3 flex justify-between">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-1" /> Thích
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4 mr-1" /> Báo cáo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tạo thảo luận mới</CardTitle>
              <CardDescription>
                Chia sẻ ý tưởng, câu hỏi hoặc kinh nghiệm với các tác giả khác.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Tiêu đề</label>
                <Input
                  id="title" 
                  placeholder="Nhập tiêu đề thảo luận"
                  value={newDiscussionTitle}
                  onChange={(e) => setNewDiscussionTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">Nội dung</label>
                <Textarea 
                  id="content"
                  placeholder="Nhập nội dung thảo luận"
                  className="min-h-[200px]"
                  value={newDiscussionContent}
                  onChange={(e) => setNewDiscussionContent(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateDiscussion}>
                <MessageSquare className="h-4 w-4 mr-1" /> Tạo thảo luận
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthorDiscussions;
