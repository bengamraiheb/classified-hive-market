
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
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useLanguage();

  // Demo toggle auth function - to be replaced with real auth
  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden font-bold text-xl sm:inline-block">
              {t('app.name')}
            </span>
            <span className="font-bold text-xl sm:hidden">HM</span>
          </Link>
        </div>
        
        {isMobile ? (
          <>
            {isSearchOpen ? (
              <div className="flex-1 flex items-center">
                <Input 
                  placeholder={`${t('browse.search')}...`}
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
                placeholder={`${t('browse.search')}...`}
                className="w-full pl-8 bg-background"
              />
            </div>
          </div>
        )}
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <LanguageSelector />
            
            {!isMobile && (
              <Button asChild variant="ghost">
                <Link to="/browse">{t('nav.browse')}</Link>
              </Button>
            )}
            
            <Button asChild variant="default" className="hidden sm:flex">
              <Link to="/new-listing">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('nav.post')}
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
                    <DropdownMenuLabel>{t('nav.profile')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">{t('nav.profile')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-listings">{t('nav.listings')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites">{t('nav.favorites')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/messages">{t('nav.messages')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={toggleAuth}>
                      {t('nav.signout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={toggleAuth} variant="ghost">
                {t('nav.signin')}
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
                    <Link to="/browse" className="text-lg font-medium">{t('nav.browse')}</Link>
                    <Link to="/categories" className="text-lg font-medium">{t('browse.categories')}</Link>
                    <Link to="/new-listing" className="text-lg font-medium">{t('nav.post')}</Link>
                    {isAuthenticated ? (
                      <>
                        <Link to="/profile" className="text-lg font-medium">{t('nav.profile')}</Link>
                        <Link to="/my-listings" className="text-lg font-medium">{t('nav.listings')}</Link>
                        <Link to="/favorites" className="text-lg font-medium">{t('nav.favorites')}</Link>
                        <Link to="/messages" className="text-lg font-medium">{t('nav.messages')}</Link>
                        <Button variant="outline" onClick={toggleAuth}>{t('nav.signout')}</Button>
                      </>
                    ) : (
                      <Button onClick={toggleAuth}>{t('nav.signin')}</Button>
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
