import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, MapPin, Phone, Mail, MessageCircle, Store } from "lucide-react";

interface ContactScreenProps {
  onBack: () => void;
}

export function ContactScreen({ onBack }: ContactScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C64F2] to-blue-600 text-white pb-20">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg">Contact Us • رابطہ کریں</h1>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
            <Store className="w-14 h-14 text-[#1C64F2]" />
          </div>
          <div>
            <h2 className="text-2xl mb-2">Extreem Boost</h2>
            <p className="text-blue-100 text-sm">POS & Business Management</p>
          </div>
        </div>

        {/* Tagline */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-5">
          <p className="text-center text-white text-sm leading-relaxed">
            "Empowering Local Businesses with Smart Automation"
          </p>
          <p className="text-center text-blue-100 text-xs mt-2">
            مقامی کاروباروں کو سمارٹ آٹومیشن سے بااختیار بنانا
          </p>
        </Card>

        {/* Contact Details */}
        <div className="space-y-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white mb-1">Office Location</p>
                <p className="text-xs text-blue-100">DHA Phase 5, Karachi, Pakistan</p>
                <p className="text-xs text-blue-100">ڈی ایچ اے فیز 5، کراچی</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white mb-1">Phone Numbers</p>
                <p className="text-xs text-blue-100">+92 316 3264834</p>
                <p className="text-xs text-blue-100">+92 332 2411080</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white mb-1">Email</p>
                <p className="text-xs text-blue-100">info@extreemboost.com</p>
                <p className="text-xs text-blue-100">support@extreemboost.com</p>
              </div>
            </div>
          </Card>
        </div>

        {/* WhatsApp QR Code Placeholder */}
        <Card className="bg-white p-6">
          <p className="text-center text-sm text-gray-900 mb-4">Scan to Chat on WhatsApp</p>
          <div className="w-40 h-40 bg-gray-100 rounded-lg mx-auto flex items-center justify-center border-2 border-gray-200">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">QR Code</p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            واٹس ایپ پر بات کرنے کے لیے اسکین کریں
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full h-12 bg-white text-[#1C64F2] hover:bg-gray-100"
            onClick={() => window.open('https://wa.me/923163264834', '_blank')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Us Now
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 bg-transparent border-2 border-white text-white hover:bg-white/10"
            onClick={() => window.open('tel:+923163264834', '_blank')}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Us Now
          </Button>
        </div>

        {/* Business Hours */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
          <p className="text-sm text-white mb-2 text-center">Business Hours</p>
          <div className="text-xs text-blue-100 space-y-1 text-center">
            <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
            <p>Sunday: 10:00 AM - 5:00 PM</p>
            <p className="mt-2">پیر سے ہفتہ: صبح 9 سے شام 7</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
