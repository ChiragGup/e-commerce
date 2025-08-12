import { Card } from "./ui/card"
import { Badge } from "./ui/badge"

export default function OrderSummary({ items, total }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const subtotal = total
  const shipping = subtotal >= 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const finalTotal = subtotal + shipping + tax

  return (
    <Card className="p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {/* Items */}
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Qty: {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-2">
            Shipping
            {shipping === 0 && <Badge className="text-xs bg-green-100 text-green-800">Free</Badge>}
          </span>
          <span>{formatPrice(shipping)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="border-t pt-2 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium">🎉 You qualify for free shipping!</p>
        </div>
      )}
    </Card>
  )
}
