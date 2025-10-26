import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone,
  MapPin,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const customers = [
  {
    id: "CUST-001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    totalSpent: 2459.87,
    orders: 12,
    status: "active",
    joinDate: "Jan 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    lastPurchase: "2 days ago",
    purchaseHistory: [
      { date: "Oct 13, 2025", product: "Wireless Headphones", amount: 129.99 },
      { date: "Oct 10, 2025", product: "Smart Watch Pro", amount: 299.99 },
      { date: "Oct 5, 2025", product: "USB-C Hub", amount: 79.99 },
    ],
  },
  {
    id: "CUST-002",
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, CA",
    totalSpent: 3245.50,
    orders: 18,
    status: "active",
    joinDate: "Dec 2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    lastPurchase: "1 day ago",
    purchaseHistory: [
      { date: "Oct 14, 2025", product: "Mechanical Keyboard", amount: 159.99 },
      { date: "Oct 8, 2025", product: "Gaming Mouse", amount: 89.99 },
    ],
  },
  {
    id: "CUST-003",
    name: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    totalSpent: 1678.25,
    orders: 8,
    status: "active",
    joinDate: "Feb 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    lastPurchase: "5 days ago",
    purchaseHistory: [
      { date: "Oct 10, 2025", product: "Laptop Stand", amount: 49.99 },
    ],
  },
  {
    id: "CUST-004",
    name: "Sarah Davis",
    email: "sarah.d@email.com",
    phone: "+1 (555) 456-7890",
    location: "Houston, TX",
    totalSpent: 4521.90,
    orders: 24,
    status: "vip",
    joinDate: "Aug 2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastPurchase: "1 hour ago",
    purchaseHistory: [
      { date: "Oct 15, 2025", product: "Smart Watch Pro", amount: 299.99 },
      { date: "Oct 14, 2025", product: "Wireless Headphones", amount: 129.99 },
      { date: "Oct 12, 2025", product: "USB-C Hub", amount: 79.99 },
    ],
  },
  {
    id: "CUST-005",
    name: "James Johnson",
    email: "james.j@email.com",
    phone: "+1 (555) 567-8901",
    location: "Phoenix, AZ",
    totalSpent: 892.40,
    orders: 5,
    status: "inactive",
    joinDate: "May 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    lastPurchase: "45 days ago",
    purchaseHistory: [
      { date: "Sep 1, 2025", product: "Desk Organizer", amount: 34.99 },
    ],
  },
];

export function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "active" || c.status === "vip").length;
  const vipCustomers = customers.filter(c => c.status === "vip").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  const handleCustomerClick = (customer: typeof customers[0]) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Customer Management</h2>
          <p className="text-gray-500">View and manage your customer base</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <h3 className="mt-1 text-gray-900">{totalCustomers}</h3>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Customers</p>
              <h3 className="mt-1 text-gray-900">{activeCustomers}</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">VIP Customers</p>
              <h3 className="mt-1 text-gray-900">{vipCustomers}</h3>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <h3 className="mt-1 text-gray-900">Rs {(totalRevenue * 100).toLocaleString()}</h3>
            </div>
            <DollarSign className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Location</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Total Spent</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Orders</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Last Purchase</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {customer.location}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">Rs {(customer.totalSpent * 100).toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{customer.orders}</td>
                  <td className="py-4 px-4">
                    <Badge className={
                      customer.status === "vip" 
                        ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                        : customer.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    }>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{customer.lastPurchase}</td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>View customer information and purchase history</DialogDescription>
          </DialogHeader>
          
          {selectedCustomer && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">Purchase History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedCustomer.avatar} />
                    <AvatarFallback>{selectedCustomer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-gray-900">{selectedCustomer.name}</h3>
                    <p className="text-sm text-gray-500">{selectedCustomer.id}</p>
                    <Badge className="mt-2">
                      {selectedCustomer.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                    <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </div>
                    <p className="text-sm text-gray-900">{selectedCustomer.phone}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </div>
                    <p className="text-sm text-gray-900">{selectedCustomer.location}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <DollarSign className="w-4 h-4" />
                      Total Spent
                    </div>
                    <p className="text-sm text-gray-900">Rs {(selectedCustomer.totalSpent * 100).toLocaleString()}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <ShoppingCart className="w-4 h-4" />
                      Total Orders
                    </div>
                    <p className="text-sm text-gray-900">{selectedCustomer.orders}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-2">Member Since</div>
                    <p className="text-sm text-gray-900">{selectedCustomer.joinDate}</p>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="mt-4">
                <div className="space-y-3">
                  {selectedCustomer.purchaseHistory.map((purchase, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900">{purchase.product}</p>
                          <p className="text-xs text-gray-500">{purchase.date}</p>
                        </div>
                        <p className="text-sm text-gray-900">Rs {(purchase.amount * 100).toLocaleString()}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-gray-600">Average Order Value</p>
                    <h3 className="mt-1 text-gray-900">
                      Rs {((selectedCustomer.totalSpent / selectedCustomer.orders) * 100).toLocaleString()}
                    </h3>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-gray-600">Last Purchase</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedCustomer.lastPurchase}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-gray-600">Customer Lifetime</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedCustomer.joinDate}</p>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
