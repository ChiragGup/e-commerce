import ProductCard from "./product-card"

// Mock product data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder-ikzb4.png",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    originalPrice: null,
    image: "/premium-cotton-tshirt.png",
    rating: 4.3,
    reviews: 89,
    category: "Clothing",
    inStock: true,
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "/smart-fitness-watch.png",
    rating: 4.7,
    reviews: 256,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    price: 89.99,
    originalPrice: null,
    image: "/leather-crossbody-bag.png",
    rating: 4.4,
    reviews: 67,
    category: "Accessories",
    inStock: false,
  },
  {
    id: 5,
    name: "Organic Coffee Beans",
    price: 18.99,
    originalPrice: null,
    image: "/organic-coffee-beans.png",
    rating: 4.6,
    reviews: 143,
    category: "Food & Beverage",
    inStock: true,
  },
  {
    id: 6,
    name: "Wireless Phone Charger",
    price: 34.99,
    originalPrice: 44.99,
    image: "/placeholder-zcyuz.png",
    rating: 4.2,
    reviews: 91,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 7,
    name: "Yoga Mat Premium",
    price: 49.99,
    originalPrice: null,
    image: "/premium-yoga-mat.png",
    rating: 4.8,
    reviews: 178,
    category: "Sports & Fitness",
    inStock: true,
  },
  {
    id: 8,
    name: "Stainless Steel Water Bottle",
    price: 22.99,
    originalPrice: 29.99,
    image: "/stainless-steel-bottle.png",
    rating: 4.5,
    reviews: 234,
    category: "Sports & Fitness",
    inStock: true,
  },
]

export default function ProductGrid() {
  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">All Products</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
          Electronics
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
          Clothing
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
          Accessories
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
          Sports & Fitness
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
