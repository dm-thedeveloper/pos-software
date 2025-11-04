import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/pages/Dashboard";
import { POSTerminal } from "./components/pages/POSTerminal";
import { Products } from "./components/pages/Products";
import { Customers } from "./components/pages/Customers";
import { Orders } from "./components/pages/Orders";
import { Analytics } from "./components/pages/Analytics";
import { Transactions } from "./components/pages/Transactions";
import { Accounting } from "./components/pages/Accounting";
import { Categories } from "./components/pages/Categories";
import { Reports } from "./components/pages/Reports";
import { Settings } from "./components/pages/Settings";
import { Toaster } from "./components/ui/sonner";
import DemoApp from "./DemoApp";
import { Button } from "./components/ui/button";
import { Smartphone, Monitor } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [viewMode, setViewMode] = useState<"demo" | "full">("full");

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "pos-terminal":
        return <POSTerminal />;
      case "products":
        return <Products />;
      case "customers":
        return <Customers />;
      case "orders":
        return <Orders />;
      case "analytics":
        return <Analytics />;
      case "transactions":
        return <Transactions />;
      case "accounting":
        return <Accounting />;
      case "categories":
        return <Categories />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Show demo mode by default
  if (viewMode === "demo") {
    return (
      <>
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            className="bg-white shadow-lg border-2 border-[#1C64F2]"
            onClick={() => setViewMode("full")}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Full System View
          </Button>
        </div>
        <DemoApp />
      </>
    );
  }

  // Full desktop app view
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-white shadow-lg border-2 border-[#1C64F2]"
          onClick={() => setViewMode("demo")}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Demo Mode
        </Button>
      </div>

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderPage()}</div>
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
