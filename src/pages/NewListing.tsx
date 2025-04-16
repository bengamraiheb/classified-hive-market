
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const categories = [
  { value: "vehicles", label: "Vehicles" },
  { value: "real-estate", label: "Real Estate" },
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "fashion", label: "Fashion" },
  { value: "sports", label: "Sports & Leisure" },
  { value: "baby-kids", label: "Baby & Kids" },
  { value: "services", label: "Services" },
  { value: "jobs", label: "Jobs" },
  { value: "other", label: "Other" },
];

const conditions = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "salvage", label: "For Parts/Salvage" },
];

// Create schema for form validation
const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title cannot exceed 100 characters"),
  category: z.string({ required_error: "Please select a category" }),
  description: z.string().min(30, "Description must be at least 30 characters"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  condition: z.string({ required_error: "Please select a condition" }),
  location: z.string().min(5, "Please enter a valid location"),
  sellerType: z.enum(["individual", "business"], {
    required_error: "Please select a seller type",
  }),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function NewListing() {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  
  // Initialize form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: undefined,
      condition: "",
      location: "",
      sellerType: "individual",
      images: [],
    },
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      // Create preview URLs for the images
      const newImageURLs = files.map(file => URL.createObjectURL(file));
      
      setImageFiles(prev => [...prev, ...files]);
      setImageURLs(prev => [...prev, ...newImageURLs]);
      
      // Update form value
      form.setValue("images", [...imageURLs, ...newImageURLs], { shouldValidate: true });
    }
  };
  
  const removeImage = (index: number) => {
    const updatedFiles = [...imageFiles];
    const updatedURLs = [...imageURLs];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedURLs[index]);
    
    updatedFiles.splice(index, 1);
    updatedURLs.splice(index, 1);
    
    setImageFiles(updatedFiles);
    setImageURLs(updatedURLs);
    
    // Update form value
    form.setValue("images", updatedURLs, { shouldValidate: true });
  };
  
  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    console.log("Image files:", imageFiles);
    
    // In a real app, you would upload the images and send the form data to the server
    // For now, we'll just simulate a successful submission
    
    // Show success message
    alert("Listing created successfully!");
    
    // Navigate to the home page
    navigate("/");
  };
  
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Create a New Listing</h1>
        <p className="text-muted-foreground mb-6">
          Fill out the form below to create a new listing. Fields marked with * are required.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Provide the basic details of what you're selling.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., iPhone 13 Pro Max - 256GB - Excellent Condition" {...field} />
                      </FormControl>
                      <FormDescription>
                        Be specific about what you're selling.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {conditions.map((condition) => (
                              <SelectItem key={condition.value} value={condition.value}>
                                {condition.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($) *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your item in detail. Include information about the condition, features, and any other relevant details."
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum 30 characters. Be detailed and honest.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>
                  Upload photos of your item. Clear photos from multiple angles help your listing sell faster.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photos *</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {/* Image preview */}
                            {imageURLs.map((url, index) => (
                              <div key={index} className="relative aspect-square rounded-md overflow-hidden border bg-muted">
                                <img 
                                  src={url} 
                                  alt={`Preview ${index + 1}`} 
                                  className="object-cover w-full h-full"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-1 right-1 h-6 w-6"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            
                            {/* Upload button */}
                            {imageURLs.length < 10 && (
                              <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center p-4 border-muted-foreground/25 cursor-pointer hover:border-muted-foreground/50 transition-colors">
                                <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                                  <span className="text-sm text-muted-foreground font-medium text-center">
                                    {imageURLs.length === 0 ? "Add Photos" : "Add More"}
                                  </span>
                                  <span className="text-xs text-muted-foreground text-center mt-1">
                                    {10 - imageURLs.length} remaining
                                  </span>
                                </Label>
                                <Input 
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={handleImageUpload}
                                />
                              </div>
                            )}
                          </div>
                          
                          {imageURLs.length === 0 && (
                            <div className="flex items-center justify-center border border-dashed rounded-lg p-6 border-muted-foreground/25">
                              <Label htmlFor="main-image-upload" className="cursor-pointer flex flex-col items-center justify-center">
                                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                <span className="text-muted-foreground font-medium">
                                  Upload Photos
                                </span>
                                <span className="text-xs text-muted-foreground mt-1">
                                  Drag & drop or click to upload (max 10)
                                </span>
                              </Label>
                              <Input 
                                id="main-image-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload up to 10 photos. The first image will be your listing's main photo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact & Location</CardTitle>
                <CardDescription>
                  Provide contact and location information for potential buyers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location *</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State (e.g., Miami, FL)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Be specific to help local buyers find your listing.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sellerType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Seller Type *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="individual" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Individual
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="business" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Business / Dealer
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <div className="flex flex-col gap-4">
              <Separator />
              
              <div className="flex items-center justify-between">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit">
                  Post Listing
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                By posting this listing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
