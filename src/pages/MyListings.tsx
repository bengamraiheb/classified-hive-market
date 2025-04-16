
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import mock data
import { recentListings as mockListings } from "@/data/mockListings";
import { ListingProps } from "@/components/listings/ListingCard";

// Add missing properties to the mockListings data
const enhancedMockListings = mockListings.map((listing, index) => ({
  ...listing,
  status: index % 3 === 0 ? "active" : index % 3 === 1 ? "paused" : "sold",
  condition: index % 2 === 0 ? "New" : "Used",
  views: Math.floor(Math.random() * 100),
  favorites: Math.floor(Math.random() * 20),
  imageUrl: listing.image, // Map image to imageUrl for consistency
}));

export default function MyListings() {
  const [listings, setListings] = useState<ListingProps[]>(enhancedMockListings);
  const [activeTab, setActiveTab] = useState("active");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // In a real app, this would fetch the appropriate listings from an API
  };

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
    toast.success("Listing deleted successfully");
  };

  const handleTogglePause = (id: string) => {
    setListings(listings.map(listing => 
      listing.id === id 
        ? { ...listing, status: listing.status === "active" ? "paused" : "active" } 
        : listing
    ));
    const status = listings.find(l => l.id === id)?.status === "active" ? "paused" : "active";
    toast.success(`Listing ${status === "active" ? "activated" : "paused"} successfully`);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "paused":
        return <Badge variant="outline">Paused</Badge>;
      case "sold":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Sold</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">My Listings</h1>
        <Button asChild>
          <Link to="/new-listing">
            Create New Listing
          </Link>
        </Button>
      </div>

      <Tabs 
        defaultValue="active" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="active">Active (3)</TabsTrigger>
          <TabsTrigger value="paused">Paused (1)</TabsTrigger>
          <TabsTrigger value="sold">Sold (2)</TabsTrigger>
          <TabsTrigger value="expired">Expired (0)</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {listings.filter(listing => listing.status === "active").map((listing) => (
              <ListingItem 
                key={listing.id} 
                listing={listing}
                onDelete={handleDeleteListing}
                onTogglePause={handleTogglePause}
              />
            ))}
            {listings.filter(listing => listing.status === "active").length === 0 && (
              <EmptyState 
                message="You don't have any active listings"
                subMessage="Create your first listing to start selling"
                actionUrl="/new-listing"
                actionText="Create Listing"
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="paused" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {listings.filter(listing => listing.status === "paused").map((listing) => (
              <ListingItem 
                key={listing.id} 
                listing={listing}
                onDelete={handleDeleteListing}
                onTogglePause={handleTogglePause}
              />
            ))}
            {listings.filter(listing => listing.status === "paused").length === 0 && (
              <EmptyState 
                message="No paused listings"
                subMessage="Your paused listings will appear here"
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="sold" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {listings.filter(listing => listing.status === "sold").map((listing) => (
              <ListingItem 
                key={listing.id} 
                listing={listing}
                onDelete={handleDeleteListing}
                onTogglePause={handleTogglePause}
                showPause={false}
              />
            ))}
            {listings.filter(listing => listing.status === "sold").length === 0 && (
              <EmptyState 
                message="No sold listings"
                subMessage="Your sold listings will appear here"
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="expired" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {listings.filter(listing => listing.status === "expired").map((listing) => (
              <ListingItem 
                key={listing.id} 
                listing={listing}
                onDelete={handleDeleteListing}
                onTogglePause={handleTogglePause}
                showPause={false}
              />
            ))}
            {listings.filter(listing => listing.status === "expired").length === 0 && (
              <EmptyState 
                message="No expired listings"
                subMessage="Your expired listings will appear here"
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ListingItemProps {
  listing: ListingProps;
  onDelete: (id: string) => void;
  onTogglePause: (id: string) => void;
  showPause?: boolean;
}

function ListingItem({ listing, onDelete, onTogglePause, showPause = true }: ListingItemProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/4 h-48 sm:h-auto">
            <img 
              src={listing.imageUrl || listing.image} 
              alt={listing.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <h3 className="text-lg font-semibold">{listing.title}</h3>
              <div className="mt-2 sm:mt-0">
                {getStatusBadge(listing.status || 'unknown')}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline">{listing.category}</Badge>
              {listing.condition && (
                <Badge variant="outline">{listing.condition}</Badge>
              )}
            </div>
            
            <p className="text-2xl font-bold text-primary mb-2">
              ${listing.price.toLocaleString()}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-muted-foreground text-sm">
              <div>
                Listed on {new Date(listing.createdAt).toLocaleDateString()}
              </div>
              <div>
                {listing.views || 0} views • {listing.favorites || 0} favorites
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between bg-muted/50 py-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/listings/${listing.id}`}>
            <Eye className="h-4 w-4 mr-1" /> View
          </Link>
        </Button>
        
        <div className="flex space-x-2">
          {showPause && listing.status && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onTogglePause(listing.id)}
            >
              {listing.status === "paused" ? (
                <>
                  <Play className="h-4 w-4 mr-1" /> Activate
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4 mr-1" /> Pause
                </>
              )}
            </Button>
          )}
          
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/edit-listing/${listing.id}`}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(listing.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}

interface EmptyStateProps {
  message: string;
  subMessage: string;
  actionUrl?: string;
  actionText?: string;
}

function EmptyState({ message, subMessage, actionUrl, actionText }: EmptyStateProps) {
  return (
    <div className="text-center py-12 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">{message}</h3>
      <p className="text-muted-foreground mb-4">{subMessage}</p>
      
      {actionUrl && actionText && (
        <Button asChild>
          <Link to={actionUrl}>{actionText}</Link>
        </Button>
      )}
    </div>
  );
}
