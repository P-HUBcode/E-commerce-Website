import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Product } from "../types";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
      <div onClick={() => onProductClick(product)}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="line-clamp-2">{product.name}</h3>
            {!product.inStock && (
              <Badge variant="secondary" className="shrink-0">Out of Stock</Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl">${product.price}</span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={!product.inStock}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
