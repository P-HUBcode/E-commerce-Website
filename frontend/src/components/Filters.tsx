import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";

interface FiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export function Filters({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
}: FiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear all
        </Button>
      </div>
      
      <div>
        <h4 className="mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onCategoryChange(category)}
              />
              <Label
                htmlFor={category}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="mb-3">Price Range</h4>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            max={2000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
