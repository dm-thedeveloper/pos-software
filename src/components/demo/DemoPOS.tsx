import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  Search, 
  Plus, 
  Minus, 
  Printer,
  ArrowLeft,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner@2.0.3";

interface DemoPOSProps {
  onBack: () => void;
}

interface CartItem {
  id: string;
  name: string;
  nameUrdu: string;
  price: number;
  quantity: number;
}

const demoProducts = [
  { id: "1", name: "Rice (1kg)", nameUrdu: "چاول", price: 180, image: "🌾" },
  { id: "2", name: "Flour (1kg)", nameUrdu: "آٹا", price: 85, image: "🌾" },
  { id: "3", name: "Sugar (1kg)", nameUrdu: "چینی", price: 120, image: "🧂" },
  { id: "4", name: "Cooking Oil", nameUrdu: "کھانے کا تیل", price: 450, image: "🫙" },
  { id: "5", name: "Tea (250g)", nameUrdu: "چائے", price: 250, image: "☕" },
  { id: "6", name: "Milk (1L)", nameUrdu: "دودھ", price: 180, image: "🥛" },
  { id: "7", name: "Eggs (12)", nameUrdu: "انڈے", price: 320, image: "🥚" },
  { id: "8", name: "Bread", nameUrdu: "ڈبل روٹی", price: 80, image: "🍞" },
];

export function DemoPOS({ onBack }: DemoPOSProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const filteredProducts = demoProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nameUrdu.includes(searchQuery)
  );

  const addToCart = (product: typeof demoProducts[0]) => {
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        nameUrdu: product.nameUrdu,
        price: product.price,
        quantity: 1,
      }]);
    }
    toast.success("Added to cart");
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  const handlePrintBill = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    if (!customerName.trim()) {
      toast.error("Enter customer name");
      return;
    }
    setShowReceipt(true);
  };

  const handleCompleteSale = () => {
    toast.success("Sale completed!");
    setShowReceipt(false);
    setCart([]);
    setCustomerName("");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#1C64F2] text-white p-4 flex items-center gap-3 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg">New Sale • نئی فروخت</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products... پروڈکٹس تلاش کریں"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-12"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="p-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => addToCart(product)}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{product.image}</div>
                <p className="text-sm text-gray-900 mb-1">{product.name}</p>
                <p className="text-xs text-gray-500 mb-2">{product.nameUrdu}</p>
                <Badge className="bg-[#1C64F2]">Rs {product.price}</Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Cart */}
        {cart.length > 0 && (
          <Card className="p-4 border-2 border-[#1C64F2]">
            <h3 className="text-sm text-gray-700 mb-3">Cart • کارٹ ({cart.length} items)</h3>
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Rs {item.price}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2">
              <Input
                placeholder="Customer Name • گاہک کا نام"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="h-10"
              />
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Total:</span>
                <span className="text-lg text-[#1C64F2]">Rs {total}</span>
              </div>
              <Button
                className="w-full bg-[#1C64F2] hover:bg-[#1557D8]"
                onClick={handlePrintBill}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Bill • بل پرنٹ کریں
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Bill Preview • بل کی جھلک</DialogTitle>
          </DialogHeader>

          <Card className="p-4 bg-white">
            <div className="text-center border-b pb-3 mb-3">
              <h3 className="text-lg text-gray-900">Extreem Boost POS</h3>
              <p className="text-xs text-gray-500">DHA Phase 5, Karachi</p>
              <p className="text-xs text-gray-500">Tel: 0300-1234567</p>
            </div>

            <div className="space-y-1 text-sm border-b pb-3 mb-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="text-gray-900">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-900">{new Date().toLocaleDateString('en-PK')}</span>
              </div>
            </div>

            <div className="space-y-2 border-b pb-3 mb-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-900">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-gray-900">
                    Rs {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-sm mb-4">
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-lg text-[#1C64F2]">Rs {total}</span>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500">
              <p>Thank you for your business!</p>
              <p>شکریہ</p>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowReceipt(false)}>
              Back
            </Button>
            <Button className="flex-1 bg-[#1C64F2]" onClick={handleCompleteSale}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
