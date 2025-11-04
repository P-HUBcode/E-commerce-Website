import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { ProductDetailsDialog } from "./components/ProductDetailsDialog";
import { Filters } from "./components/Filters";
import { Product, CartItem } from "./types";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality noise-cancelling headphones with superior sound quality and comfort",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2MjAzNjQ3MHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Audio",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "2",
    name: "Luxury Smartwatch",
    description: "Elegant smartwatch with fitness tracking and premium design",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjIxMDExOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Wearables",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360-degree sound and long battery life",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1674303324806-7018a739ed11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMHNwZWFrZXJ8ZW58MXx8fHwxNzYyMTAzODM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Audio",
    rating: 4.3,
    inStock: true,
  },
  {
    id: "4",
    name: "Professional DSLR Camera",
    description: "High-resolution camera perfect for photography enthusiasts",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjIwODk1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Cameras",
    rating: 4.9,
    inStock: false,
  },
  {
    id: "5",
    name: "MacBook Pro 14-inch",
    description: "Powerful laptop with M3 chip, perfect for professionals",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjIwNDkzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Computers",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "6",
    name: "Latest Smartphone",
    description: "Flagship phone with amazing camera and performance",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1732998369893-af4c9a4695fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc2MjA2NTg1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Phones",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "7",
    name: "Designer Sunglasses",
    description: "Stylish UV protection sunglasses with premium frames",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1663585703603-9be01a72a62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjIxMzY0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Accessories",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "8",
    name: "Performance Running Shoes",
    description: "Lightweight running shoes with maximum comfort and support",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1597892657493-6847b9640bac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzYyMTI5Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Fashion",
    rating: 4.7,
    inStock: true,
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const categories = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.category)));
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategories, priceRange]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success("Quantity updated in cart");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success("Added to cart");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
      />

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Filters
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          <main>
            <div className="mb-6">
              <h2 className="text-3xl mb-2">Our Products</h2>
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {PRODUCTS.length} products
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onProductClick={setSelectedProduct}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-2">No products found</p>
                <p className="text-sm text-gray-400">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <ProductDetailsDialog
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}
