"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "../../../components/ui/card"
import { TrendingUp, Users, ShoppingCart, DollarSign, Package } from "lucide-react"
import { useAuth } from "../../../contexts/auth-context"
import AdminLayout from "../../../components/admin-layout"

export default function AdminAnalytics() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (!isAdmin()) {
      router.push("/")
      return
    }
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin()) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your store's performance and insights</p>
        </div>

        {/* Coming Soon */}
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Detailed analytics and reporting features are coming soon. Track sales, customer behavior, and business
              insights.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Revenue Tracking
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customer Analytics
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Sales Reports
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Product Performance
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
