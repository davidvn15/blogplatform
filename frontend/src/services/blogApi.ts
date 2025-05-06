import axios from 'axios';
import { toast } from "@/hooks/use-toast";

// Types
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}

export interface Comment {
  id: string;
  author: Author;
  date: string;
  content: string;
  likes: number;
}

export interface Post {
  id: string;
  title: string;
  content?: string;
  excerpt: string;
  date: string;
  readTime?: string;
  author: Author;
  category: string;
  tags?: string[];
  coverImage: string;
  views?: number;
  comments?: Comment[];
  status?: 'draft' | 'published';
}

// Tạo một instance của axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9191',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Mock data (được giữ nguyên từ api.ts)
const authors: Author[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    bio: "Kỹ sư phần mềm với hơn 10 năm kinh nghiệm trong phát triển web. Chuyên gia về React và TypeScript."
  },
  {
    id: "2",
    name: "Trần Thị B",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    bio: "UI/UX Designer với 5 năm kinh nghiệm thiết kế giao diện người dùng."
  },
  {
    id: "3",
    name: "Lê Văn C",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    bio: "Chuyên gia về tối ưu hóa hiệu suất web và phát triển backend."
  },
  {
    id: "4",
    name: "Phạm Thị D",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    bio: "Software Architect với kinh nghiệm phát triển các ứng dụng quy mô lớn."
  },
  {
    id: "5",
    name: "Hoàng Minh E",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    bio: "Chuyên gia về Node.js và xây dựng API."
  }
];

const comments: Comment[] = [
  {
    id: "c1",
    author: authors[1],
    date: "2025-04-06",
    content: "Bài viết rất hữu ích! Tôi đã học được nhiều điều mới về cách sử dụng TypeScript với React.",
    likes: 3
  },
  {
    id: "c2",
    author: authors[2],
    date: "2025-04-05",
    content: "Tôi đã áp dụng những kỹ thuật trong bài viết này vào dự án của mình và thấy hiệu quả rõ rệt. Cảm ơn tác giả!",
    likes: 5
  },
  {
    id: "c3",
    author: authors[3],
    date: "2025-04-04",
    content: "Tôi nghĩ bạn nên đề cập thêm về cách xử lý TypeScript với các hooks phức tạp hơn.",
    likes: 2
  },
  {
    id: "c4",
    author: authors[4],
    date: "2025-04-03",
    content: "Phần ví dụ về useReducer với TypeScript rất chi tiết và dễ hiểu.",
    likes: 4
  }
];

const posts: Post[] = [
  {
    id: "1",
    title: "Bắt đầu với React và TypeScript trong năm 2025",
    content: `
      <p>React và TypeScript là một sự kết hợp mạnh mẽ đang trở thành tiêu chuẩn trong phát triển frontend hiện đại. Bài viết này sẽ hướng dẫn bạn về cách bắt đầu với React và TypeScript trong năm 2025, khi cả hai công nghệ đã có nhiều cải tiến đáng kể.</p>
      
      <h2>Tại sao nên sử dụng TypeScript với React?</h2>
      <p>TypeScript cung cấp kiểu dữ liệu tĩnh cho JavaScript, giúp phát hiện lỗi sớm hơn trong quá trình phát triển. Khi kết hợp với React, TypeScript mang lại nhiều lợi ích:</p>
      <ul>
        <li>Phát hiện lỗi sớm hơn trong quá trình phát triển</li>
        <li>Trải nghiệm phát triển tốt hơn với IntelliSense và auto-completion</li>
        <li>Refactoring code an toàn và dễ dàng hơn</li>
        <li>Documentation tốt hơn cho các components và props</li>
      </ul>
      
      <h2>Thiết lập môi trường phát triển</h2>
      <p>Với sự phát triển của các công cụ hiện đại, việc thiết lập môi trường phát triển React + TypeScript trở nên dễ dàng hơn bao giờ hết. Cách đơn giản nhất là sử dụng Vite:</p>
      <pre><code>npm create vite@latest my-react-ts-app -- --template react-ts</code></pre>
      <p>Hoặc nếu bạn muốn sử dụng Create React App (mặc dù nó đang dần được thay thế bởi các tool hiện đại hơn):</p>
      <pre><code>npx create-react-app my-app --template typescript</code></pre>
      
      <h2>Các khái niệm cơ bản khi làm việc với TypeScript trong React</h2>
      <h3>1. Định nghĩa props cho components</h3>
      <p>Một trong những việc phổ biến nhất khi sử dụng TypeScript với React là định nghĩa kiểu dữ liệu cho props:</p>
      <pre><code>
      interface ButtonProps {
        text: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary' | 'danger';
        disabled?: boolean;
      }
      
      const Button: React.FC<ButtonProps> = ({
        text,
        onClick,
        variant = 'primary',
        disabled = false
      }) => {
        return (
          &lt;button
            onClick={onClick}
            disabled={disabled}
            className={\`btn btn-\${variant}\`}
          &gt;
            {text}
          &lt;/button&gt;
        );
      };
      </code></pre>
      
      <h3>2. Các hooks với TypeScript</h3>
      <p>TypeScript có thể cải thiện đáng kể trải nghiệm khi làm việc với React hooks:</p>
      <pre><code>
      // useState với kiểu dữ liệu rõ ràng
      const [count, setCount] = useState<number>(0);
      
      // useReducer với kiểu dữ liệu đầy đủ
      interface State {
        count: number;
        text: string;
      }
      
      type Action =
        | { type: 'INCREMENT' }
        | { type: 'DECREMENT' }
        | { type: 'SET_TEXT'; payload: string };
      
      const reducer = (state: State, action: Action): State => {
        switch (action.type) {
          case 'INCREMENT':
            return { ...state, count: state.count + 1 };
          case 'DECREMENT':
            return { ...state, count: state.count - 1 };
          case 'SET_TEXT':
            return { ...state, text: action.payload };
        }
      };
      
      const [state, dispatch] = useReducer(reducer, { count: 0, text: '' });
      </code></pre>
      
      <h2>Best practices trong năm 2025</h2>
      <p>Dưới đây là một số best practices khi làm việc với React và TypeScript trong năm 2025:</p>
      <ul>
        <li>Sử dụng functional components thay vì class components</li>
        <li>Tận dụng React.FC cho các component đơn giản</li>
        <li>Sử dụng interface cho props, state và context</li>
        <li>Tách biệt các kiểu dữ liệu phức tạp vào các file riêng</li>
        <li>Sử dụng generic types cho các hooks và components tái sử dụng</li>
        <li>Tận dụng các utility types của TypeScript như Partial, Required, Pick, Omit, etc.</li>
      </ul>
      
      <h2>Kết luận</h2>
      <p>Trong năm 2025, sự kết hợp giữa React và TypeScript tiếp tục là lựa chọn hàng đầu cho các dự án frontend hiện đại. Với những tiến bộ về công cụ và ecosystem, việc phát triển ứng dụng trở nên hiệu quả và an toàn hơn. Bắt đầu áp dụng TypeScript vào dự án React của bạn ngay từ hôm nay để tận hưởng những lợi ích mà nó mang lại.</p>
    `,
    excerpt: "Khám phá các tính năng mới nhất và cách tạo ứng dụng hiện đại với React và TypeScript",
    date: "2025-04-05",
    readTime: "8 phút đọc",
    author: authors[0],
    category: "Lập trình",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "TypeScript", "Frontend", "JavaScript", "Web Development"],
    views: 1205,
    comments: [comments[0], comments[1]],
    status: "published"
  },
  {
    id: "2",
    title: "Tối ưu hóa hiệu suất trong ứng dụng React",
    excerpt: "Các kỹ thuật và phương pháp để cải thiện tốc độ và trải nghiệm người dùng",
    date: "2025-04-01",
    readTime: "6 phút đọc",
    author: authors[1],
    category: "Hiệu suất",
    coverImage: "https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "Performance", "Optimization", "Frontend"],
    views: 843,
    comments: [comments[2]],
    status: "published"
  },
  {
    id: "3",
    title: "Thiết kế UI/UX hiện đại với Tailwind CSS",
    excerpt: "Tạo giao diện đẹp mắt và đáp ứng nhanh với Tailwind CSS",
    date: "2025-03-28",
    readTime: "5 phút đọc",
    author: authors[2],
    category: "UI/UX",
    coverImage: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    tags: ["UI/UX", "Tailwind CSS", "Design", "Frontend"],
    views: 725,
    comments: [comments[3]],
    status: "published"
  },
  {
    id: "4",
    title: "Quản lý trạng thái toàn cục với Redux Toolkit",
    excerpt: "Cách tốt nhất để quản lý trạng thái ứng dụng phức tạp trong React",
    date: "2025-03-25",
    readTime: "7 phút đọc",
    author: authors[3],
    category: "Redux",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    tags: ["Redux", "Redux Toolkit", "State Management", "React"],
    views: 0,
    comments: [],
    status: "draft"
  },
  {
    id: "5",
    title: "Xây dựng API với Node.js và Express",
    excerpt: "Hướng dẫn từng bước để tạo một RESTful API bằng Node.js và Express",
    date: "2025-03-20",
    readTime: "10 phút đọc",
    author: authors[4],
    category: "Backend",
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    tags: ["Node.js", "Express", "API", "Backend"],
    views: 0,
    comments: [],
    status: "draft"
  },
  {
    id: "6",
    title: "Bảo mật trong ứng dụng web hiện đại",
    excerpt: "Các phương pháp bảo mật tốt nhất để bảo vệ ứng dụng web của bạn khỏi các mối đe dọa",
    date: "2025-03-15",
    readTime: "9 phút đọc",
    author: authors[0],
    category: "Bảo mật",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    tags: ["Security", "Web Development", "Authentication", "Authorization"],
    views: 650,
    comments: [],
    status: "published"
  }
];

// Interceptor để mô phỏng độ trễ của network
api.interceptors.response.use(
  (response) => {
    // Thêm độ trễ giả lập từ 300ms đến 800ms
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response);
      }, Math.random() * 500 + 300);
    });
  },
  (error) => {
    // Handle error cases
    console.error('API Error:', error);
    toast({
      title: 'Lỗi kết nối',
      description: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
      variant: 'destructive'
    });
    return Promise.reject(error);
  }
);

// Mock API response handler
const mockResponse = (data: any) => {
  return { data };
};

// Blog API Service
export const blogApiService = {
  // Lấy danh sách bài viết
  async getPosts(params?: {
    category?: string;
    search?: string;
    sortBy?: 'newest' | 'oldest';
    page?: number;
    pageSize?: number;
  }) {
    try {
      // Trong thực tế, bạn sẽ gửi request như sau:
      // const response = await api.get('/posts', { params });
      
      // Mock data
      let filteredPosts = [...posts];
      
      // Áp dụng các bộ lọc
      if (params?.category && params.category !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === params.category);
      }
      
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.author.name.toLowerCase().includes(searchLower)
        );
      }
      
      // Áp dụng sắp xếp
      if (params?.sortBy) {
        filteredPosts.sort((a, b) => {
          if (params.sortBy === 'newest') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          } else {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          }
        });
      }
      
      // Chỉ trả về bài viết đã xuất bản cho giao diện người dùng
      filteredPosts = filteredPosts.filter(post => post.status === 'published');
      
      // Áp dụng phân trang
      const page = params?.page || 1;
      const pageSize = params?.pageSize || 10;
      const totalItems = filteredPosts.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      
      const startIndex = (page - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalItems);
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
      
      // Mô phỏng response từ API thật
      const responseData = {
        posts: paginatedPosts,
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages
        }
      };
      
      // Trong thực tế, response sẽ được trả về từ axios
      // Ở đây chúng ta mô phỏng response
      return mockResponse(responseData).data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách bài viết. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      throw error;
    }
  },
  
  // Lấy bài viết theo ID
  async getPostById(id: string) {
    try {
      // Trong thực tế: const response = await api.get(`/posts/${id}`);
      
      // Mock logic
      const post = posts.find(post => post.id === id);
      
      if (!post) {
        throw new Error('Post not found');
      }
      
      // Mô phỏng response từ API thật
      return mockResponse({ post }).data;
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      toast({
        title: "Lỗi",
        description: "Không thể tải bài viết. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      throw error;
    }
  },
  
  // Lấy bài viết liên quan
  async getRelatedPosts(postId: string, limit = 2) {
    try {
      // Trong thực tế: const response = await api.get(`/posts/${postId}/related`, { params: { limit } });
      
      // Mock logic
      const currentPost = posts.find(post => post.id === postId);
      if (!currentPost) {
        throw new Error('Post not found');
      }
      
      // Lọc bài viết cùng danh mục nhưng không phải bài hiện tại
      let relatedPosts = posts.filter(
        post => post.category === currentPost.category && 
              post.id !== currentPost.id &&
              post.status === 'published'
      );
      
      // Nếu không đủ bài viết, lấy thêm bài mới nhất
      if (relatedPosts.length < limit) {
        const otherPosts = posts.filter(
          post => post.category !== currentPost.category && 
                post.id !== currentPost.id &&
                post.status === 'published'
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        relatedPosts = [...relatedPosts, ...otherPosts].slice(0, limit);
      } else {
        relatedPosts = relatedPosts.slice(0, limit);
      }
      
      // Mô phỏng response từ API thật
      return mockResponse({ relatedPosts }).data;
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return { relatedPosts: [] };
    }
  },
  
  // Lấy danh sách bài viết cho quản trị
  async getAdminPosts(params?: {
    status?: 'all' | 'published' | 'draft';
    search?: string;
  }) {
    try {
      // Trong thực tế: const response = await api.get('/admin/posts', { params });
      
      // Mock logic
      let filteredPosts = [...posts];
      
      // Áp dụng filter theo status
      if (params?.status && params.status !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.status === params.status);
      }
      
      // Áp dụng search
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower) ||
          post.author.name.toLowerCase().includes(searchLower)
        );
      }
      
      // Mô phỏng response từ API thật
      return mockResponse({ posts: filteredPosts }).data;
    } catch (error) {
      console.error('Error fetching admin posts:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách bài viết quản trị. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      throw error;
    }
  },

  // Thêm API để gửi comment
  async addComment(postId: string, content: string) {
    try {
      // Trong thực tế: const response = await api.post(`/posts/${postId}/comments`, { content });
      
      // Mock logic - tạo một comment mới
      const newComment: Comment = {
        id: `c${Math.floor(Math.random() * 1000)}`,
        author: authors[0], // Giả sử người dùng hiện tại là author đầu tiên
        date: new Date().toISOString().split('T')[0],
        content,
        likes: 0
      };
      
      // Trong thực tế, comment mới sẽ được lưu trên server
      // Ở đây chúng ta chỉ mô phỏng response
      return mockResponse({ comment: newComment }).data;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi bình luận. Vui lòng thử lại sau.",
        variant: "destructive"
      });
      throw error;
    }
  }
};
