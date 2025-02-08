import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Mail, Lock, User, LogIn } from "lucide-react";

export default function LoginSignup() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="flex">
      <div className="flex md:w-[50%] items-center justify-center bg-gray-200 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-bold ml-2">
                LogiYatra
              </CardTitle>
            </div>
            <CardDescription>
              Login or create an account to manage your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="m@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <Button disabled={isLoading}>
                      {isLoading && (
                        <Mail className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Login
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Mail className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <LogIn className="mr-2 h-4 w-4" />
                      )}{" "}
                      Login with Google
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        type="text"
                        autoCapitalize="words"
                        autoComplete="name"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="m@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="companyId">Company ID</Label>
                      <Input
                        id="companyId"
                        placeholder="Enter your company ID"
                        type="text"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <Button disabled={isLoading}>
                      {isLoading && (
                        <User className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Create Account
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Mail className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <LogIn className="mr-2 h-4 w-4" />
                      )}{" "}
                      Login with Google
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="block ">
            <p className="px-8 mb-3 text-center text-sm text-muted-foreground">
              Want to use LogiYatra for your company?
              <a
                href="/company-add"
                className="underline underline-offset-4 hover:text-primary"
              >
                Click here
              </a>
              .
            </p>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className="bg-[url('src/assets/image1.png')] bg-fixed bg-contain hidden md:block w-[50%]">
        <div className="h-full w-full bg-white opacity-30 "></div>
      </div>
    </div>
  );
}
