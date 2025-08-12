"use client"

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "../contexts/cart-context"

export default function ProductCard({ product }) {
  const { id, name, price, originalPrice, image, rating, reviews, category, inStock } = product
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (inStock) {
      addItem(product)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
        {originalPrice && <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>}
        {!inStock && <Badge className="absolute top-2 right-2 bg-gray-500">Out of Stock</Badge>}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">{renderStars(rating)}</div>
          <span className="text-sm text-gray-600">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          {originalPrice && <span className="text-sm text-gray-500 line-through">${originalPrice}</span>}
        </div>

        <Button
          className="w-full"
          disabled={!inStock}
          variant={inStock ? "default" : "secondary"}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  )
}
