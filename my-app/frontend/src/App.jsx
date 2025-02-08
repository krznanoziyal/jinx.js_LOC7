import "./App.css";
import LoginSignup from "./pages/LoginSignup";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import CompanyInfo from "./pages/CompanyInfo";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { Popover, PopoverTrigger } from "./components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import InventoryPage from "./pages/InventoryPage";
import ProductInputPage from "./pages/ProductInputPage";

function App() {
  return (
    <>
      <Router>
        <div className="relative">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/register" element={<Register />} />

            <Route path="/company-add" element={<CompanyInfo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product-input" element={<ProductInputPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Routes>
        </div>
      </Router>
      <Popover>
        <PopoverTrigger asChild>
          <button className="absolute bottom-14 right-20  bg-white shadow-xl border-[0.5px] border-[#b0b0b0] rounded-full h-16 w-16">
            <img src="/boticon.png" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 h-[550px] absolute -top-[550px] right-10  bg-white border-2 border-purple-2 00">
          <div>
            <div className="h-[500px] ">
              <img src="/boticon.png" className="h-20 -ml-3" />
              <div className="text-xs px-4 py-2 bg-blue-300 rounded-md mx-3 ">
                The current trends in the food industry include alternative
                proteins, nutraceuticals, e-commerce, food safety and
                transparency, digital food management, restaurant digitisation,
                and 3D food printing.
              </div>
              <div className="text-xs mt-2 px-4 py-2 bg-blue-300 rounded-md mx-3 ">
                These trends aim to enhance health management, improve
                operational efficiency, and cater to changing consumer demands
                and regulatory requirements.
              </div>
            </div>
            <input
              type="text"
              className="border-2 text-sm px-2 border-[#535353] min-w-[300px] ml-2 h-10 rounded-lg focus:outline-none"
              value="What are the current trends in food industry?"
            ></input>
          </div>
        </PopoverContent>
      </Popover>
    </>
    // <Data />
  );
}

export default App;
