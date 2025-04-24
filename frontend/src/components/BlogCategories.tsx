
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const BlogCategories: React.FC = () => {
  // Mock categories
  const categories = [
    { name: "Lập trình", count: 12 },
    { name: "UI/UX", count: 8 },
    { name: "Hiệu suất", count: 5 },
    { name: "Backend", count: 7 },
    { name: "Redux", count: 3 },
    { name: "Bảo mật", count: 4 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh mục</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/categories/${category.name}`}
              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted transition-colors"
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-sm text-muted-foreground">{category.count}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
