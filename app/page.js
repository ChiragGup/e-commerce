import Header from "../components/header"
import ProductGrid from "../components/product-grid"
import Footer from "../components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to ShopHub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Shop the latest trends and find everything you need.
          </p>
        </div>
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}
