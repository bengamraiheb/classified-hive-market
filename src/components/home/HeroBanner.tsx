
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const popularLocations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Miami, FL",
];

const popularCategories = [
  "Vehicles",
  "Real Estate",
  "Electronics",
  "Furniture",
  "Fashion",
];

export function HeroBanner() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Buy & Sell<br/>
              <span className="text-primary">Anything</span> Near You
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-[600px] md:mx-0 mx-auto">
              Join the fastest growing marketplace with millions of listings and users.
              Find great deals or make money by selling what you don't need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 md:mx-0 mx-auto">
              <Button asChild size="lg" className="px-8">
                <Link to="/new-listing">Start Selling</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/browse">Browse Listings</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <p className="text-sm text-muted-foreground">Popular:</p>
              {popularCategories.map((category) => (
                <Link 
                  key={category} 
                  to={`/category/${category.toLowerCase()}`}
                  className="text-sm text-primary hover:underline"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-xl shadow-lg p-6 md:ml-auto">
            <h2 className="text-xl font-semibold mb-4">Find Your Next Deal</h2>

            <form className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="What are you looking for?" 
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {popularLocations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {popularCategories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full">
                Search
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-sm font-medium">Popular Locations</h3>
              <div className="flex flex-wrap gap-2">
                {popularLocations.slice(0, 3).map((location) => (
                  <Button key={location} variant="outline" size="sm" className="h-7 gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{location}</span>
                  </Button>
                ))}
                <Button variant="ghost" size="sm" className="h-7" asChild>
                  <Link to="/locations">More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
