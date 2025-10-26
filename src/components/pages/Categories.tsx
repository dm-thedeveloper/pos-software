import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Plus, Edit, Trash2, Package, TrendingUp } from "lucide-react";
import { Progress } from "../ui/progress";

const categories = [
  {
    id: "CAT-001",
    name: "Electronics",
    products: 45,
    revenue: 125800,
    color: "#3b82f6",
    trend: "+18%",
    description: "Electronic devices and gadgets",
  },
  {
    id: "CAT-002",
    name: "Accessories",
    products: 67,
    revenue: 89400,
    color: "#10b981",
    trend: "+12%",
    description: "Tech accessories and peripherals",
  },
  {
    id: "CAT-003",
    name: "Furniture",
    products: 32,
    revenue: 67200,
    color: "#f59e0b",
    trend: "+8%",
    description: "Office and home furniture",
  },
  {
    id: "CAT-004",
    name: "Clothing",
    products: 89,
    revenue: 54300,
    color: "#8b5cf6",
    trend: "+15%",
    description: "Apparel and fashion items",
  },
  {
    id: "CAT-005",
    name: "Sports & Outdoors",
    products: 41,
    revenue: 42100,
    color: "#ef4444",
    trend: "+6%",
    description: "Sports equipment and outdoor gear",
  },
  {
    id: "CAT-006",
    name: "Home & Kitchen",
    products: 56,
    revenue: 38900,
    color: "#06b6d4",
    trend: "+10%",
    description: "Home appliances and kitchenware",
  },
];

export function Categories() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProducts = categories.reduce((sum, cat) => sum + cat.products, 0);
  const totalRevenue = categories.reduce((sum, cat) => sum + cat.revenue, 0);
  const maxRevenue = Math.max(...categories.map(cat => cat.revenue));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Product Categories</h2>
          <p className="text-gray-500">Manage your product categories</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Categories</p>
              <h3 className="mt-1 text-gray-900">{categories.length}</h3>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <h3 className="mt-1 text-gray-900">{totalProducts}</h3>
            </div>
            <Package className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <h3 className="mt-1 text-gray-900">Rs {((totalRevenue * 100) / 1000).toFixed(0)}k</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: category.color + "20" }}
                >
                  <Package className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <h3 className="text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{category.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Products</span>
                  <Badge variant="outline">{category.products}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="text-sm text-gray-900">Rs {((category.revenue * 100) / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Growth</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-sm text-green-600">{category.trend}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Progress value={(category.revenue / maxRevenue) * 100} className="h-2" />
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
