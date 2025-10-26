import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";

interface PricingPageProps {
  onBack: () => void;
}

const pricingPlans = [
  {
    name: "Basic",
    nameUrdu: "بیسک",
    price: 3000,
    popular: false,
    features: [
      { text: "POS System", urdu: "پی او ایس" },
      { text: "Basic Reports", urdu: "بنیادی رپورٹس" },
      { text: "Up to 500 Products", urdu: "500 پروڈکٹس" },
      { text: "1 User", urdu: "1 صارف" },
      { text: "Email Support", urdu: "ای میل سپورٹ" }
    ],
    color: "border-gray-200"
  },
  {
    name: "Standard",
    nameUrdu: "معیاری",
    price: 5000,
    popular: true,
    features: [
      { text: "Everything in Basic", urdu: "بیسک کی تمام" },
      { text: "CRM Module", urdu: "سی آر ایم" },
      { text: "Unlimited Products", urdu: "لامحدود پروڈکٹس" },
      { text: "Up to 3 Users", urdu: "3 صارفین" },
      { text: "WhatsApp Support", urdu: "واٹس ایپ سپورٹ" },
      { text: "Cloud Backup", urdu: "کلاؤڈ بیک اپ" }
    ],
    color: "border-[#1C64F2] border-2"
  },
  {
    name: "Premium",
    nameUrdu: "پریمیم",
    price: 9000,
    popular: false,
    features: [
      { text: "Everything in Standard", urdu: "معیاری کی تمام" },
      { text: "Multi-Location", urdu: "متعدد مقامات" },
      { text: "Unlimited Users", urdu: "لامحدود صارفین" },
      { text: "Advanced Analytics", urdu: "جدید تجزیات" },
      { text: "24/7 Priority Support", urdu: "24/7 سپورٹ" },
      { text: "Custom Features", urdu: "اپنی مرضی" },
      { text: "Free Training", urdu: "مفت تربیت" }
    ],
    color: "border-purple-200"
  }
];

export function PricingPage({ onBack }: PricingPageProps) {
  const handleBookDemo = (planName: string) => {
    const message = `I want to book a free demo for the ${planName} plan`;
    window.open(`https://wa.me/923001234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#1C64F2] text-white p-4 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg">Pricing Plans</h1>
            <p className="text-xs text-blue-100">قیمتوں کے منصوبے</p>
          </div>
        </div>
        <p className="text-sm text-blue-100 text-center">
          Simple, transparent pricing for businesses in Karachi
        </p>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-5 relative ${plan.color} ${plan.popular ? 'bg-blue-50' : ''}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-2 right-4 bg-[#1C64F2]">
                Most Popular
              </Badge>
            )}

            <div className="mb-4">
              <h3 className="text-xl text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{plan.nameUrdu}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl text-[#1C64F2]">Rs {plan.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">/month</span>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{feature.text}</p>
                    <p className="text-xs text-gray-500">{feature.urdu}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className={`w-full ${plan.popular ? 'bg-[#1C64F2] hover:bg-[#1557D8]' : 'bg-gray-900 hover:bg-gray-800'}`}
              onClick={() => handleBookDemo(plan.name)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Book Free Demo
            </Button>
          </Card>
        ))}

        <Card className="p-5 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-900">🎉 Special Offer</p>
            <p className="text-xs text-gray-600">
              Get 1 month FREE when you subscribe for 12 months
            </p>
            <p className="text-xs text-gray-600">
              12 مہینے کی سبسکرپشن پر 1 مہینہ مفت
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="space-y-2">
            <p className="text-sm text-gray-700">📌 All Plans Include:</p>
            <ul className="text-xs text-gray-600 space-y-1 ml-4">
              <li>• Free Installation & Setup</li>
              <li>• Data Migration Support</li>
              <li>• Regular Updates</li>
              <li>• Money Back Guarantee</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
