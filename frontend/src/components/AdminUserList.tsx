
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  User,
  UserPlus,
  UserCheck,
  UserX,
  Mail,
  Eye,
  EyeOff,
  Trash2, 
  Edit,
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
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'editor' | 'subscriber';
  status: 'active' | 'inactive';
  verified: boolean;
  createdAt: string;
  lastLogin: string;
}

export const AdminUserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Mock data for demonstration
  const users: User[] = [
    { id: "1", name: "Nguyễn Văn A", email: "admin@example.com", role: "admin", status: "active", verified: true, createdAt: "2025-01-10", lastLogin: "2025-04-10" },
    { id: "2", name: "Trần Thị B", email: "editor@example.com", role: "editor", status: "active", verified: true, createdAt: "2025-02-15", lastLogin: "2025-04-09" },
    { id: "3", name: "Lê Văn C", email: "author1@example.com", role: "author", status: "active", verified: true, createdAt: "2025-03-01", lastLogin: "2025-04-08" },
    { id: "4", name: "Phạm Văn D", email: "author2@example.com", role: "author", status: "inactive", verified: false, createdAt: "2025-03-15", lastLogin: "2025-03-20" },
    { id: "5", name: "Hoàng Thị E", email: "subscriber1@example.com", role: "subscriber", status: "active", verified: true, createdAt: "2025-03-20", lastLogin: "2025-04-05" },
  ];

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearchTerm && matchesRole && matchesStatus;
  });

  // Handle select all
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle individual select
  const handleSelectUser = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    }
  };

  // Handle status toggle
  const handleStatusToggle = (id: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: "Trạng thái đã thay đổi",
      description: `Người dùng đã được chuyển sang trạng thái ${newStatus === 'active' ? 'hoạt động' : 'không hoạt động'}.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Người dùng</h2>
          <p className="text-muted-foreground">Quản lý tất cả người dùng của blog.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Biên tập viên</SelectItem>
              <SelectItem value="author">Tác giả</SelectItem>
              <SelectItem value="subscriber">Người đọc</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setRoleFilter('all');
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
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[250px]">
                <div className="flex items-center space-x-1">
                  <span>Người dùng</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Đăng ký</TableHead>
              <TableHead>Đăng nhập cuối</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div>{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-md text-xs ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                    user.role === 'editor' ? 'bg-purple-100 text-purple-800' : 
                    user.role === 'author' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 
                     user.role === 'editor' ? 'Biên tập viên' : 
                     user.role === 'author' ? 'Tác giả' : 
                     'Người đọc'}
                  </span>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={user.status === 'active'}
                      onCheckedChange={() => handleStatusToggle(user.id, user.status)}
                    />
                    <span className="text-xs">
                      {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <User className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">Không tìm thấy người dùng nào</h3>
                    <p className="text-muted-foreground mb-4">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
                    <Button onClick={() => {
                      setSearchTerm('');
                      setRoleFilter('all');
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

      {selectedUsers.length > 0 && (
        <div className="flex justify-between items-center border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Đã chọn {selectedUsers.length} người dùng
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <UserCheck className="h-4 w-4 mr-1" />
              Kích hoạt
            </Button>
            <Button variant="outline" size="sm">
              <UserX className="h-4 w-4 mr-1" />
              Vô hiệu hóa
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
