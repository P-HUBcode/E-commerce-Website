import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchChange: (value: string) => void;
}

export function Header({ cartItemCount, onCartClick, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl">TechStore</h1>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm hover:underline">Products</a>
            <a href="#" className="text-sm hover:underline">Categories</a>
            <a href="#" className="text-sm hover:underline">Deals</a>
            <a href="#" className="text-sm hover:underline">About</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 w-64"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
