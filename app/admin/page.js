"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { BarChart3, Package, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"
import AdminLayout from "../../components/admin-layout"

export default function AdminDashboard() {
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

  // Mock data - in real app, this would come from your API
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Orders",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Products",
      value: "567",
      change: "+2.1%",
      trend: "up",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Customers",
      value: "8,901",
      change: "-1.2%",
      trend: "down",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentOrders = [
    { id: "#1234", customer: "John Doe", amount: "$89.99", status: "Completed", date: "2024-01-15" },
    { id: "#1235", customer: "Jane Smith", amount: "$156.50", status: "Processing", date: "2024-01-15" },
    { id: "#1236", customer: "Bob Johnson", amount: "$45.00", status: "Shipped", date: "2024-01-14" },
    { id: "#1237", customer: "Alice Brown", amount: "$234.99", status: "Pending", date: "2024-01-14" },
  ]

  const topProducts = [
    { name: "Wireless Bluetooth Headphones", sales: 145, revenue: "$11,605" },
    { name: "Smart Fitness Watch", sales: 89, revenue: "$17,801" },
    { name: "Premium Cotton T-Shirt", sales: 234, revenue: "$5,847" },
    { name: "Organic Coffee Beans", sales: 167, revenue: "$3,171" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ml-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <Button variant="outline" size="sm" onClick={() => router.push("/admin/orders")}>
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Products */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Top Products</h2>
              <Button variant="outline" size="sm" onClick={() => router.push("/admin/products")}>
                Manage Products
              </Button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2" onClick={() => router.push("/admin/products/new")}>
              <Package className="h-6 w-6" />
              Add New Product
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-transparent"
              onClick={() => router.push("/admin/orders")}
            >
              <ShoppingCart className="h-6 w-6" />
              View Orders
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-transparent"
              onClick={() => router.push("/admin/analytics")}
            >
              <BarChart3 className="h-6 w-6" />
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
