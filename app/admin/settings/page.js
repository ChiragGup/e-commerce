"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "../../../components/ui/card"
import { Settings } from "lucide-react"
import { useAuth } from "../../../contexts/auth-context"
import AdminLayout from "../../../components/admin-layout"

export default function AdminSettings() {
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
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your store settings and preferences</p>
        </div>

        {/* Coming Soon */}
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Store Settings</h2>
            <p className="text-gray-600">
              Store configuration and settings panel is coming soon. Manage store details, payment methods, shipping
              options, and more.
            </p>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
