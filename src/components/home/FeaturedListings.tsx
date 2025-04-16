
import { ListingCard, ListingCardSkeleton } from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Mock data for featured listings
const featuredListings = [
  {
    id: "1",
    title: "2020 Tesla Model 3 Performance - Low Mileage",
    price: 45999,
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format",
    category: "Vehicles",
    createdAt: new Date(Date.now() - 86400000 * 2),
    featured: true,
    verified: true,
  },
  {
    id: "2",
    title: "Modern Penthouse with Ocean View",
    price: 1250000,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format",
    category: "Real Estate",
    createdAt: new Date(Date.now() - 86400000 * 3),
    featured: true,
  },
  {
    id: "3",
    title: "Apple MacBook Pro 16\" M2 Max - 2023",
    price: 2199,
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format",
    category: "Electronics",
    createdAt: new Date(Date.now() - 86400000 * 1),
    featured: true,
    verified: true,
  },
  {
    id: "4",
    title: "Luxury Italian Leather Sectional Sofa",
    price: 1899,
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=2069&auto=format",
    category: "Furniture",
    createdAt: new Date(Date.now() - 86400000 * 4),
    featured: true,
  },
];

export function FeaturedListings({ isLoading = false }) {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Listings</h2>
          <Button variant="ghost" asChild>
            <Link to="/browse" className="flex items-center">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array(4).fill(0).map((_, i) => (
                <ListingCardSkeleton key={i} />
              ))
            : featuredListings.map((listing) => (
                <ListingCard key={listing.id} {...listing} />
              ))
          }
        </div>
      </div>
    </section>
  );
}
