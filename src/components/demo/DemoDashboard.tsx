import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp,
  FileText,
  Calendar,
  ArrowRight
} from "lucide-react";

interface DemoDashboardProps {
  onNavigate: (page: string) => void;
}

export function DemoDashboard({ onNavigate }: DemoDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#1C64F2] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl mb-1">Dashboard</h1>
            <p className="text-blue-100 text-sm">ڈیش بورڈ</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Today • آج</p>
            <p className="text-xs text-blue-200">{new Date().toLocaleDateString('en-PK')}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-blue-100">Sales • فروخت</p>
            </div>
            <p className="text-2xl">Rs 45,000</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-blue-100">Customers</p>
            </div>
            <p className="text-2xl">120</p>
          </Card>
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-6 -mt-6 space-y-4">
        {/* POS Terminal Card */}
        <Card 
          className="p-5 bg-gradient-to-r from-[#1C64F2] to-[#1557D8] text-white cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => onNavigate('pos')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg mb-1">New Sale</h3>
                <p className="text-sm text-blue-100">نئی فروخت</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6" />
          </div>
        </Card>

        {/* Other Menu Items */}
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate('products')}
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-3">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-sm text-gray-900 mb-1">Inventory</h4>
            <p className="text-xs text-gray-500">انوینٹری</p>
          </Card>

          <Card 
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate('customers')}
          >
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-sm text-gray-900 mb-1">Customers</h4>
            <p className="text-xs text-gray-500">کسٹمرز</p>
          </Card>

          <Card 
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate('reports')}
          >
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-3">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="text-sm text-gray-900 mb-1">Reports</h4>
            <p className="text-xs text-gray-500">رپورٹس</p>
          </Card>

          <Card 
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate('accounting')}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-sm text-gray-900 mb-1">Accounting</h4>
            <p className="text-xs text-gray-500">اکاؤنٹنگ</p>
          </Card>
        </div>

        {/* Today's Summary */}
        <Card className="p-5">
          <h3 className="text-sm text-gray-700 mb-4">Today's Summary • آج کا خلاصہ</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Sales</span>
              <span className="text-sm text-gray-900">Rs 45,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Orders</span>
              <span className="text-sm text-gray-900">28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Customers</span>
              <span className="text-sm text-gray-900">5</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="text-sm text-gray-900">Average Order</span>
              <span className="text-sm text-[#1C64F2]">Rs 1,607</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
