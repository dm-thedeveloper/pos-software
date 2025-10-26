import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  AlertTriangle,
  Package,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Alert, AlertDescription } from "../ui/alert";

const products = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    stock: 45,
    lowStockThreshold: 20,
    sold: 856,
    trend: "up",
    image: "🎧",
  },
  {
    id: "PRD-002",
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 299.99,
    stock: 8,
    lowStockThreshold: 15,
    sold: 642,
    trend: "up",
    image: "⌚",
  },
  {
    id: "PRD-003",
    name: "Laptop Stand",
    category: "Accessories",
    price: 49.99,
    stock: 122,
    lowStockThreshold: 30,
    sold: 534,
    trend: "up",
    image: "💻",
  },
  {
    id: "PRD-004",
    name: "USB-C Hub",
    category: "Accessories",
    price: 79.99,
    stock: 5,
    lowStockThreshold: 25,
    sold: 421,
    trend: "down",
    image: "🔌",
  },
  {
    id: "PRD-005",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 159.99,
    stock: 67,
    lowStockThreshold: 20,
    sold: 387,
    trend: "up",
    image: "⌨️",
  },
  {
    id: "PRD-006",
    name: "Gaming Mouse",
    category: "Electronics",
    price: 89.99,
    stock: 3,
    lowStockThreshold: 15,
    sold: 298,
    trend: "up",
    image: "🖱️",
  },
  {
    id: "PRD-007",
    name: "Desk Organizer",
    category: "Furniture",
    price: 34.99,
    stock: 89,
    lowStockThreshold: 25,
    sold: 245,
    trend: "down",
    image: "📦",
  },
  {
    id: "PRD-008",
    name: "Monitor Arm",
    category: "Furniture",
    price: 149.99,
    stock: 34,
    lowStockThreshold: 10,
    sold: 189,
    trend: "up",
    image: "🖥️",
  },
];

export function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold);
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Product Inventory</h2>
          <p className="text-gray-500">Manage your products and stock levels</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {lowStockProducts.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <span>
              {lowStockProducts.length} product{lowStockProducts.length > 1 ? 's are' : ' is'} running low on stock:{' '}
            </span>
            <span>
              {lowStockProducts.map(p => p.name).join(', ')}
            </span>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <h3 className="mt-1 text-gray-900">{products.length}</h3>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Stock</p>
              <h3 className="mt-1 text-gray-900">{products.reduce((sum, p) => sum + p.stock, 0)}</h3>
            </div>
            <Package className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <h3 className="mt-1 text-gray-900">{lowStockProducts.length}</h3>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <h3 className="mt-1 text-gray-900">{categories.length - 1}</h3>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All" : category}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Product</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Category</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Price</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Stock</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Sold</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Trend</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const isLowStock = product.stock <= product.lowStockThreshold;
                
                return (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                          {product.image}
                        </div>
                        <span className="text-sm text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{product.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{product.category}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">Rs {(product.price * 100).toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <Badge className={isLowStock ? "bg-red-100 text-red-700 hover:bg-red-100" : "bg-green-100 text-green-700 hover:bg-green-100"}>
                        {product.stock} units
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{product.sold}</td>
                    <td className="py-4 px-4">
                      {product.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
