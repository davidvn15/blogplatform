
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Trash2,
  FilterX,
  ArrowUpDown
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Comment {
  id: string;
  content: string;
  status: 'approved' | 'pending' | 'spam';
  author: string;
  email: string;
  postTitle: string;
  date: string;
}

export const AdminCommentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  
  // Mock data for demonstration
  const comments: Comment[] = [
    { id: "1", content: "Bài viết rất hữu ích! Tôi đã học được nhiều điều mới về cách sử dụng TypeScript với React.", status: "approved", author: "Trần Thị B", email: "tran.b@example.com", postTitle: "Bắt đầu với React và TypeScript", date: "2025-04-06" },
    { id: "2", content: "Tôi đã áp dụng những kỹ thuật trong bài viết này vào dự án của mình và thấy hiệu quả rõ rệt.", status: "approved", author: "Lê Văn C", email: "le.c@example.com", postTitle: "Bắt đầu với React và TypeScript", date: "2025-04-05" },
    { id: "3", content: "Liệu có thể áp dụng những kỹ thuật này cho Next.js không?", status: "pending", author: "Phạm Thị D", email: "pham.d@example.com", postTitle: "Tối ưu hóa hiệu suất trong React", date: "2025-04-04" },
    { id: "4", content: "Buy the best watches at discount prices! Visit www.spam-site.com now!", status: "spam", author: "Spammer", email: "spam@example.com", postTitle: "Thiết kế UI/UX với Tailwind CSS", date: "2025-04-03" },
    { id: "5", content: "Có thể giải thích kỹ hơn về useReducer không?", status: "pending", author: "Hoàng Minh E", email: "hoang.e@example.com", postTitle: "Quản lý trạng thái với Redux Toolkit", date: "2025-04-02" },
  ];

  // Filter comments
  const filteredComments = comments.filter(comment => {
    const matchesSearchTerm = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    return matchesSearchTerm && matchesStatus;
  });

  // Handle select all
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedComments(filteredComments.map(comment => comment.id));
    } else {
      setSelectedComments([]);
    }
  };

  // Handle individual select
  const handleSelectComment = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedComments([...selectedComments, id]);
    } else {
      setSelectedComments(selectedComments.filter(commentId => commentId !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Bình luận</h2>
          <p className="text-muted-foreground">Quản lý tất cả bình luận từ người đọc.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bình luận..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
              <SelectItem value="pending">Đang chờ</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setStatusFilter('all');
          }}>
            <FilterX className="mr-2 h-4 w-4" />
            Xóa bộ lọc
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-1/3">
                <div className="flex items-center space-x-1">
                  <span>Nội dung</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead>Bài viết</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map(comment => (
              <TableRow key={comment.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedComments.includes(comment.id)}
                    onCheckedChange={(checked) => handleSelectComment(comment.id, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="truncate max-w-xs">
                    {comment.content}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{comment.author}</div>
                    <div className="text-xs text-muted-foreground">{comment.email}</div>
                  </div>
                </TableCell>
                <TableCell>{comment.postTitle}</TableCell>
                <TableCell>{comment.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-md text-xs ${
                    comment.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 
                    comment.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {comment.status === 'approved' ? 'Đã duyệt' : 
                     comment.status === 'pending' ? 'Đang chờ' : 
                     'Spam'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" className="text-green-600">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-amber-600">
                      <XCircle className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredComments.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">Không tìm thấy bình luận nào</h3>
                    <p className="text-muted-foreground mb-4">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
                    <Button onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}>
                      <FilterX className="mr-2 h-4 w-4" />
                      Xóa bộ lọc
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedComments.length > 0 && (
        <div className="flex justify-between items-center border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Đã chọn {selectedComments.length} bình luận
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Duyệt
            </Button>
            <Button variant="outline" size="sm">
              <XCircle className="h-4 w-4 mr-1" />
              Đánh dấu spam
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Xóa
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
