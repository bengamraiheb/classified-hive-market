
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, Bell, User, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Demo toggle auth function - to be replaced with real auth
  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden font-bold text-xl sm:inline-block">
              HIVE<span className="text-hive-blue">MARKET</span>
            </span>
            <span className="font-bold text-xl sm:hidden">HM</span>
          </Link>
        </div>
        
        {isMobile ? (
          <>
            {isSearchOpen ? (
              <div className="flex-1 flex items-center">
                <Input 
                  placeholder="Search listings..." 
                  className="flex-1" 
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center w-full max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search listings..."
                className="w-full pl-8 bg-background"
              />
            </div>
          </div>
        )}
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {!isMobile && (
              <Button asChild variant="ghost">
                <Link to="/browse">Browse</Link>
              </Button>
            )}
            
            <Button asChild variant="default" className="hidden sm:flex">
              <Link to="/new-listing">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post Ad
              </Link>
            </Button>
            
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-hive-red"></span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-listings">My Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites">Favorites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/messages">Messages</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={toggleAuth}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={toggleAuth} variant="ghost">
                Sign In
              </Button>
            )}
            
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link to="/" className="text-lg font-medium">Home</Link>
                    <Link to="/browse" className="text-lg font-medium">Browse</Link>
                    <Link to="/categories" className="text-lg font-medium">Categories</Link>
                    <Link to="/new-listing" className="text-lg font-medium">Post an Ad</Link>
                    {isAuthenticated ? (
                      <>
                        <Link to="/profile" className="text-lg font-medium">Profile</Link>
                        <Link to="/my-listings" className="text-lg font-medium">My Listings</Link>
                        <Link to="/favorites" className="text-lg font-medium">Favorites</Link>
                        <Link to="/messages" className="text-lg font-medium">Messages</Link>
                        <Button variant="outline" onClick={toggleAuth}>Logout</Button>
                      </>
                    ) : (
                      <Button onClick={toggleAuth}>Sign In</Button>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
