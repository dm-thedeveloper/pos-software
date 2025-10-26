import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Store, Scissors, GraduationCap, Building2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useState } from "react";

interface BusinessTypeSelectorProps {
  onBack: () => void;
}

const businessTypes = [
  {
    id: "superstore",
    icon: Store,
    title: "Super Store POS",
    titleUrdu: "سپر اسٹور",
    color: "bg-blue-500",
    features: [
      "Product Barcode Scanning",
      "Quick Billing System",
      "Inventory Management",
      "Customer Loyalty Program",
      "Daily Sales Reports"
    ],
    featuresUrdu: [
      "بار کوڈ اسکیننگ",
      "تیز بلنگ",
      "انوینٹری مینجمنٹ",
      "کسٹمر لائلٹی",
      "روزانہ رپورٹس"
    ]
  },
  {
    id: "salon",
    icon: Scissors,
    title: "Salon Management",
    titleUrdu: "سیلون مینجمنٹ",
    color: "bg-pink-500",
    features: [
      "Appointment Booking",
      "Staff Management",
      "Service Packages",
      "Customer History",
      "Payment Processing"
    ],
    featuresUrdu: [
      "اپائنٹمنٹ بکنگ",
      "اسٹاف مینجمنٹ",
      "سروس پیکجز",
      "کسٹمر ہسٹری",
      "پیمنٹ پروسیسنگ"
    ]
  },
  {
    id: "school",
    icon: GraduationCap,
    title: "School Software",
    titleUrdu: "اسکول سافٹ ویئر",
    color: "bg-green-500",
    features: [
      "Student Management",
      "Fee Collection",
      "Attendance System",
      "Result Management",
      "Parent Portal"
    ],
    featuresUrdu: [
      "طالب علم مینجمنٹ",
      "فیس کلیکشن",
      "حاضری سسٹم",
      "نتیجہ مینجمنٹ",
      "والدین پورٹل"
    ]
  },
  {
    id: "office",
    icon: Building2,
    title: "Office Attendance",
    titleUrdu: "آفس حاضری",
    color: "bg-purple-500",
    features: [
      "Biometric Integration",
      "Leave Management",
      "Payroll Processing",
      "Employee Tracking",
      "Shift Management"
    ],
    featuresUrdu: [
      "بائیو میٹرک",
      "چھٹی مینجمنٹ",
      "تنخواہ",
      "ملازم ٹریکنگ",
      "شفٹ مینجمنٹ"
    ]
  }
];

export function BusinessTypeSelector({ onBack }: BusinessTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const selectedBusiness = businessTypes.find(b => b.id === selectedType);

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
          <h1 className="text-lg">Business Solutions</h1>
          <p className="text-xs text-blue-100">کاروباری حل</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600 text-center">
          Select your business type to see specific features
        </p>

        <div className="grid grid-cols-1 gap-4">
          {businessTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                className="p-5 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 mb-1">{type.title}</h3>
                    <p className="text-sm text-gray-500">{type.titleUrdu}</p>
                  </div>
                  <div className="text-gray-400">›</div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-5 bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-700 text-center">
            💡 All solutions include POS, Reports & Cloud Backup
          </p>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedType} onOpenChange={() => setSelectedType(null)}>
        <DialogContent className="max-w-sm">
          {selectedBusiness && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${selectedBusiness.color} rounded-xl flex items-center justify-center`}>
                    <selectedBusiness.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle>{selectedBusiness.title}</DialogTitle>
                    <p className="text-sm text-gray-500">{selectedBusiness.titleUrdu}</p>
                  </div>
                </div>
                <DialogDescription className="sr-only">
                  View features and request a demo for {selectedBusiness.title}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm text-gray-700 mb-3">Key Features:</h4>
                  <div className="space-y-2">
                    {selectedBusiness.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-green-600">✓</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">{feature}</p>
                          <p className="text-xs text-gray-500">{selectedBusiness.featuresUrdu[index]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                  <p className="text-sm text-gray-700 text-center mb-2">
                    Special Demo Available
                  </p>
                  <p className="text-xs text-gray-600 text-center">
                    Contact us for a personalized demo of this solution
                  </p>
                </Card>

                <Button
                  className="w-full bg-[#1C64F2]"
                  onClick={() => {
                    window.open('https://wa.me/923163264834?text=I%20want%20a%20demo%20of%20' + selectedBusiness.title, '_blank');
                  }}
                >
                  Request Demo on WhatsApp
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
