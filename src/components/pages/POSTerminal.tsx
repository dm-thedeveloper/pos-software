import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  DollarSign,
  User,
  ShoppingCart,
  Printer,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner@2.0.3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

const products: Product[] = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    price: 12999,
    stock: 45,
    category: "Electronics",
    image: "🎧",
  },
  {
    id: "PRD-002",
    name: "Smart Watch Pro",
    price: 29999,
    stock: 8,
    category: "Electronics",
    image: "⌚",
  },
  {
    id: "PRD-003",
    name: "Laptop Stand",
    price: 4999,
    stock: 122,
    category: "Accessories",
    image: "💻",
  },
  {
    id: "PRD-004",
    name: "USB-C Hub",
    price: 7999,
    stock: 5,
    category: "Accessories",
    image: "🔌",
  },
  {
    id: "PRD-005",
    name: "Mechanical Keyboard",
    price: 15999,
    stock: 67,
    category: "Electronics",
    image: "⌨️",
  },
  {
    id: "PRD-006",
    name: "Gaming Mouse",
    price: 8999,
    stock: 3,
    category: "Electronics",
    image: "🖱️",
  },
  {
    id: "PRD-007",
    name: "Desk Organizer",
    price: 3499,
    stock: 89,
    category: "Furniture",
    image: "📦",
  },
  {
    id: "PRD-008",
    name: "Monitor Arm",
    price: 14999,
    stock: 34,
    category: "Furniture",
    image: "🖥️",
  },
];

export function POSTerminal() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerName, setCustomerName] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<any>(null);

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        toast.success(`Added ${product.name} to cart`);
      } else {
        toast.error("Insufficient stock");
      }
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]);
      toast.success(`Added ${product.name} to cart`);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    const item = cart.find((i) => i.id === id);
    const product = products.find((p) => p.id === id);

    if (!item || !product) return;

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
      removeFromCart(id);
    } else if (newQuantity <= product.stock) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem
        )
      );
    } else {
      toast.error("Insufficient stock");
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.085; // 8.5% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setShowPaymentDialog(true);
  };

  const processPayment = () => {
    if (!customerName.trim()) {
      toast.error("Please enter customer name");
      return;
    }

    if (paymentMethod === "cash") {
      const received = parseFloat(amountReceived);
      if (!received || received < total) {
        toast.error("Insufficient payment amount");
        return;
      }
    }

    // Create transaction
    const transaction = {
      orderId: `ORD-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      customer: customerName,
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod,
      amountReceived:
        paymentMethod === "cash" ? parseFloat(amountReceived) : total,
      change: paymentMethod === "cash" ? parseFloat(amountReceived) - total : 0,
      date: new Date().toLocaleString(),
    };

    setLastTransaction(transaction);
    setShowPaymentDialog(false);
    setShowReceiptDialog(true);
    setCart([]);
    setCustomerName("");
    setAmountReceived("");

    toast.success("Payment processed successfully!");
  };

  const printReceipt = () => {
    window.print();
    toast.success("Printing receipt...");
  };

  const change =
    paymentMethod === "cash" && amountReceived
      ? Math.max(0, parseFloat(amountReceived) - total)
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">POS Terminal</h2>
          <p className="text-gray-500">Process sales and manage transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            <User className="w-4 h-4 mr-1" />
            Cashier: Admin
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => addToCart(product)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{product.image}</div>
                    <p className="text-sm text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-900">
                      Rs {product.price.toLocaleString()}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs mt-2 ${
                        product.stock < 10 ? "border-red-300 text-red-700" : ""
                      }`}
                    >
                      Stock: {product.stock}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <h3 className="text-gray-900">Current Sale</h3>
              </div>
              {cart.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Cart is empty</p>
                <p className="text-xs mt-1">Add products to start a sale</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl">{item.image}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Rs {item.price.toLocaleString()}
                      </p>
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
                      <span className="text-sm w-8 text-center">
                        {item.quantity}
                      </span>
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
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">
                  Rs {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8.5%):</span>
                <span className="text-gray-900">
                  Rs {Math.round(tax).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">
                  Rs {Math.round(total).toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              className="w-full mt-4"
              size="lg"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Checkout
            </Button>
          </Card>

          <Card className="p-4">
            <h4 className="text-sm text-gray-700 mb-3">Quick Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items in cart:</span>
                <span className="text-gray-900">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average item price:</span>
                <span className="text-gray-900">
                  Rs{" "}
                  {cart.length > 0
                    ? Math.round(
                        subtotal /
                          cart.reduce((sum, item) => sum + item.quantity, 0)
                      ).toLocaleString()
                    : "0"}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
            <DialogDescription>Complete the transaction</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-gray-900">PKR {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="cash">Cash</TabsTrigger>
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {paymentMethod === "cash" && (
              <div className="space-y-2">
                <Label>Amount Received</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  step="0.01"
                />
                {amountReceived && parseFloat(amountReceived) >= total && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Change:</span>
                      <span className="text-green-900">
                        Rs {Math.round(change).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPaymentDialog(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={processPayment}>
                <DollarSign className="w-4 h-4 mr-2" />
                Complete Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Complete</DialogTitle>
            <DialogDescription>
              Receipt generated successfully
            </DialogDescription>
          </DialogHeader>

          {lastTransaction && (
            <div className="space-y-4 mt-4">
              <Card className="p-4 bg-white" id="receipt">
                <div className="text-center border-b pb-3 mb-3">
                  <h3 className="text-gray-900">POS System Store</h3>
                  <p className="text-xs text-gray-500">
                    123 Main Street, New York, NY
                  </p>
                  <p className="text-xs text-gray-500">
                    Phone: +1 (555) 123-4567
                  </p>
                </div>

                <div className="space-y-2 text-sm border-b pb-3 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order:</span>
                    <span className="text-gray-900">
                      {lastTransaction.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="text-gray-900">
                      {lastTransaction.customer}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">
                      {lastTransaction.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment:</span>
                    <span className="text-gray-900 capitalize">
                      {lastTransaction.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 border-b pb-3 mb-3">
                  {lastTransaction.items.map((item: CartItem) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-900">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-900">
                        Rs {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">
                      Rs {Math.round(lastTransaction.subtotal).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="text-gray-900">
                      Rs {Math.round(lastTransaction.tax).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">
                      Rs {Math.round(lastTransaction.total).toLocaleString()}
                    </span>
                  </div>
                  {lastTransaction.paymentMethod === "cash" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paid:</span>
                        <span className="text-gray-900">
                          Rs{" "}
                          {Math.round(
                            lastTransaction.amountReceived
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Change:</span>
                        <span className="text-gray-900">
                          Rs{" "}
                          {Math.round(lastTransaction.change).toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-center text-xs text-gray-500 mt-4 pt-3 border-t">
                  <p>Thank you for your purchase!</p>
                </div>
              </Card>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowReceiptDialog(false)}
                >
                  Close
                </Button>
                <Button className="flex-1" onClick={printReceipt}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
