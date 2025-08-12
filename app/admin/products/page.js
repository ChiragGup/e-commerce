"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import { useAuth } from "../../../contexts/auth-context"
import AdminLayout from "../../../components/admin-layout"

export default function AdminProducts() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (!isAdmin()) {
      router.push("/")
      return
    }

    // Mock products data - in real app, this would come from your API
    setProducts([
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        stock: 45,
        category: "Electronics",
        status: "active",
        image: "/placeholder-ikzb4.png",
      },
      {
        id: 2,
        name: "Premium Cotton T-Shirt",
        price: 24.99,
        stock: 120,
        category: "Clothing",
        status: "active",
        image: "/premium-cotton-tshirt.png",
      },
      {
        id: 3,
        name: "Smart Fitness Watch",
        price: 199.99,
        stock: 8,
        category: "Electronics",
        status: "low_stock",
        image: "/smart-fitness-watch.png",
      },
      {
        id: 4,
        name: "Leather Crossbody Bag",
        price: 89.99,
        stock: 0,
        category: "Accessories",
        status: "out_of_stock",
        image: "/leather-crossbody-bag.png",
      },
    ])
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin()) {
    return null
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status, stock) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
    }
    if (status === "low_stock" || stock < 10) {
      return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
  }

  const handleDeleteProduct = (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <Button onClick={() => router.push("/admin/products/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Status</option>
                <option value="active">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Products Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Product</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Price</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Stock</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium">${product.price}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium">{product.stock}</span>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(product.status, product.stock)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  )
}
