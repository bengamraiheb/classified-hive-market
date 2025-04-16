
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Inbox } from "lucide-react";
import { ListingCard } from "@/components/listings/ListingCard";

// Import mock data
import { recentListings as mockListings } from "@/data/mockListings";

export default function Favorites() {
  const [favorites, setFavorites] = useState(mockListings.slice(0, 4));

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Saved Favorites</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((listing) => (
            <ListingCard 
              key={listing.id} 
              {...listing} 
              isFavorite={true}
              onFavoriteToggle={() => removeFavorite(listing.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No saved favorites yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Save items you're interested in by clicking the heart icon on any listing
          </p>
          <Button asChild>
            <Link to="/browse">Browse Listings</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
