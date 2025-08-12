"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Search, Eye, Download } from "lucide-react"
import { useAuth } from "../../../contexts/auth-context"
import AdminLayout from "../../../components/admin-layout"

export default function AdminOrders() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (!isAdmin()) {
      router.push("/")
      return
    }

    // Mock orders data - in real app, this would come from your API
    setOrders([
      {
        id: "#1234",
        customer: "John Doe",
        email: "john@example.com",
        amount: 89.99,
        status: "completed",
        date: "2024-01-15",
        items: 2,
      },
      {
        id: "#1235",
        customer: "Jane Smith",
        email: "jane@example.com",
        amount: 156.5,
        status: "processing",
        date: "2024-01-15",
        items: 3,
      },
      {
        id: "#1236",
        customer: "Bob Johnson",
        email: "bob@example.com",
        amount: 45.0,
        status: "shipped",
        date: "2024-01-14",
        items: 1,
      },
      {
        id: "#1237",
        customer: "Alice Brown",
        email: "alice@example.com",
        amount: 234.99,
        status: "pending",
        date: "2024-01-14",
        items: 4,
      },
      {
        id: "#1238",
        customer: "Charlie Wilson",
        email: "charlie@example.com",
        amount: 67.5,
        status: "cancelled",
        date: "2024-01-13",
        items: 2,
      },
    ])
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin()) {
    return null
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
      processing: { bg: "bg-blue-100", text: "text-blue-800", label: "Processing" },
      shipped: { bg: "bg-purple-100", text: "text-purple-800", label: "Shipped" },
      completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
      cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
    }

    const config = statusConfig[status] || statusConfig.pending
    return <Badge className={`${config.bg} ${config.text}`}>{config.label}</Badge>
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">Manage customer orders and fulfillment</p>
          </div>
          <Button variant="outline" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Order ID</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Items</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="font-medium text-blue-600">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-900">{order.date}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-900">{order.items} items</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium">{formatCurrency(order.amount)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  )
}
