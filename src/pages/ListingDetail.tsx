
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Flag,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share,
  User,
  Eye,
  Star,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ListingCard } from "@/components/listings/ListingCard";

// Import mock data
import { mockListings } from "@/data/mockListings";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Find the listing by id from the mock data
  const listing = mockListings.find(listing => listing.id === id);

  // Redirect or show error if listing not found
  if (!listing) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
        <p className="mb-6 text-muted-foreground">
          The listing you are looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/browse">Browse Listings</Link>
        </Button>
      </div>
    );
  }

  // Mock images array (in a real app, these would come from the listing data)
  const images = [
    listing.image,
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2128&auto=format",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format",
  ];

  // Mock seller data
  const seller = {
    id: "s123",
    name: "Alex Johnson",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    joinedDate: new Date(2021, 3, 15),
    rating: 4.8,
    responseRate: 97,
    verified: true,
  };

  // Mock listing details
  const details = {
    condition: "Like New",
    brand: listing.category === "Vehicles" ? "Tesla" : "Apple",
    model: listing.category === "Vehicles" ? "Model 3" : "MacBook Pro",
    year: listing.category === "Vehicles" ? 2022 : 2023,
    postedDate: listing.createdAt,
    views: 243,
    description: `This is a detailed description of the ${listing.title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna.

Aenean rhoncus velit id erat fringilla volutpat. Proin finibus enim in mattis eleifend. Cras turpis urna, tempor sed facilisis in, vestibulum nec ex. Nam consequat lorem non metus ultricies, vitae tempor mi aliquet.

Features:
- High performance
- Excellent condition
- All original accessories included
- Extended warranty available`,
  };

  // Mock related listings (filtered by category)
  const relatedListings = mockListings
    .filter(item => item.category === listing.category && item.id !== listing.id)
    .slice(0, 4);

  return (
    <div className="container py-8">
      {/* Breadcrumb & Actions */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="sm" className="mr-2">
            <Link to="/browse">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to listings
            </Link>
          </Button>
          <div className="text-sm text-muted-foreground">
            {listing.category} / {listing.title}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Share className="mr-1 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="mr-1 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="mr-1 h-4 w-4" />
            Report
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery & Details */}
        <div className="lg:w-2/3">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img
                src={images[activeImageIndex]}
                alt={listing.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto py-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`rounded-md overflow-hidden h-20 w-20 flex-shrink-0 border-2 ${
                    activeImageIndex === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Listing Details */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="outline">{listing.category}</Badge>
                <Badge variant="outline">{details.condition}</Badge>
                {listing.verified && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                ID: {listing.id}
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {listing.title}
              {listing.verified && (
                <Star className="inline-block ml-2 h-5 w-5 fill-amber-400 text-amber-400" />
              )}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-semibold text-primary">
                {typeof listing.price === 'number' ? 
                  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing.price) : 
                  listing.price
                }
              </span>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{listing.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="h-4 w-4 mr-1" />
                <span>{details.views} views</span>
              </div>
            </div>
            
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="py-4">
                <div className="whitespace-pre-wrap">
                  {details.description}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Condition</span>
                    <span className="font-medium">{details.condition}</span>
                  </div>
                  {details.brand && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Brand</span>
                      <span className="font-medium">{details.brand}</span>
                    </div>
                  )}
                  {details.model && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Model</span>
                      <span className="font-medium">{details.model}</span>
                    </div>
                  )}
                  {details.year && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Year</span>
                      <span className="font-medium">{details.year}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="font-medium">
                      {formatDistanceToNow(details.postedDate, { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Views</span>
                    <span className="font-medium">{details.views}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Contact & Seller & Similar */}
        <div className="lg:w-1/3 space-y-6">
          {/* Contact Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={seller.image} alt={seller.name} />
                  <AvatarFallback>
                    {seller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-medium flex items-center">
                    {seller.name}
                    {seller.verified && (
                      <Badge variant="secondary" className="ml-2 text-xs">Verified</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Member since {seller.joinedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Response rate</span>
                  <span className="font-medium">{seller.responseRate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Seller rating</span>
                  <span className="font-medium flex items-center">
                    {seller.rating}
                    <Star className="ml-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message Seller
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Phone className="mr-2 h-4 w-4" />
                  Show Phone Number
                </Button>
              </div>
              
              <div className="mt-4 text-xs text-center text-muted-foreground">
                Remember to stay safe when buying! Never pay in advance.
              </div>
            </CardContent>
          </Card>
          
          {/* Safety Tips */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-md font-semibold mb-3 flex items-center">
                <Shield className="mr-2 h-4 w-4 text-amber-500" />
                Safety Tips
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Meet in a safe, public place
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Check the item before paying
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Pay only after inspecting the item
                </li>
              </ul>
              <Button variant="link" className="px-0 text-xs" asChild>
                <Link to="/safety">View all safety tips</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Similar Listings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Similar Listings</h3>
            <div className="space-y-4">
              {relatedListings.map(item => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">
                        <Link to={`/listings/${item.id}`}>
                          {item.title}
                        </Link>
                      </h4>
                      <div className="text-sm font-semibold text-primary">
                        {typeof item.price === 'number' ? 
                          new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price) : 
                          item.price
                        }
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.location}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to={`/category/${listing.category.toLowerCase()}`}>
                View More {listing.category}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
