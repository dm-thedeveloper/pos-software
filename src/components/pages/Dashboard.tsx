import { useState } from "react";
import { StatsCards } from "../StatsCards";
import { SalesChart } from "../SalesChart";
import { RecentOrders } from "../RecentOrders";
import { TopProducts } from "../TopProducts";
import { CategoryChart } from "../CategoryChart";
import { DateRangeFilter } from "../DateRangeFilter";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

export function Dashboard() {
  const [dateRange, setDateRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Dashboard Overview</h2>
          <p className="text-gray-500">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangeFilter selectedRange={dateRange} onRangeChange={setDateRange} />
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <CategoryChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>
    </div>
  );
}
