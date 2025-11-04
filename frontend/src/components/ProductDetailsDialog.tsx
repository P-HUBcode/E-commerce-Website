import { Star, Truck, Shield, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Product } from "../types";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductDetailsDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetailsDialog({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailsDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            View product details and add to cart
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">({product.rating}) 128 reviews</span>
            </div>
            
            <div className="mb-4">
              <span className="text-3xl">${product.price}</span>
              {product.inStock ? (
                <Badge className="ml-3">In Stock</Badge>
              ) : (
                <Badge variant="secondary" className="ml-3">Out of Stock</Badge>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <Button
              size="lg"
              className="w-full mb-6"
              disabled={!product.inStock}
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
            >
              Add to Cart
            </Button>
            
            <Separator className="mb-6" />
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p>Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p>2 Year Warranty</p>
                  <p className="text-sm text-gray-600">Full coverage included</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <RefreshCw className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p>30 Day Returns</p>
                  <p className="text-sm text-gray-600">Easy returns policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
