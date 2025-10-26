import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Search, Download, CreditCard, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const transactions = [
  {
    id: "TXN-001",
    orderId: "ORD-001",
    customer: "John Smith",
    amount: 129.99,
    type: "sale",
    method: "Credit Card",
    status: "completed",
    date: "Oct 15, 2025 14:30",
    reference: "CH_1A2B3C4D",
  },
  {
    id: "TXN-002",
    orderId: "ORD-002",
    customer: "Emma Wilson",
    amount: 379.98,
    type: "sale",
    method: "PayPal",
    status: "pending",
    date: "Oct 15, 2025 13:15",
    reference: "PP_5E6F7G8H",
  },
  {
    id: "TXN-003",
    orderId: "ORD-006",
    customer: "Lisa Anderson",
    amount: 149.99,
    type: "refund",
    method: "Credit Card",
    status: "completed",
    date: "Oct 15, 2025 12:00",
    reference: "RF_9I0J1K2L",
  },
  {
    id: "TXN-004",
    orderId: "ORD-003",
    customer: "Michael Brown",
    amount: 49.99,
    type: "sale",
    method: "Debit Card",
    status: "completed",
    date: "Oct 15, 2025 11:45",
    reference: "CH_3M4N5O6P",
  },
  {
    id: "TXN-005",
    orderId: "ORD-004",
    customer: "Sarah Davis",
    amount: 249.98,
    type: "sale",
    method: "Credit Card",
    status: "processing",
    date: "Oct 15, 2025 10:20",
    reference: "CH_7Q8R9S0T",
  },
  {
    id: "TXN-006",
    orderId: "ORD-005",
    customer: "James Johnson",
    amount: 34.99,
    type: "sale",
    method: "Cash",
    status: "completed",
    date: "Oct 15, 2025 09:00",
    reference: "CASH_001",
  },
  {
    id: "TXN-007",
    orderId: "ORD-007",
    customer: "David Martinez",
    amount: 179.98,
    type: "sale",
    method: "PayPal",
    status: "completed",
    date: "Oct 14, 2025 16:45",
    reference: "PP_1U2V3W4X",
  },
  {
    id: "TXN-008",
    orderId: "ORD-008",
    customer: "Jennifer Taylor",
    amount: 299.99,
    type: "sale",
    method: "Credit Card",
    status: "pending",
    date: "Oct 14, 2025 15:20",
    reference: "CH_5Y6Z7A8B",
  },
];

export function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter(txn =>
    txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSales = transactions.filter(t => t.type === "sale" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalRefunds = transactions.filter(t => t.type === "refund")
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions.filter(t => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      case "processing":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "failed":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "sale"
      ? "bg-green-100 text-green-700 hover:bg-green-100"
      : "bg-red-100 text-red-700 hover:bg-red-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Transactions</h2>
          <p className="text-gray-500">View all payment transactions</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Transactions
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <h3 className="mt-1 text-gray-900">Rs {(totalSales * 100).toLocaleString()}</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Refunds</p>
              <h3 className="mt-1 text-gray-900">Rs {(totalRefunds * 100).toLocaleString()}</h3>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <h3 className="mt-1 text-gray-900">Rs {(pendingAmount * 100).toLocaleString()}</h3>
            </div>
            <CreditCard className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Revenue</p>
              <h3 className="mt-1 text-gray-900">Rs {((totalSales - totalRefunds) * 100).toLocaleString()}</h3>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search transactions by ID, order, customer or reference..."
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
                <th className="text-left py-3 px-4 text-sm text-gray-600">Transaction ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Method</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Reference</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-900">{txn.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{txn.orderId}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{txn.customer}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    <span className={txn.type === "refund" ? "text-red-600" : ""}>
                      {txn.type === "refund" ? "-" : ""}Rs {(txn.amount * 100).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getTypeColor(txn.type)}>
                      {txn.type}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{txn.method}</td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(txn.status)}>
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 font-mono text-xs">{txn.reference}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
