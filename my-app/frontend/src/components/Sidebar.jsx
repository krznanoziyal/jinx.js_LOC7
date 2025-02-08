import { BarChart2, Package, Settings, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 flex items-center justify-start gap-3">
        <ShoppingCart />
        <h1 className="text-2xl font-bold">LogiYatra</h1>
      </div>
      <nav className="mt-6">
        <Button variant="ghost" className="w-full justify-start mb-2">
          <Package className="mr-2 h-4 w-4" />
          Dashboard
        </Button>

        <Button variant="ghost" className="w-full justify-start mb-2">
          <BarChart2 className="mr-2 h-4 w-4" />
          <a href="/product-input"> Product Input</a>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;
