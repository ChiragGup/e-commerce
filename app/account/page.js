"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { ArrowLeft, User, Settings, Package, Heart, LogOut } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"

export default function AccountPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="font-semibold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  )
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              {activeTab === "profile" && <ProfileTab user={user} />}
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "wishlist" && <WishlistTab />}
              {activeTab === "settings" && <SettingsTab />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileTab({ user }) {
  const { updateProfile, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateProfile(formData)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  )
}

function OrdersTab() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Order History</h2>
      <div className="text-center py-8">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No orders yet</p>
        <p className="text-sm text-gray-400 mb-4">When you make a purchase, your orders will appear here.</p>
        <Button>Start Shopping</Button>
      </div>
    </div>
  )
}

function WishlistTab() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Wishlist</h2>
      <div className="text-center py-8">
        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Your wishlist is empty</p>
        <p className="text-sm text-gray-400 mb-4">Save items you love for later.</p>
        <Button>Browse Products</Button>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-medium mb-2">Email Notifications</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              Order updates
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              Promotional emails
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Newsletter
            </label>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="font-medium mb-2">Privacy</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              Make profile public
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Allow data collection for analytics
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
          <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
