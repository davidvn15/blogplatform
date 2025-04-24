
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Coffee, Heart, Star, CreditCard, Gift } from "lucide-react";

const BuyMeACoffee: React.FC = () => {
  const [amount, setAmount] = useState("50000");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Cảm ơn bạn rất nhiều!",
        description: "Khoản đóng góp của bạn sẽ giúp chúng tôi tiếp tục tạo ra nội dung chất lượng.",
      });
    }, 1500);
  };

  const predefinedAmounts = [
    { value: "20000", label: "20.000đ" },
    { value: "50000", label: "50.000đ" },
    { value: "100000", label: "100.000đ" },
    { value: "200000", label: "200.000đ" },
  ];

  const supporters = [
    { name: "Nguyễn Văn A", amount: "200.000đ", message: "Cảm ơn về những bài viết chất lượng!", date: "2025-04-05" },
    { name: "Trần Thị B", amount: "100.000đ", message: "Tiếp tục phát huy nhé!", date: "2025-04-02" },
    { name: "Lê C", amount: "50.000đ", message: "Tuyệt vời!", date: "2025-03-30" },
    { name: "Phạm D", amount: "100.000đ", message: "Mong nhận được nhiều bài viết về React hơn nữa.", date: "2025-03-25" },
    { name: "Hoàng E", amount: "500.000đ", message: "Cảm ơn vì đã tạo ra nguồn tài nguyên tuyệt vời này.", date: "2025-03-20" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Coffee className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Hỗ trợ BlogTech</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Nếu bạn thích nội dung của chúng tôi và muốn hỗ trợ, bạn có thể "mua cho chúng tôi một ly cà phê"!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Hỗ trợ nội dung</CardTitle>
              <CardDescription>
                Giúp chúng tôi tiếp tục tạo ra nội dung chất lượng cao
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Nội dung độc quyền</CardTitle>
              <CardDescription>
                Nhận quyền truy cập vào nội dung và tài nguyên độc quyền
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Cảm ơn</CardTitle>
              <CardDescription>
                Đóng góp của bạn góp phần vào việc phát triển cộng đồng
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Mua cho tôi một ly cà phê</CardTitle>
                <CardDescription>
                  Chọn số tiền bạn muốn đóng góp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      {predefinedAmounts.map((amt) => (
                        <Button
                          key={amt.value}
                          type="button"
                          variant={amount === amt.value ? "default" : "outline"}
                          onClick={() => setAmount(amt.value)}
                          className="w-full"
                        >
                          {amt.label}
                        </Button>
                      ))}
                    </div>

                    <div className="relative">
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-16"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        VND
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="card" className="mb-6">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="card">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Thẻ tín dụng
                      </TabsTrigger>
                      <TabsTrigger value="bank">
                        <Gift className="h-4 w-4 mr-2" />
                        Chuyển khoản
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <label htmlFor="cardNumber" className="block text-sm font-medium">
                          Số thẻ
                        </label>
                        <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium">
                            Ngày hết hạn
                          </label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium">
                            CVC
                          </label>
                          <Input id="cvc" placeholder="CVC" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="bank" className="mt-4">
                      <div className="rounded-lg bg-muted p-4">
                        <h4 className="font-medium mb-2">Thông tin chuyển khoản</h4>
                        <p className="text-sm mb-1">Ngân hàng: BIDV</p>
                        <p className="text-sm mb-1">Số tài khoản: 12345678900</p>
                        <p className="text-sm mb-1">Tên: CONG TY BLOGTECH</p>
                        <p className="text-sm mb-3">Nội dung: SUPPORT {name || "[Tên của bạn]"}</p>
                        <p className="text-sm text-muted-foreground">Vui lòng gửi biên lai cho chúng tôi qua email support@blogtech.com</p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Tên của bạn (không bắt buộc)
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Cách bạn muốn được gọi tên"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Lời nhắn (không bắt buộc)
                      </label>
                      <Input
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Bạn có muốn nhắn gì không?"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting || amount === "0" || !amount}>
                    {isSubmitting ? "Đang xử lý..." : "Hỗ trợ ngay"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Người hỗ trợ gần đây</CardTitle>
                <CardDescription>
                  Cảm ơn tất cả những người đã hỗ trợ chúng tôi!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supporters.map((supporter, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium">{supporter.name}</div>
                        <div className="text-sm text-primary font-medium">{supporter.amount}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{supporter.message}</p>
                      <div className="text-xs text-muted-foreground">{supporter.date}</div>
                      {index < supporters.length - 1 && <Separator className="mt-3" />}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" size="sm">
                  Xem tất cả
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyMeACoffee;
