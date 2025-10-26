import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { TrendingUp } from "lucide-react";

const products = [
  {
    name: "Wireless Headphones",
    sales: 856,
    revenue: "Rs 11,128,400",
    percentage: 92,
    trend: "+18%",
  },
  {
    name: "Smart Watch Pro",
    sales: 642,
    revenue: "Rs 19,255,800",
    percentage: 78,
    trend: "+24%",
  },
  {
    name: "Laptop Stand",
    sales: 534,
    revenue: "Rs 2,670,000",
    percentage: 65,
    trend: "+12%",
  },
  {
    name: "USB-C Hub",
    sales: 421,
    revenue: "Rs 3,367,900",
    percentage: 52,
    trend: "+8%",
  },
  {
    name: "Mechanical Keyboard",
    sales: 387,
    revenue: "Rs 6,191,300",
    percentage: 48,
    trend: "+15%",
  },
];

export function TopProducts() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900">Top Products</h3>
          <p className="text-sm text-gray-500 mt-1">Best performing items this month</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>

      <div className="space-y-6">
        {products.map((product, index) => (
          <div key={product.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">{product.revenue}</p>
                <div className="flex items-center gap-1 justify-end">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">{product.trend}</span>
                </div>
              </div>
            </div>
            <Progress value={product.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}
