import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  BarChart2,
  TrendingUp,
  ShoppingCart,
  ArrowRight,
  Menu,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Drawer } from "vaul";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Cart() {
  const { nodes, scene, animation } = useGLTF("/cart.glb");

  // const { ref, actions, names } = useAnimations(animation);

  console.log(nodes);

  // seEffect(() => {
  //   .play();
  // }, []);

  return (
    <mesh>
      <primitive object={scene} />
    </mesh>
  );
}

function Assistant() {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    meshRef.current.rotation.y -= delta * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[1.5, 0, 0]}>
      <sphereGeometry args={[0.75, 32, 32]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
}

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-14 h-14 flex items-center justify-between">
        <a className="flex items-center justify-center" href="#">
          <ShoppingCart className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">LogiYatra</span>
        </a>
        <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6  ">
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </a>
        </nav>
        <nav className="sm:hidden">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Menu />
            </DialogTrigger>
            <DialogContent className="bg-white top-[90px] w-36 h-[180px] left-[290px]">
              <DialogDescription>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="text-sm font-medium hover:underline underline-offset-4"
                      href="#"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm font-medium hover:underline underline-offset-4"
                      href="#"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm font-medium hover:underline underline-offset-4"
                      href="#"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm font-medium hover:underline underline-offset-4"
                      href="#"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12  lg:py-20 ">
          <div className="container px-4 md:px-14">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col col-span-2 justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl  font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-Powered Inventory Management for Hyperlocal Businesses
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Predict demand, optimize stock, and boost profits with
                    LogiYatra. Tailored for India's dynamic hyperlocal market.
                  </p>
                </div>
                <a
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  href="/login"
                >
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full  py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-14">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="mb-5">
                  <CardTitle>AI-Driven Demand Prediction</CardTitle>
                </CardHeader>
                <CardContent className="mb-5">
                  <BarChart2 className="h-12 w-12  mb-9" />
                  <p>
                    Leverage machine learning algorithms to forecast demand
                    accurately, reducing overstock and stockouts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="mb-5">
                  <CardTitle>Real-time Market Insights</CardTitle>
                </CardHeader>
                <CardContent className="mb-5">
                  <TrendingUp className="h-12 w-12 mb-9" />
                  <p>
                    Stay ahead with live data on market trends, consumer
                    behavior, and competitor analysis.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="mb-5">
                  <CardTitle>Automated Reordering</CardTitle>
                </CardHeader>
                <CardContent className="mb-5">
                  <ShoppingCart className="h-12 w-12 mb-9" />
                  <p>
                    Set smart reorder points and let our system handle inventory
                    replenishment automatically.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 ">
          <div className="container px-4 md:px-14">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-20">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center gap-2 ">
                <div className="mb-4 text-3xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-2">Connect Your Data</h3>
                <p>
                  Integrate your existing inventory and sales data with our
                  secure platform.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="mb-4 text-3xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p>
                  Our AI algorithms analyze your data along with market trends
                  to generate insights.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="mb-4 text-3xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-2">Optimize Inventory</h3>
                <p>
                  Receive actionable recommendations to optimize your stock
                  levels and boost profitability.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24  bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-14 ">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-20">
              What Our Customers Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="mt-4 my-8 ">
                  <p className="mb-4">
                    "LogiYatra has revolutionized our inventory management. We've
                    reduced waste by 30% and increased profits!"
                  </p>
                  <p className="font-semibold">- Priya Sharma, Local Grocer</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="mt-4 my-8">
                  <p className="mb-4">
                    "The demand prediction is spot on. It's like having a
                    crystal ball for our business."
                  </p>
                  <p className="font-semibold">
                    - Rahul Patel, Electronics Store Owner
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="mt-4 my-8">
                  <p className="mb-4">
                    "We've seen a 25% increase in turnover since using LogiYatra.
                    It's a game-changer for hyperlocal businesses."
                  </p>
                  <p className="font-semibold">
                    - Anita Desai, Fashion Boutique Manager
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full h-screen flex items-center">
          <div className="container px-4 md:px-14">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Optimize Your Inventory?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join hundreds of successful hyperlocal businesses in India.
                  Start your journey to smarter inventory management today.
                </p>
              </div>
              <Button className="sm:inline-flex hidden h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Start Free Trial
              </Button>
              <Button className="sm:hidden inline-flex items-center justify-center">
                Download App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-14 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 LogiYatra. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
