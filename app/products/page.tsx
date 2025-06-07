"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProductRequestModal from "@/components/ProductRequestModal"
import { supabase } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  description: string
  image_url: string
  price: number
  available: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: true })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  // Sample snack products available in vending machines
  const snackProducts = [
    {
      name: "Miss Vickie's Smokehouse BBQ",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-41-11%20Hippo%20Vending%20Premium%20Snacks%20Healthy%20Options%20%26%20Custom%20Solutions%20Hippo%20Vending-sCxtTQUU27ghipJgwcSU2YTewdhoaL.png",
      category: "Classic Chips",
    },
    {
      name: "Quest Protein Chips - Ranch",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-41-05%20Hippo%20Vending%20Premium%20Snacks%20Healthy%20Options%20%26%20Custom%20Solutions%20Hippo%20Vending-BGpB4k0tlzaufFseF9MYgKsiacGBOd.png",
      category: "Healthy Options",
    },
    {
      name: "Quest Protein Chips - Nacho Cheese",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-40-58%20Hippo%20Vending%20Premium%20Snacks%20Healthy%20Options%20%26%20Custom%20Solutions%20Hippo%20Vending-pjg10BfjwdFv4BDhZxUBnDwkhK4v6S.png",
      category: "Healthy Options",
    },
    {
      name: "Cheetos Flamin' Hot Crunchy",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-41-21%20Hippo%20Vending%20Premium%20Snacks%20Healthy%20Options%20%26%20Custom%20Solutions%20Hippo%20Vending-Fx2K8UgztqAuXxzlyG5U9wGHpctdVz.png",
      category: "Best Sellers",
    },
    {
      name: "Sun Chips French Onion",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-41-17%20Hippo%20Vending%20Premium%20Snacks%20Healthy%20Options%20%26%20Custom%20Solutions%20Hippo%20Vending-BCiVsKq1zHcd01pq4ke38oG0Rgjj5r.png",
      category: "Classic Chips",
    },
    {
      name: "Quest Protein Chips - Loaded Taco",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-40-49%20Hippo%20Vending%20Premium%20Snacks%20Healthy%20Options%20%26%20Custom%20Solutions%20Hippo%20Vending-ekIAPVN2EAF0gFqlZDO4i2lZ1zpuvk.png",
      category: "Healthy Options",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
          <p className="text-xl text-gray-600 text-center mb-12">Choose from our range of modern vending solutions</p>

          {/* Vending Machine Products */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="aspect-video relative">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <Badge variant={product.available ? "default" : "secondary"}>
                      {product.available ? "Available" : "Coming Soon"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">${product.price}</span>
                    <Button
                      onClick={() => handleRequestProduct(product)}
                      disabled={!product.available}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Request Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Snack Products Section */}
          <div className="border-t pt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Snacks & Beverages</h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Our vending machines are stocked with popular snacks and beverages, customized to meet the needs of your
              location.
            </p>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {snackProducts.map((snack, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-lg shadow-md p-4 mb-3">
                    <img
                      src={snack.image || "/placeholder.svg"}
                      alt={snack.name}
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{snack.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {snack.category}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Need a free brand-new vending machine or smart cooler at your location?
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">Contact Hippo Vending Today!</Button>
            </div>
          </div>
        </div>
      </div>

      <ProductRequestModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <Footer />
    </div>
  )
}
