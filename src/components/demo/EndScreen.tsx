import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { MessageCircle, Repeat, Store } from "lucide-react";

interface EndScreenProps {
  onRestart: () => void;
}

export function EndScreen({ onRestart }: EndScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-4xl">🚀</span>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="space-y-2">
          <h1 className="text-2xl text-gray-900">Thank You!</h1>
          <p className="text-xl text-gray-700">شکریہ</p>
        </div>

        <Card className="p-6 bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-700 mb-2">
            Thank you for watching the demo!
          </p>
          <p className="text-sm text-gray-700">
            Let's grow your business together 🚀
          </p>
          <p className="text-xs text-gray-600 mt-3">
            آئیے مل کر آپ کے کاروبار کو بڑھائیں
          </p>
        </Card>

        {/* Benefits Recap */}
        <Card className="p-5">
          <h3 className="text-sm text-gray-700 mb-3">Why Choose Extreem Boost?</h3>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <p className="text-xs text-gray-600">Easy to use, no tech skills needed</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <p className="text-xs text-gray-600">Affordable pricing for small businesses</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <p className="text-xs text-gray-600">24/7 support in Urdu & English</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <p className="text-xs text-gray-600">Trusted by 500+ businesses in Karachi</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 w-full">
          <Button
            className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
            onClick={() => {
              window.open('https://wa.me/923163264834?text=I%20want%20to%20schedule%20a%20free%20visit%20for%20POS%20demo', '_blank');
            }}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Schedule Free Visit
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 border-2 border-[#1C64F2] text-[#1C64F2]"
            onClick={onRestart}
          >
            <Repeat className="w-5 h-5 mr-2" />
            Watch Demo Again
          </Button>
        </div>

        {/* Contact Info */}
        <Card className="p-4 bg-gray-50">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Store className="w-4 h-4" />
            <span>Extreem Boost • DHA Karachi</span>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            +92 316 3264834 • +92 332 2411080
          </p>
        </Card>

        <p className="text-xs text-gray-400">
          Demo Version 1.0 • Designed for Sales Agents
        </p>
      </div>
    </div>
  );
}
