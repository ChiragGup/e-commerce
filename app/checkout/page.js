"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react"
import { useCart } from "../../contexts/cart-context"
import CheckoutForm from "../../components/checkout-form"
import OrderSummary from "../../components/order-summary"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getCartTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  const handleOrderSubmit = async (formData) => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and show success
    clearCart()
    setOrderComplete(true)
    setIsProcessing(false)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          <div className="space-y-2">
            <Button className="w-full" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/orders")}>
              View Orders
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-green-600" />
            Secure Checkout
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="h-4 w-4 text-blue-600" />
            Free Shipping Over $50
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4 text-purple-600" />
            Multiple Payment Options
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleOrderSubmit} isProcessing={isProcessing} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary items={items} total={getCartTotal()} />
          </div>
        </div>
      </div>
    </div>
  )
}
