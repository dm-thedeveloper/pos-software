import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MoreVertical } from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    product: "Wireless Headphones",
    amount: "Rs 12,999",
    status: "completed",
    date: "2 mins ago",
  },
  {
    id: "ORD-002",
    customer: "Emma Wilson",
    product: "Smart Watch Pro",
    amount: "Rs 29,999",
    status: "pending",
    date: "15 mins ago",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    product: "Laptop Stand",
    amount: "Rs 4,999",
    status: "completed",
    date: "1 hour ago",
  },
  {
    id: "ORD-004",
    customer: "Sarah Davis",
    product: "USB-C Hub",
    amount: "Rs 7,999",
    status: "processing",
    date: "2 hours ago",
  },
  {
    id: "ORD-005",
    customer: "James Johnson",
    product: "Mechanical Keyboard",
    amount: "Rs 15,999",
    status: "completed",
    date: "3 hours ago",
  },
  {
    id: "ORD-006",
    customer: "Lisa Anderson",
    product: "Gaming Mouse",
    amount: "Rs 8,999",
    status: "cancelled",
    date: "5 hours ago",
  },
];

export function RecentOrders() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      case "processing":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900">Recent Orders</h3>
          <p className="text-sm text-gray-500 mt-1">Latest transactions from your store</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm text-gray-600">Order ID</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">Customer</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">Product</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">Time</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-gray-900">{order.id}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{order.customer}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{order.product}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{order.amount}</td>
                <td className="py-4 px-4">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">{order.date}</td>
                <td className="py-4 px-4">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
