import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Search, 
  Download, 
  Printer, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign
} from "lucide-react";
import { DateRangeFilter } from "../DateRangeFilter";
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

// Mock data for Account Ledger
const ledgerEntries = [
  {
    date: "Oct 15, 2025",
    voucherNo: "VOU-001",
    account: "Sales Revenue",
    type: "Credit",
    debit: 0,
    credit: 2459.87,
    balance: 145678.50,
    description: "Product sales - John Smith",
  },
  {
    date: "Oct 15, 2025",
    voucherNo: "VOU-002",
    account: "Cost of Goods Sold",
    type: "Debit",
    debit: 1230.45,
    credit: 0,
    balance: 87650.30,
    description: "Inventory purchase",
  },
  {
    date: "Oct 15, 2025",
    voucherNo: "VOU-003",
    account: "Rent Expense",
    type: "Debit",
    debit: 3500.00,
    credit: 0,
    balance: 14000.00,
    description: "Monthly store rent - October",
  },
  {
    date: "Oct 14, 2025",
    voucherNo: "VOU-004",
    account: "Sales Revenue",
    type: "Credit",
    debit: 0,
    credit: 3245.50,
    balance: 143218.63,
    description: "Product sales - Emma Wilson",
  },
  {
    date: "Oct 14, 2025",
    voucherNo: "VOU-005",
    account: "Utilities Expense",
    type: "Debit",
    debit: 850.00,
    credit: 0,
    balance: 4250.00,
    description: "Electricity and water bill",
  },
  {
    date: "Oct 14, 2025",
    voucherNo: "VOU-006",
    account: "Accounts Receivable",
    type: "Debit",
    debit: 1500.00,
    credit: 0,
    balance: 12500.00,
    description: "Customer credit sale",
  },
  {
    date: "Oct 13, 2025",
    voucherNo: "VOU-007",
    account: "Salary Expense",
    type: "Debit",
    debit: 5000.00,
    credit: 0,
    balance: 50000.00,
    description: "Staff salaries - October",
  },
  {
    date: "Oct 13, 2025",
    voucherNo: "VOU-008",
    account: "Cash",
    type: "Debit",
    debit: 4521.90,
    credit: 0,
    balance: 35678.90,
    description: "Cash sales - Sarah Davis",
  },
];

// Profit & Loss data
const profitLossData = {
  revenue: {
    salesRevenue: 176000,
    serviceRevenue: 12500,
    otherIncome: 3200,
  },
  expenses: {
    costOfGoodsSold: 87650,
    salaries: 50000,
    rent: 14000,
    utilities: 4250,
    marketing: 8500,
    insurance: 2400,
    depreciation: 1800,
    otherExpenses: 3100,
  },
};

// Balance Sheet data
const balanceSheetData = {
  assets: {
    currentAssets: {
      cash: 35678.90,
      accountsReceivable: 12500.00,
      inventory: 45890.50,
      prepaidExpenses: 2400.00,
    },
    fixedAssets: {
      equipment: 45000.00,
      furniture: 18000.00,
      accumulatedDepreciation: -5400.00,
    },
  },
  liabilities: {
    currentLiabilities: {
      accountsPayable: 15600.00,
      salesTaxPayable: 3200.00,
      accruedExpenses: 4500.00,
    },
    longTermLiabilities: {
      longTermDebt: 25000.00,
    },
  },
  equity: {
    ownersEquity: 80000.00,
    retainedEarnings: 25768.40,
  },
};

export function Accounting() {
  const [dateRange, setDateRange] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [showVoucherDialog, setShowVoucherDialog] = useState(false);
  const [voucherType, setVoucherType] = useState("invoice");

  const filteredLedger = ledgerEntries.filter(entry =>
    entry.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.voucherNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = Object.values(profitLossData.revenue).reduce((a, b) => a + b, 0);
  const totalExpenses = Object.values(profitLossData.expenses).reduce((a, b) => a + b, 0);
  const netProfit = totalRevenue - totalExpenses;

  const totalCurrentAssets = Object.values(balanceSheetData.assets.currentAssets).reduce((a, b) => a + b, 0);
  const totalFixedAssets = Object.values(balanceSheetData.assets.fixedAssets).reduce((a, b) => a + b, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;

  const totalCurrentLiabilities = Object.values(balanceSheetData.liabilities.currentLiabilities).reduce((a, b) => a + b, 0);
  const totalLongTermLiabilities = Object.values(balanceSheetData.liabilities.longTermLiabilities).reduce((a, b) => a + b, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = Object.values(balanceSheetData.equity).reduce((a, b) => a + b, 0);

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Accounting</h2>
          <p className="text-gray-500">Financial records and statements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowVoucherDialog(true)}>
            <Printer className="w-4 h-4 mr-2" />
            Print Voucher
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ledger" className="space-y-6">
        <TabsList>
          <TabsTrigger value="ledger">
            <FileText className="w-4 h-4 mr-2" />
            Account Ledger
          </TabsTrigger>
          <TabsTrigger value="profit-loss">
            <TrendingUp className="w-4 h-4 mr-2" />
            Profit & Loss
          </TabsTrigger>
          <TabsTrigger value="balance-sheet">
            <DollarSign className="w-4 h-4 mr-2" />
            Balance Sheet
          </TabsTrigger>
        </TabsList>

        {/* Account Ledger */}
        <TabsContent value="ledger">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">General Ledger</h3>
              <DateRangeFilter selectedRange={dateRange} onRangeChange={setDateRange} />
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search ledger entries..."
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
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Voucher No</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Account</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Description</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Debit</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Credit</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLedger.map((entry, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm text-gray-900">{entry.date}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{entry.voucherNo}</td>
                      <td className="py-4 px-4 text-sm text-gray-900">{entry.account}</td>
                      <td className="py-4 px-4 text-sm text-gray-500">{entry.description}</td>
                      <td className="py-4 px-4 text-sm text-right text-gray-900">
                        {entry.debit > 0 ? `Rs ${(entry.debit * 100).toLocaleString()}` : '-'}
                      </td>
                      <td className="py-4 px-4 text-sm text-right text-gray-900">
                        {entry.credit > 0 ? `Rs ${(entry.credit * 100).toLocaleString()}` : '-'}
                      </td>
                      <td className="py-4 px-4 text-sm text-right text-gray-900">
                        Rs {(entry.balance * 100).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300">
                    <td colSpan={4} className="py-4 px-4 text-sm text-gray-900">
                      <strong>Total</strong>
                    </td>
                    <td className="py-4 px-4 text-sm text-right text-gray-900">
                      <strong>
                        Rs {(filteredLedger.reduce((sum, e) => sum + e.debit, 0) * 100).toLocaleString()}
                      </strong>
                    </td>
                    <td className="py-4 px-4 text-sm text-right text-gray-900">
                      <strong>
                        Rs {(filteredLedger.reduce((sum, e) => sum + e.credit, 0) * 100).toLocaleString()}
                      </strong>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Profit & Loss Statement */}
        <TabsContent value="profit-loss">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900">Profit & Loss Statement</h3>
                <p className="text-sm text-gray-500 mt-1">For the period ending October 15, 2025</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>

            <div className="space-y-6">
              {/* Revenue Section */}
              <div>
                <div className="bg-blue-50 px-4 py-2 rounded-lg mb-2">
                  <h4 className="text-sm text-blue-900">Revenue</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Sales Revenue</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.revenue.salesRevenue * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Service Revenue</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.revenue.serviceRevenue * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Other Income</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.revenue.otherIncome * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 bg-blue-50 rounded-lg border-t-2 border-blue-200">
                    <span className="text-sm text-blue-900">Total Revenue</span>
                    <span className="text-sm text-blue-900">
                      Rs {(totalRevenue * 100).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expenses Section */}
              <div>
                <div className="bg-orange-50 px-4 py-2 rounded-lg mb-2">
                  <h4 className="text-sm text-orange-900">Expenses</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Cost of Goods Sold</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.expenses.costOfGoodsSold * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Salaries & Wages</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.expenses.salaries * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Rent</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.expenses.rent * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Utilities</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.expenses.utilities * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Marketing</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.expenses.marketing * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Insurance</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.expenses.insurance * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Depreciation</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.expenses.depreciation * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Other Expenses</span>
                    <span className="text-sm text-gray-900">
                      Rs {(profitLossData.expenses.otherExpenses * 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 bg-orange-50 rounded-lg border-t-2 border-orange-200">
                    <span className="text-sm text-orange-900">Total Expenses</span>
                    <span className="text-sm text-orange-900">
                      Rs {(totalExpenses * 100).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Net Profit/Loss */}
              <div className={`p-4 rounded-lg ${netProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-gray-900 ${netProfit >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                      Net {netProfit >= 0 ? 'Profit' : 'Loss'}
                    </h4>
                    {netProfit >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <span className={`${netProfit >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                    Rs {(Math.abs(netProfit) * 100).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Profit Margin: {((netProfit / totalRevenue) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Balance Sheet */}
        <TabsContent value="balance-sheet">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900">Balance Sheet</h3>
                <p className="text-sm text-gray-500 mt-1">As of October 15, 2025</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Assets */}
              <div className="space-y-4">
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <h4 className="text-sm text-blue-900">Assets</h4>
                </div>

                {/* Current Assets */}
                <div>
                  <p className="text-sm text-gray-700 px-4 py-1">Current Assets</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Cash</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.assets.currentAssets.cash * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Accounts Receivable</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.assets.currentAssets.accountsReceivable * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Inventory</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.assets.currentAssets.inventory * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Prepaid Expenses</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.assets.currentAssets.prepaidExpenses * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 bg-blue-50 rounded">
                      <span className="text-sm text-gray-700">Total Current Assets</span>
                      <span className="text-sm text-gray-900">
                        Rs {(totalCurrentAssets * 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fixed Assets */}
                <div>
                  <p className="text-sm text-gray-700 px-4 py-1">Fixed Assets</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Equipment</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.assets.fixedAssets.equipment * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Furniture</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.assets.fixedAssets.furniture * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Less: Accumulated Depreciation</span>
                      <span className="text-sm text-red-600">
                        Rs {(Math.abs(balanceSheetData.assets.fixedAssets.accumulatedDepreciation) * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 bg-blue-50 rounded">
                      <span className="text-sm text-gray-700">Total Fixed Assets</span>
                      <span className="text-sm text-gray-900">
                        Rs {(totalFixedAssets * 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center px-4 py-3 bg-blue-500 text-white rounded-lg">
                  <span className="text-sm">Total Assets</span>
                  <span className="text-sm">
                    Rs {(totalAssets * 100).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Liabilities & Equity */}
              <div className="space-y-4">
                <div className="bg-orange-50 px-4 py-2 rounded-lg">
                  <h4 className="text-sm text-orange-900">Liabilities & Equity</h4>
                </div>

                {/* Current Liabilities */}
                <div>
                  <p className="text-sm text-gray-700 px-4 py-1">Current Liabilities</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Accounts Payable</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.liabilities.currentLiabilities.accountsPayable * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Sales Tax Payable</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.liabilities.currentLiabilities.salesTaxPayable * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Accrued Expenses</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.liabilities.currentLiabilities.accruedExpenses * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 bg-orange-50 rounded">
                      <span className="text-sm text-gray-700">Total Current Liabilities</span>
                      <span className="text-sm text-gray-900">
                        Rs {(totalCurrentLiabilities * 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Long-term Liabilities */}
                <div>
                  <p className="text-sm text-gray-700 px-4 py-1">Long-term Liabilities</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Long-term Debt</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.liabilities.longTermLiabilities.longTermDebt * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 bg-orange-50 rounded">
                      <span className="text-sm text-gray-700">Total Long-term Liabilities</span>
                      <span className="text-sm text-gray-900">
                        Rs {(totalLongTermLiabilities * 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center px-4 py-2 bg-orange-100 rounded">
                  <span className="text-sm text-gray-900">Total Liabilities</span>
                  <span className="text-sm text-gray-900">
                    Rs {(totalLiabilities * 100).toLocaleString()}
                  </span>
                </div>

                {/* Equity */}
                <div>
                  <p className="text-sm text-gray-700 px-4 py-1">Owner's Equity</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Owner's Capital</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.equity.ownersEquity * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-6 py-2">
                      <span className="text-sm text-gray-600">Retained Earnings</span>
                      <span className="text-sm text-gray-900">
                        Rs {(balanceSheetData.equity.retainedEarnings * 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 bg-green-50 rounded">
                      <span className="text-sm text-gray-700">Total Equity</span>
                      <span className="text-sm text-gray-900">
                        Rs {(totalEquity * 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center px-4 py-3 bg-orange-500 text-white rounded-lg">
                  <span className="text-sm">Total Liabilities & Equity</span>
                  <span className="text-sm">
                    Rs {((totalLiabilities + totalEquity) * 100).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Balance Check */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Balance Check:</span>
                <Badge className={totalAssets === (totalLiabilities + totalEquity) ? 
                  "bg-green-100 text-green-700 hover:bg-green-100" : 
                  "bg-red-100 text-red-700 hover:bg-red-100"
                }>
                  {totalAssets === (totalLiabilities + totalEquity) ? "Balanced ✓" : "Not Balanced ✗"}
                </Badge>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Voucher/Receipt/Invoice Printer Dialog */}
      <Dialog open={showVoucherDialog} onOpenChange={setShowVoucherDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Print Voucher/Receipt/Invoice</DialogTitle>
            <DialogDescription>Select type and generate printable document</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select value={voucherType} onValueChange={setVoucherType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice">Sales Invoice</SelectItem>
                  <SelectItem value="receipt">Payment Receipt</SelectItem>
                  <SelectItem value="voucher">Payment Voucher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preview */}
            <Card className="p-6 bg-white" id="printable-voucher">
              <div className="space-y-4">
                {/* Header */}
                <div className="text-center border-b pb-4">
                  <h2 className="text-gray-900">POS System Store</h2>
                  <p className="text-sm text-gray-500">123 Main Street, New York, NY 10001</p>
                  <p className="text-sm text-gray-500">Phone: +1 (555) 123-4567</p>
                </div>

                {/* Document Info */}
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      {voucherType === 'invoice' ? 'Invoice' : 
                       voucherType === 'receipt' ? 'Receipt' : 'Voucher'} Number
                    </p>
                    <p className="text-sm text-gray-900">
                      {voucherType === 'invoice' ? 'INV-001' : 
                       voucherType === 'receipt' ? 'REC-001' : 'VOU-001'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-sm text-gray-900">October 15, 2025</p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-600">Bill To:</p>
                  <p className="text-sm text-gray-900">John Smith</p>
                  <p className="text-sm text-gray-500">john.smith@email.com</p>
                  <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                </div>

                {/* Items */}
                <div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-sm text-gray-600">Item</th>
                        <th className="text-right py-2 text-sm text-gray-600">Qty</th>
                        <th className="text-right py-2 text-sm text-gray-600">Price</th>
                        <th className="text-right py-2 text-sm text-gray-600">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-sm text-gray-900">Wireless Headphones</td>
                        <td className="text-right py-2 text-sm text-gray-900">1</td>
                        <td className="text-right py-2 text-sm text-gray-900">Rs 12,999</td>
                        <td className="text-right py-2 text-sm text-gray-900">Rs 12,999</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t">
                        <td colSpan={3} className="py-2 text-sm text-gray-600 text-right">Subtotal:</td>
                        <td className="text-right py-2 text-sm text-gray-900">Rs 12,999</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="py-2 text-sm text-gray-600 text-right">Tax (8.5%):</td>
                        <td className="text-right py-2 text-sm text-gray-900">Rs 1,105</td>
                      </tr>
                      <tr className="border-t-2">
                        <td colSpan={3} className="py-2 text-sm text-gray-900 text-right">Total:</td>
                        <td className="text-right py-2 text-sm text-gray-900">Rs 14,104</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 border-t pt-4">
                  <p>Thank you for your business!</p>
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowVoucherDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handlePrintVoucher}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
