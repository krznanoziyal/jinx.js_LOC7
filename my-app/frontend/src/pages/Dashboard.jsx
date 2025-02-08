"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  Package,
  BarChart2,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Sidebar from "@/components/Sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { askFunk } from "@/api";

// Sample data for charts
const productData = [
  { average: 19, minimum: 4, maximum: 43 },
  { average: 51, minimum: 13, maximum: 104 },
  { average: 32, minimum: 8, maximum: 70 },
  { average: 19, minimum: 4, maximum: 41 },
  { average: 16, minimum: 3, maximum: 36 },
  { average: 51, minimum: 17, maximum: 103 },
  { average: 51, minimum: 14, maximum: 115 },
  { average: 67, minimum: 24, maximum: 121 },
  { average: 45, minimum: 14, maximum: 94 },
  { average: 64, minimum: 16, maximum: 120 },
];

const monthly = {
  Oats: [11, 12, 15, 17, 17, 21, 21, 19, 17, 16, 19, 13],
  Apple: [29, 31, 42, 44, 49, 55, 56, 51, 45, 43, 48, 33],
  Grapes: [18, 21, 25, 28, 32, 33, 36, 32, 30, 25, 30, 21],
  Avocado: [11, 12, 15, 17, 20, 20, 20, 19, 18, 15, 17, 13],
  "Coconut Milk": [9, 10, 12, 14, 16, 17, 17, 16, 14, 14, 14, 11],
  Banana: [29, 32, 40, 48, 51, 54, 57, 51, 47, 44, 46, 33],
  Quinoa: [30, 34, 42, 46, 52, 52, 55, 50, 47, 45, 47, 33],
  "Almonds and Cashews": [40, 44, 53, 62, 68, 70, 71, 64, 62, 56, 62, 43],
  SCOBY: [25, 29, 37, 40, 44, 48, 50, 44, 41, 37, 41, 29],
  Chickpeas: [36, 40, 52, 57, 59, 68, 67, 61, 59, 58, 59, 41],
};

const inventoryData = [
  { id: "P001", name: "Rice", quantity: 100, status: "normal" },
  { id: "P002", name: "Dal", quantity: 75, status: "low" },
  { id: "P003", name: "Milk", quantity: 50, status: "critical" },
  { id: "P004", name: "Bread", quantity: 30, status: "normal" },
  { id: "P005", name: "Eggs", quantity: 120, status: "overstocked" },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedItem, setSelectedItem] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const charities = askFunk();
  console.log("charities", charities);

  const data = months.map((monthName) => {
    const monthIndex = months.indexOf(monthName);
    const monthData = { month: monthName };

    for (const [productName] of Object.entries(monthly)) {
      monthData[productName] = monthly[productName][monthIndex];
    }

    return monthData;
  });
  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (value) => {
    setSelectedItem(value);
  };
  console.log(Object.keys(monthly)[selectedItem]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="pl-8 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User avatar"
                    />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Rahul Sharma
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      rahul@sharmastore.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹88,750</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sales Today
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹2,345</div>
                <p className="text-xs text-muted-foreground">
                  +15% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Items
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Low Stock Items
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  5 items require immediate attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                Your sales performance over the last 6 months
              </CardDescription>
              <Select onValueChange={handleChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="0">Oats</SelectItem>
                    <SelectItem value="1">Apple</SelectItem>
                    <SelectItem value="2">Grapes</SelectItem>
                    <SelectItem value="3">Papaya</SelectItem>
                    <SelectItem value="4">Coconut</SelectItem>
                    <SelectItem value="5">Banana</SelectItem>
                    <SelectItem value="6">Watermelon</SelectItem>
                    <SelectItem value="7">Almonds and Cashews</SelectItem>
                    <SelectItem value="8">Guava</SelectItem>
                    <SelectItem value="9">Orange</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sales: {
                    label: "Sales",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />

                    <Line
                      key={Object.keys(monthly)[selectedItem]}
                      type="linear"
                      dataKey={Object.keys(monthly)[selectedItem]}
                      stroke="#000"
                      activeDot={{ r: 2 }}
                    />

                    {/* <Line
                      type="linear"
                      dataKey="average"
                      stroke="green"
                      strokeWidth={2}
                    />
                    <Line
                      type="linear"
                      dataKey="minimum"
                      stroke="blue"
                      strokeWidth={2}
                    /> */}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Inventory and AI Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventory Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Overview</CardTitle>
                <CardDescription>
                  Current stock levels and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInventory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {item.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {item.quantity}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            item.status === "normal"
                              ? "bg-green-100 text-green-800"
                              : item.status === "low"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.status === "critical"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>
                  Smart insights for your inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <p></p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-red-500 transform rotate-180" />
                    <p>
                      Reduce dal stock by 10% to optimize inventory and prevent
                      overstocking.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <p>
                      Milk stock is critically low. Place an order immediately
                      to avoid stockout.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart2 className="h-5 w-5 text-blue-500" />
                    <p>
                      Sales of bread are trending up. Consider increasing your
                      regular order by 15%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
