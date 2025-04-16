
import { ListingCard, ListingCardSkeleton } from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for recent listings
const recentListings = [
  {
    id: "5",
    title: "Professional DSLR Camera Kit - Canon EOS R6",
    price: 2499,
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format",
    category: "Electronics",
    createdAt: new Date(Date.now() - 3600000 * 2),
    verified: true,
  },
  {
    id: "6",
    title: "Vintage Mid-Century Modern Dining Set",
    price: 850,
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=2073&auto=format",
    category: "Furniture",
    createdAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    id: "7",
    title: "iPhone 15 Pro Max - 256GB - Barely Used",
    price: 999,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1696446702183-be729cb7abfd?q=80&w=2062&auto=format",
    category: "Electronics",
    createdAt: new Date(Date.now() - 3600000 * 6),
    verified: true,
  },
  {
    id: "8",
    title: "Designer Leather Jacket - Size M",
    price: 399,
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=2035&auto=format",
    category: "Fashion",
    createdAt: new Date(Date.now() - 3600000 * 8),
  },
  {
    id: "9",
    title: "Mountain Bike - Trek Fuel EX 8",
    price: 2100,
    location: "Boulder, CO",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=2068&auto=format",
    category: "Sports",
    createdAt: new Date(Date.now() - 3600000 * 10),
  },
  {
    id: "10",
    title: "Downtown Studio Apartment for Rent",
    price: 1200,
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format",
    category: "Real Estate",
    createdAt: new Date(Date.now() - 3600000 * 12),
  },
  {
    id: "11",
    title: "Gaming PC - RTX 4080, i9, 64GB RAM",
    price: 2800,
    location: "Houston, TX",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format",
    category: "Electronics",
    createdAt: new Date(Date.now() - 3600000 * 14),
  },
  {
    id: "12",
    title: "Antique Wooden Desk - Excellent Condition",
    price: 450,
    location: "Charleston, SC",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2065&auto=format",
    category: "Furniture",
    createdAt: new Date(Date.now() - 3600000 * 16),
  },
];

// Category tabs
const categories = [
  { id: "all", label: "All" },
  { id: "Electronics", label: "Electronics" },
  { id: "Furniture", label: "Furniture" },
  { id: "Fashion", label: "Fashion" },
  { id: "Vehicles", label: "Vehicles" },
  { id: "Real Estate", label: "Real Estate" },
];

export function RecentListings({ isLoading = false }) {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Listings</h2>
          <Button variant="ghost" asChild>
            <Link to="/browse" className="flex items-center">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="mb-6 overflow-x-auto pb-2">
            <TabsList className="w-fit">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading
                  ? Array(8).fill(0).map((_, i) => (
                      <ListingCardSkeleton key={i} />
                    ))
                  : (category.id === "all" 
                      ? recentListings 
                      : recentListings.filter(listing => listing.category === category.id)
                    ).slice(0, 8).map((listing) => (
                      <ListingCard key={listing.id} {...listing} />
                    ))
                }
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
