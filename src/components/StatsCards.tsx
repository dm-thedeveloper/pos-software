import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { Card } from "./ui/card";

export function StatsCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: "Rs 4,523,450",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Total Customers",
      value: "892",
      change: "+15.3%",
      isPositive: true,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Products Sold",
      value: "3,456",
      change: "-3.1%",
      isPositive: false,
      icon: Package,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="mt-2 text-gray-900">{stat.value}</h3>
                <div className="flex items-center gap-1 mt-2">
                  {stat.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm ${
                      stat.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
