import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutGrid, 
  X,
  ChevronDown,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { products, categories } from '@/data/products';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by rating
    if (selectedRating) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    // Filter by sale
    if (searchParams.get('sale') === 'true') {
      filtered = filtered.filter((p) => p.badge === 'sale');
    }

    // Filter by new
    if (searchParams.get('filter') === 'new') {
      filtered = filtered.filter((p) => p.badge === 'new');
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        // Already sorted by newest in mock data
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [selectedCategories, priceRange, selectedRating, sortBy, searchParams]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 2500]);
    setSelectedRating(null);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 2500 || selectedRating !== null;

  return (
    <div className="min-h-screen pt-36 md:pt-40">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
            All Products
          </h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-40 space-y-6">
              {/* Categories */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {category.icon} {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={2500}
                  step={50}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                      className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors ${
                        selectedRating === rating ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">& Up</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                className="lg:hidden gap-2"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>

              {/* Sort Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Sort by:</span>
                  <span className="font-medium">
                    {sortOptions.find((o) => o.value === sortBy)?.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </Button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 glass rounded-xl shadow-elevated py-2 z-20"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            sortBy === option.value
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-secondary'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Grid Toggle */}
              <div className="hidden md:flex items-center gap-2 p-1 rounded-lg bg-secondary">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-md transition-colors ${
                    gridCols === 3 ? 'bg-card shadow-soft' : 'hover:bg-card/50'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-md transition-colors ${
                    gridCols === 4 ? 'bg-card shadow-soft' : 'hover:bg-card/50'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {selectedCategories.map((catId) => {
                  const cat = categories.find((c) => c.id === catId);
                  return (
                    <span
                      key={catId}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {cat?.name}
                      <button onClick={() => toggleCategory(catId)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
                {(priceRange[0] > 0 || priceRange[1] < 2500) && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    ${priceRange[0]} - ${priceRange[1]}
                    <button onClick={() => setPriceRange([0, 2500])}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </motion.div>
            )}

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              gridCols === 3 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 h-full w-80 bg-card shadow-elevated z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Filter content same as desktop */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Categories</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <Checkbox
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => toggleCategory(category.id)}
                          />
                          <span className="text-sm">
                            {category.icon} {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Price Range</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={2500}
                      step={50}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button
                    className="w-full btn-gradient"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
