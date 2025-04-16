
import { Link } from "react-router-dom";
import { Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export interface ListingProps {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  category: string;
  createdAt: Date;
  featured?: boolean;
  verified?: boolean;
}

export function ListingCard({
  id,
  title,
  price,
  location,
  image,
  category,
  createdAt,
  featured = false,
  verified = false,
}: ListingProps) {
  return (
    <Card className={cn(
      "h-full overflow-hidden transition-all hover:shadow-md group", 
      featured && "border-primary/50 bg-primary/5"
    )}>
      <Link to={`/listings/${id}`} className="relative block">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {featured && (
          <Badge className="absolute top-2 left-2 bg-primary">
            Featured
          </Badge>
        )}
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Toggle favorite logic here
          }}
        >
          <Heart className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </Link>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
        </div>
        
        <Link to={`/listings/${id}`}>
          <h3 className="text-base font-medium line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {title}
            {verified && (
              <Star className="inline-block ml-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            )}
          </h3>
        </Link>
        
        <p className="text-base font-semibold text-primary mb-1">
          {typeof price === 'number' ? 
            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price) : 
            price
          }
        </p>
        
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function ListingCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <div className="aspect-[4/3] bg-muted">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-full mb-1" />
        <Skeleton className="h-6 w-28 mb-1" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}
