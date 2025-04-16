
import { useState } from "react";
import { 
  ListingCard, 
  ListingCardSkeleton,
  ListingProps 
} from "@/components/listings/ListingCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Slider 
} from "@/components/ui/slider";
import { Filter, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

// Import mock data
import { recentListings as mockListings } from "@/data/mockListings";
import { Checkbox } from "@/components/ui/checkbox";

export default function Browse() {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState<ListingProps[]>(mockListings);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [filtersMobileOpen, setFiltersMobileOpen] = useState(false);

  // Categories for filtering
  const categories = [
    { id: "vehicles", label: "Vehicles" },
    { id: "electronics", label: "Electronics" },
    { id: "real-estate", label: "Real Estate" },
    { id: "furniture", label: "Furniture" },
    { id: "fashion", label: "Fashion" },
    { id: "sports", label: "Sports & Leisure" },
  ];

  // Conditions for filtering
  const conditions = [
    { id: "new", label: "New" },
    { id: "like-new", label: "Like New" },
    { id: "good", label: "Good" },
    { id: "fair", label: "Fair" },
    { id: "salvage", label: "For Parts/Salvage" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchQuery);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 10000]);
    setSortBy("newest");
    // Reset other filters here
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // Implement sorting logic
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button 
          variant="ghost" 
          className="h-auto p-0 text-sm text-muted-foreground"
          onClick={clearFilters}
        >
          Clear all
        </Button>
      </div>

      <div>
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, 10000]}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="mt-6"
          />
          <div className="flex items-center justify-between">
            <div className="border rounded-md px-3 py-1">
              ${priceRange[0]}
            </div>
            <div className="border rounded-md px-3 py-1">
              ${priceRange[1]}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <Accordion type="multiple" defaultValue={["categories", "condition"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category.id}`} />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition">
          <AccordionTrigger>Condition</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <div key={condition.id} className="flex items-center space-x-2">
                  <Checkbox id={`condition-${condition.id}`} />
                  <label 
                    htmlFor={`condition-${condition.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {condition.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <Input placeholder="City, state or ZIP" />
              <Select defaultValue="25">
                <SelectTrigger>
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 miles</SelectItem>
                  <SelectItem value="10">10 miles</SelectItem>
                  <SelectItem value="25">25 miles</SelectItem>
                  <SelectItem value="50">50 miles</SelectItem>
                  <SelectItem value="100">100 miles</SelectItem>
                  <SelectItem value="any">Any distance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="seller">
          <AccordionTrigger>Seller Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="seller-individual" />
                <label 
                  htmlFor="seller-individual"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Individual
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="seller-dealer" />
                <label 
                  htmlFor="seller-dealer"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Dealer/Business
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">Browse Listings</h1>
          <p className="text-muted-foreground">
            {listings.length} listings found
          </p>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {isMobile ? (
          <Sheet open={filtersMobileOpen} onOpenChange={setFiltersMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden mb-4">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <FilterSidebar />
            </SheetContent>
          </Sheet>
        ) : (
          <div className="lg:w-1/4 shrink-0">
            <FilterSidebar />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "secondary" : "outline"}
                className="h-9 w-9"
                onClick={() => setViewMode("grid")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "secondary" : "outline"}
                className="h-9 w-9"
                onClick={() => setViewMode("list")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </Button>
            </div>
          </div>

          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6" 
              : "flex flex-col gap-4"
          }>
            {isLoading
              ? Array(9).fill(0).map((_, i) => (
                  <ListingCardSkeleton key={i} />
                ))
              : listings.map((listing) => (
                  <ListingCard key={listing.id} {...listing} />
                ))
            }
          </div>
          
          {listings.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No listings found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button onClick={clearFilters} variant="outline">Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
