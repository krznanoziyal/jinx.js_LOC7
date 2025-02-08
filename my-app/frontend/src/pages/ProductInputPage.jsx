import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, useToast } from "@/hooks/use-toast";

export default function ProductInputPage() {
  const [productInfo, setProductInfo] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    hasExpiryDate: false,
    expiryDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Product Info:", productInfo);
    toast({
      title: "Product Added",
      description: `${productInfo.name} has been added to the inventory.`,
    });
    // Reset form after submission
    setProductInfo({
      id: "",
      name: "",
      price: "",
      quantity: "",
      hasExpiryDate: false,
      expiryDate: "",
    });

    const formData = new FormData();
    formData.append("csv_file", csvFile);

    console.log(csvFile);
    console.log("formData", formData);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://9b23-61-246-51-230.ngrok-free.app/analyze/csv",
        {
          method: "POST",
          body: formData, // Send the FormData with the file and question
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json(); // Parse the JSON response
      setResponse(data); // Set the response data
    } catch (err) {
      setError(err.message); // Handle any errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      // Here you would typically process the CSV file
      console.log("CSV File:", file.name);
      toast({
        title: "CSV File Uploaded",
        description: `${file.name} has been uploaded and is ready for processing.`,
      });
    }
  };

  return (
    <div className="container mx-auto mt-16 p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Enter details of your product below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Product ID</Label>
                <Input
                  id="id"
                  name="id"
                  value={productInfo.id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={productInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={productInfo.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={productInfo.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasExpiryDate"
                name="hasExpiryDate"
                checked={productInfo.hasExpiryDate}
                onCheckedChange={(checked) =>
                  setProductInfo((prev) => ({
                    ...prev,
                    hasExpiryDate: checked,
                  }))
                }
              />
              <Label htmlFor="hasExpiryDate">Product has expiry date</Label>
            </div>
            {productInfo.hasExpiryDate && (
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={productInfo.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </form>
          <div className="mt-6">
            <Label htmlFor="csvUpload">
              Or upload a CSV file with multiple products
            </Label>
            <div className="mt-2 flex items-center space-x-2">
              <Input
                id="csvUpload"
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
                className="flex-1"
              />
              <Button type="button" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
