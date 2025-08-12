"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ShoppingCart, Menu, X, Search, User, LogOut } from "lucide-react"
import { useCart } from "../contexts/cart-context"
import { useAuth } from "../contexts/auth-context"
import CartDrawer from "./cart-drawer"

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { getCartItemCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  const cartItemCount = getCartItemCount()

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => router.push("/")}>
                ShopHub
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Categories
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* User Account */}
              {isAuthenticated ? (
                <div className="relative hidden md:block">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    {user?.firstName}
                  </Button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            router.push("/account")
                            setIsUserMenuOpen(false)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          My Account
                        </button>
                        <button
                          onClick={() => {
                            router.push("/orders")
                            setIsUserMenuOpen(false)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Orders
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => router.push("/login")}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}

              <Button variant="ghost" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white py-4">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <nav className="flex flex-col space-y-2">
                  <a href="#" className="text-gray-700 hover:text-blue-600 py-2">
                    Home
                  </a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 py-2">
                    Products
                  </a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 py-2">
                    Categories
                  </a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 py-2">
                    About
                  </a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 py-2">
                    Contact
                  </a>

                  {isAuthenticated ? (
                    <>
                      <Button
                        variant="outline"
                        className="justify-start bg-transparent"
                        onClick={() => {
                          router.push("/account")
                          setIsMenuOpen(false)
                        }}
                      >
                        <User className="h-4 w-4 mr-2" />
                        My Account
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start bg-transparent text-red-600 border-red-300"
                        onClick={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="justify-start bg-transparent"
                      onClick={() => {
                        router.push("/login")
                        setIsMenuOpen(false)
                      }}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  )}
                </nav>
              </div>
            </div>
          )}
        </div>

        {/* Click outside to close user menu */}
        {isUserMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
