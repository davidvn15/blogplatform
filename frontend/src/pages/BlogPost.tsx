
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BlogPostCard } from "@/components/BlogPostCard";
import { BlogCategories } from "@/components/BlogCategories";
import { Newsletter } from "@/components/Newsletter";
import { Share, MessageCircle, ThumbsUp, Facebook, Twitter, Linkedin, Link as LinkIcon, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { blogApiService, Post, Comment } from '@/services/blogApi';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { toast } = useToast();
  
  // Fetch thông tin bài viết từ API
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { post } = await blogApiService.getPostById(id);
        setPost(post);
        document.title = `${post.title} | Blog`;
      } catch (error) {
        console.error('Failed to fetch post:', error);
        toast({
          title: "Lỗi",
          description: "Không thể tải bài viết. Bài viết không tồn tại hoặc đã bị xóa.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [id, toast]);
  
  // Fetch bài viết liên quan
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!id) return;
      
      setIsRelatedLoading(true);
      try {
        const { relatedPosts } = await blogApiService.getRelatedPosts(id);
        setRelatedPosts(relatedPosts);
      } catch (error) {
        console.error('Failed to fetch related posts:', error);
      } finally {
        setIsRelatedLoading(false);
      }
    };
    
    if (!isLoading && post) {
      fetchRelatedPosts();
    }
  }, [id, isLoading, post]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !id) return;
    
    setIsSubmittingComment(true);
    try {
      const result = await blogApiService.addComment(id, commentText);
      toast({
        title: "Bình luận đã được gửi",
        description: "Bình luận của bạn đã được thêm vào bài viết."
      });
      
      // Trong thực tế, bạn có thể fetch lại post để hiển thị comment mới
      // hoặc thêm comment mới vào state hiện tại
      if (post) {
        const updatedPost = { 
          ...post, 
          comments: [...(post.comments || []), result.comment]
        };
        setPost(updatedPost);
      }
      
      setCommentText('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post?.title || '')}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: "Đường dẫn đã được sao chép",
            description: "Đường dẫn bài viết đã được sao chép vào clipboard."
          });
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };
  
  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
          <Skeleton className="w-full h-[400px] rounded-lg mb-8" />
          <div className="space-y-4 mb-12">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </article>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Bài viết không tồn tại</h1>
          <p className="text-muted-foreground mb-8">
            Bài viết bạn đang tìm kiếm có thể đã bị xóa hoặc đường dẫn không đúng.
          </p>
          <Button asChild>
            <Link to="/blog">Quay lại trang Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2 flex items-center">
            <Link to={`/categories/${post.category}`} className="hover:text-primary">{post.category}</Link>
            <span className="mx-2">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/author/${post.author.name}`} className="font-medium hover:text-primary">{post.author.name}</Link>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-auto rounded-lg object-cover" 
          />
        </div>

        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <div className="mb-12">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/tags/${tag}`} 
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Thích
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {post.comments ? post.comments.length : 0} Bình luận
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Chia sẻ:</span>
              <Button variant="ghost" size="icon" onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('twitter')}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('linkedin')}>
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('copy')}>
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-muted rounded-lg mb-12">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
          <Button>Theo dõi</Button>
        </div>

        <div id="comments" className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Bình luận ({post.comments ? post.comments.length : 0})</h3>
          
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <Textarea
              placeholder="Viết bình luận của bạn..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <Button type="submit" disabled={!commentText.trim()}>Gửi bình luận</Button>
          </form>
          
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-6">
              {post.comments.map((comment: Comment) => (
                <div key={comment.id} className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{comment.author.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="mb-2">{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm">Phản hồi</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          )}
        </div>
      </article>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Bài viết liên quan</h3>
        {isRelatedLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Newsletter />
        </div>
        <div className="md:col-span-1">
          <BlogCategories />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
