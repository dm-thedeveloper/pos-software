import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FileText, Download, Calendar, TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react";
import { Badge } from "../ui/badge";

const reports = [
  {
    id: "RPT-001",
    title: "Monthly Sales Report",
    description: "Comprehensive sales analysis for October 2025",
    type: "Sales",
    date: "Oct 15, 2025",
    status: "ready",
  },
  {
    id: "RPT-002",
    title: "Inventory Status Report",
    description: "Current stock levels and low inventory alerts",
    type: "Inventory",
    date: "Oct 15, 2025",
    status: "ready",
  },
  {
    id: "RPT-003",
    title: "Customer Analytics Report",
    description: "Customer behavior and purchase patterns",
    type: "Analytics",
    date: "Oct 14, 2025",
    status: "ready",
  },
  {
    id: "RPT-004",
    title: "Quarterly Financial Report",
    description: "Q3 2025 financial summary and insights",
    type: "Financial",
    date: "Oct 13, 2025",
    status: "processing",
  },
  {
    id: "RPT-005",
    title: "Product Performance Report",
    description: "Top and bottom performing products analysis",
    type: "Products",
    date: "Oct 12, 2025",
    status: "ready",
  },
  {
    id: "RPT-006",
    title: "Daily Transaction Report",
    description: "All transactions for October 15, 2025",
    type: "Transactions",
    date: "Oct 15, 2025",
    status: "ready",
  },
];

const quickReports = [
  {
    title: "Sales Summary",
    description: "Generate quick sales overview",
    icon: DollarSign,
    color: "blue",
  },
  {
    title: "Inventory Report",
    description: "Current stock levels",
    icon: Package,
    color: "green",
  },
  {
    title: "Order Report",
    description: "Recent orders summary",
    icon: ShoppingCart,
    color: "purple",
  },
  {
    title: "Performance Report",
    description: "Business performance metrics",
    icon: TrendingUp,
    color: "orange",
  },
];

export function Reports() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "processing":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "failed":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: "bg-blue-500", text: "text-blue-500" },
      green: { bg: "bg-green-500", text: "text-green-500" },
      purple: { bg: "bg-purple-500", text: "text-purple-500" },
      orange: { bg: "bg-orange-500", text: "text-orange-500" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Reports</h2>
          <p className="text-gray-500">Generate and download business reports</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Create Custom Report
        </Button>
      </div>

      <div>
        <h3 className="text-gray-900 mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickReports.map((report) => {
            const Icon = report.icon;
            const colors = getColorClasses(report.color);
            
            return (
              <Card key={report.title} className="p-5 hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-900 mb-1">{report.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                <Button variant="outline" className="w-full">
                  Generate
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Recent Reports</h3>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm text-gray-900">{report.title}</h4>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">{report.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{report.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                  {report.status === "ready" && (
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
