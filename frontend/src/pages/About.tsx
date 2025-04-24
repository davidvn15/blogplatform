
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About: React.FC = () => {
  // Team members
  const teamMembers = [
    {
      name: "Nguyễn Văn A",
      role: "Người sáng lập & Biên tập viên chính",
      bio: "Với hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ thông tin, Văn A là một chuyên gia về React, TypeScript và phát triển web hiện đại.",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Trần Thị B",
      role: "Nhà phát triển & Tác giả",
      bio: "Chuyên gia về UI/UX và hiệu suất frontend, Thị B là tác giả của nhiều bài viết về design system và trải nghiệm người dùng.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Lê Văn C",
      role: "Kỹ sư Backend & DevOps",
      bio: "Với chuyên môn về kiến trúc cloud và phát triển backend, Văn C đảm bảo hệ thống của chúng tôi luôn hoạt động hiệu quả và an toàn.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Phạm Thị D",
      role: "Người quản lý cộng đồng & Tác giả",
      bio: "Phụ trách xây dựng và phát triển cộng đồng, Thị D là người kết nối những người đam mê công nghệ và chia sẻ kiến thức.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Về chúng tôi</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Câu chuyện của BlogTech</h2>
            <p className="mb-4">
              BlogTech được thành lập vào năm 2023 với mục tiêu chia sẻ kiến thức, kinh nghiệm và những xu hướng mới nhất trong lĩnh vực công nghệ thông tin, đặc biệt là phát triển web và ứng dụng di động.
            </p>
            <p className="mb-4">
              Chúng tôi tin rằng kiến thức cần được chia sẻ một cách rõ ràng, dễ hiểu và có thể áp dụng được vào thực tế. Mỗi bài viết trên BlogTech đều được biên tập cẩn thận, đi sâu vào chi tiết kỹ thuật nhưng vẫn đảm bảo người đọc ở mọi trình độ đều có thể tiếp cận.
            </p>
            <p>
              Với đội ngũ gồm những chuyên gia có kinh nghiệm trong nhiều lĩnh vực khác nhau của công nghệ, chúng tôi cam kết mang đến những nội dung chất lượng, cập nhật và hữu ích cho cộng đồng phát triển.
            </p>
          </CardContent>
        </Card>
        
        <h2 className="text-3xl font-bold mb-6">Đội ngũ của chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {teamMembers.map((member) => (
            <Card key={member.name}>
              <CardHeader className="flex flex-row items-center gap-4">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <h2 className="text-3xl font-bold mb-6">Sứ mệnh của chúng tôi</h2>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 mt-0.5 bg-primary rounded-full p-1.5 text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p>Cung cấp nội dung chất lượng cao về phát triển web, di động và các công nghệ mới nhất</p>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-0.5 bg-primary rounded-full p-1.5 text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p>Xây dựng cộng đồng lập trình viên thân thiện và sẵn sàng hỗ trợ lẫn nhau</p>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-0.5 bg-primary rounded-full p-1.5 text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p>Chia sẻ kinh nghiệm thực tế và bài học từ các dự án thực tế</p>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-0.5 bg-primary rounded-full p-1.5 text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p>Cập nhật các xu hướng công nghệ mới và giúp người đọc áp dụng vào công việc</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Separator className="my-8" />
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Liên hệ với chúng tôi</h2>
          <p className="mb-4">
            Nếu bạn có câu hỏi, góp ý hoặc muốn hợp tác, hãy liên hệ với chúng tôi qua email:
          </p>
          <p className="font-medium text-primary">contact@blogtech.com</p>
        </div>
      </div>
    </div>
  );
};

export default About;
