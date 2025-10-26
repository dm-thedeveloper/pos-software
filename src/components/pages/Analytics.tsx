import { Card } from "../ui/card";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const salesData = [
  { month: "Jan", revenue: 12400, orders: 245, customers: 189 },
  { month: "Feb", revenue: 11200, orders: 198, customers: 156 },
  { month: "Mar", revenue: 15800, orders: 312, customers: 234 },
  { month: "Apr", revenue: 14500, orders: 289, customers: 210 },
  { month: "May", revenue: 18200, orders: 367, customers: 298 },
  { month: "Jun", revenue: 17100, orders: 334, customers: 267 },
  { month: "Jul", revenue: 21500, orders: 445, customers: 356 },
  { month: "Aug", revenue: 19800, orders: 398, customers: 312 },
  { month: "Sep", revenue: 23400, orders: 487, customers: 389 },
  { month: "Oct", revenue: 22100, orders: 456, customers: 367 },
];

const categoryData = [
  { name: "Electronics", value: 45000 },
  { name: "Accessories", value: 32000 },
  { name: "Furniture", value: 28000 },
  { name: "Clothing", value: 21000 },
  { name: "Others", value: 14000 },
];

const hourlyData = [
  { hour: "12 AM", sales: 120 },
  { hour: "3 AM", sales: 45 },
  { hour: "6 AM", sales: 230 },
  { hour: "9 AM", sales: 890 },
  { hour: "12 PM", sales: 1450 },
  { hour: "3 PM", sales: 1120 },
  { hour: "6 PM", sales: 1780 },
  { hour: "9 PM", sales: 980 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Sales Analytics</h2>
        <p className="text-gray-500">Detailed insights into your business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <h3 className="mt-1 text-gray-900">Rs 17,600,000</h3>
              <p className="text-sm text-green-600 mt-1">+23.5% from last period</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <h3 className="mt-1 text-gray-900">3,531</h3>
              <p className="text-sm text-green-600 mt-1">+18.2% from last period</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <h3 className="mt-1 text-gray-900">2,778</h3>
              <p className="text-sm text-green-600 mt-1">+15.3% from last period</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <h3 className="mt-1 text-gray-900">Rs 4,985</h3>
              <p className="text-sm text-green-600 mt-1">+8.1% from last period</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-gray-900">Revenue & Orders Trend</h3>
          <p className="text-sm text-gray-500 mt-1">Monthly performance overview</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue (PKR)"
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrders)"
              name="Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-gray-900">Sales by Category</h3>
            <p className="text-sm text-gray-500 mt-1">Revenue breakdown by product category</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-gray-900">Hourly Sales Pattern</h3>
            <p className="text-sm text-gray-500 mt-1">Average sales throughout the day</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-gray-900">Customer Acquisition</h3>
          <p className="text-sm text-gray-500 mt-1">New customers over time</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="customers"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCustomers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
