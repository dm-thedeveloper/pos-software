import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Play, MessageCircle, Store } from "lucide-react";

interface LandingScreenProps {
  onStartDemo: () => void;
  onRequestPricing: () => void;
}

export function LandingScreen({ onStartDemo, onRequestPricing }: LandingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Hero Section with Background */}
      <div 
        className="relative h-[45vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28, 100, 242, 0.85), rgba(28, 100, 242, 0.85)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%231C64F2" width="1200" height="600"/><g fill-opacity="0.1"><rect fill="%23fff" x="100" y="100" width="200" height="150"/><rect fill="%23fff" x="400" y="150" width="180" height="120"/><rect fill="%23fff" x="700" y="80" width="220" height="180"/><rect fill="%23fff" x="150" y="300" width="160" height="140"/><rect fill="%23fff" x="500" y="320" width="200" height="160"/><rect fill="%23fff" x="850" y="300" width="180" height="140"/></g></svg>')`
        }}
      >
        <div className="text-center px-6 space-y-4">
          <div className="w-20 h-20 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <Store className="w-12 h-12 text-[#1C64F2]" />
          </div>
          <div>
            <h1 className="text-white text-2xl mb-2">POS & Business Management</h1>
            <p className="text-blue-100 text-lg">by Extreem Boost</p>
          </div>
          <p className="text-white/90 text-sm max-w-md mx-auto">
            Empowering Local Businesses with Smart Automation
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-1 px-6 py-8 space-y-4">
        <Card className="p-6 bg-white shadow-lg border-2 border-blue-100">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                ✓
              </div>
              <p className="text-sm">Complete POS System کامل پی او ایس</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                ✓
              </div>
              <p className="text-sm">Inventory Management انوینٹری مینجمنٹ</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                ✓
              </div>
              <p className="text-sm">Customer Reports کسٹمر رپورٹس</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                ✓
              </div>
              <p className="text-sm">Multi-Device Support متعدد آلات</p>
            </div>
          </div>
        </Card>

        <Button 
          className="w-full h-14 text-lg bg-[#1C64F2] hover:bg-[#1557D8] shadow-lg"
          onClick={onStartDemo}
        >
          <Play className="w-5 h-5 mr-2" />
          Start Demo • ڈیمو شروع کریں
        </Button>

        <Button 
          variant="outline"
          className="w-full h-14 text-lg border-2 border-[#1C64F2] text-[#1C64F2] hover:bg-blue-50"
          onClick={onRequestPricing}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Request Pricing • قیمت معلوم کریں
        </Button>

        <div className="text-center pt-4 space-y-2">
          <p className="text-sm text-gray-600">Trusted by 500+ businesses in Karachi</p>
          <p className="text-xs text-gray-500">📍 DHA Phase 5, Karachi</p>
        </div>
      </div>
    </div>
  );
}
