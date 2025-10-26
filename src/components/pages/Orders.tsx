import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Search, Filter, Download, Eye, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const orders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    products: ["Wireless Headphones"],
    amount: 129.99,
    status: "completed",
    paymentMethod: "Credit Card",
    date: "Oct 15, 2025 14:30",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-002",
    customer: "Emma Wilson",
    products: ["Smart Watch Pro", "USB-C Hub"],
    amount: 379.98,
    status: "pending",
    paymentMethod: "PayPal",
    date: "Oct 15, 2025 13:15",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    products: ["Laptop Stand"],
    amount: 49.99,
    status: "completed",
    paymentMethod: "Debit Card",
    date: "Oct 15, 2025 11:45",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
  },
  {
    id: "ORD-004",
    customer: "Sarah Davis",
    products: ["Mechanical Keyboard", "Gaming Mouse"],
    amount: 249.98,
    status: "processing",
    paymentMethod: "Credit Card",
    date: "Oct 15, 2025 10:20",
    shippingAddress: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "ORD-005",
    customer: "James Johnson",
    products: ["Desk Organizer"],
    amount: 34.99,
    status: "completed",
    paymentMethod: "Cash",
    date: "Oct 15, 2025 09:00",
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
  },
  {
    id: "ORD-006",
    customer: "Lisa Anderson",
    products: ["Monitor Arm"],
    amount: 149.99,
    status: "cancelled",
    paymentMethod: "Credit Card",
    date: "Oct 14, 2025 18:30",
    shippingAddress: "987 Cedar Ln, Philadelphia, PA 19101",
  },
  {
    id: "ORD-007",
    customer: "David Martinez",
    products: ["Wireless Headphones", "Laptop Stand"],
    amount: 179.98,
    status: "processing",
    paymentMethod: "PayPal",
    date: "Oct 14, 2025 16:45",
    shippingAddress: "147 Birch St, San Antonio, TX 78201",
  },
  {
    id: "ORD-008",
    customer: "Jennifer Taylor",
    products: ["Smart Watch Pro"],
    amount: 299.99,
    status: "pending",
    paymentMethod: "Credit Card",
    date: "Oct 14, 2025 15:20",
    shippingAddress: "258 Spruce Ave, San Diego, CA 92101",
  },
];

export function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredOrders = () => {
    let filtered = orders;
    
    if (activeTab !== "all") {
      filtered = filtered.filter(order => order.status === activeTab);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredOrders = getFilteredOrders();
  
  const stats = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    completed: orders.filter(o => o.status === "completed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "pending":
        return <Clock className="w-8 h-8 text-yellow-500" />;
      case "processing":
        return <Package className="w-8 h-8 text-blue-500" />;
      case "cancelled":
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return <Package className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Order Management</h2>
          <p className="text-gray-500">View and manage all customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">All Orders</p>
              <h3 className="mt-1 text-gray-900">{stats.all}</h3>
            </div>
            <Package className="w-8 h-8 text-gray-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <h3 className="mt-1 text-gray-900">{stats.pending}</h3>
            </div>
            {getStatusIcon("pending")}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <h3 className="mt-1 text-gray-900">{stats.processing}</h3>
            </div>
            {getStatusIcon("processing")}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <h3 className="mt-1 text-gray-900">{stats.completed}</h3>
            </div>
            {getStatusIcon("completed")}
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cancelled</p>
              <h3 className="mt-1 text-gray-900">{stats.cancelled}</h3>
            </div>
            {getStatusIcon("cancelled")}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search orders by ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All ({stats.all})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({stats.processing})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({stats.cancelled})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Products</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Payment</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm text-gray-900">{order.id}</td>
                      <td className="py-4 px-4 text-sm text-gray-900">{order.customer}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {order.products.join(", ")}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900">Rs {(order.amount * 100).toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{order.paymentMethod}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">{order.date}</td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
