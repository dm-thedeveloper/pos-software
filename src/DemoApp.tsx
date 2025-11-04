import { useState } from "react";
import { LandingScreen } from "./components/demo/LandingScreen";
import { DemoDashboard } from "./components/demo/DemoDashboard";
import { DemoPOS } from "./components/demo/DemoPOS";
import { BusinessTypeSelector } from "./components/demo/BusinessTypeSelector";
import { PricingPage } from "./components/demo/PricingPage";
import { ContactScreen } from "./components/demo/ContactScreen";
import { EndScreen } from "./components/demo/EndScreen";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { Home, X } from "lucide-react";

type DemoScreen =
  | "landing"
  | "dashboard"
  | "pos"
  | "business-types"
  | "pricing"
  | "contact"
  | "end"
  | "products"
  | "customers"
  | "reports"
  | "accounting";

export default function DemoApp() {
  const [currentScreen, setCurrentScreen] = useState<DemoScreen>("landing");
  const [showMainApp, setShowMainApp] = useState(false);

  const handleStartDemo = () => {
    setCurrentScreen("dashboard");
  };

  const handleRequestPricing = () => {
    setCurrentScreen("pricing");
  };

  const handleNavigate = (page: string) => {
    if (page === "pos") {
      setCurrentScreen("pos");
    } else if (page === "business-types") {
      setCurrentScreen("business-types");
    } else if (
      ["products", "customers", "reports", "accounting"].includes(page)
    ) {
      // Show full app for these pages
      setShowMainApp(true);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleRestart = () => {
    setCurrentScreen("landing");
    setShowMainApp(false);
  };

  // If showing full app, import and render the original App
  if (showMainApp) {
    return (
      <div className="relative">
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
            onClick={() => setShowMainApp(false)}
          >
            <X className="w-4 h-4 mr-2" />
            Back to Demo
          </Button>
        </div>
        {/* This would load the original full app */}
        <div className="text-center p-8">
          <p className="text-gray-600">Full application view</p>
          <Button onClick={() => setShowMainApp(false)} className="mt-4">
            Return to Demo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Bottom Navigation - Only show on dashboard and related screens */}
      {[
        "dashboard",
        "pos",
        "products",
        "customers",
        "reports",
        "accounting",
      ].includes(currentScreen) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg z-50">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2"
              onClick={() => setCurrentScreen("dashboard")}
            >
              <Home className="w-5 h-5 mb-1 text-[#1C64F2]" />
              <span className="text-xs">Dashboard</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2"
              onClick={() => setCurrentScreen("business-types")}
            >
              <span className="text-xl mb-1">💼</span>
              <span className="text-xs">Solutions</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2"
              onClick={() => setCurrentScreen("pricing")}
            >
              <span className="text-xl mb-1">💰</span>
              <span className="text-xs">Pricing</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2"
              onClick={() => setCurrentScreen("contact")}
            >
              <span className="text-xl mb-1">📞</span>
              <span className="text-xs">Contact</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2"
              onClick={() => setCurrentScreen("end")}
            >
              <span className="text-xl mb-1">✅</span>
              <span className="text-xs">Finish</span>
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        {currentScreen === "landing" && (
          <LandingScreen
            onStartDemo={handleStartDemo}
            onRequestPricing={handleRequestPricing}
          />
        )}

        {currentScreen === "dashboard" && (
          <DemoDashboard onNavigate={handleNavigate} />
        )}

        {currentScreen === "pos" && <DemoPOS onBack={handleBackToDashboard} />}

        {currentScreen === "business-types" && (
          <BusinessTypeSelector onBack={handleBackToDashboard} />
        )}

        {currentScreen === "pricing" && (
          <PricingPage onBack={handleBackToDashboard} />
        )}

        {currentScreen === "contact" && (
          <ContactScreen onBack={handleBackToDashboard} />
        )}

        {currentScreen === "end" && <EndScreen onRestart={handleRestart} />}
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
