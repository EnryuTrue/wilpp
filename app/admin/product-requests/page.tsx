"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Calendar, Package } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ProductRequest {
  id: number
  name: string
  email: string
  company: string
  location: string
  product_id: number
  message: string
  status: string
  created_at: string
  products?: {
    name: string
  }
}

export default function AdminProductRequestsPage() {
  const [productRequests, setProductRequests] = useState<ProductRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProductRequests()
  }, [])

  const fetchProductRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("product_requests")
        .select(`
          *,
          products (
            name
          )
        `)
        .order("created_at", { ascending: false })

      if (error) throw error
      setProductRequests(data || [])
    } catch (error) {
      console.error("Error fetching product requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase.from("product_requests").update({ status: newStatus }).eq("id", id)

      if (error) throw error

      setProductRequests((prev) =>
        prev.map((request) => (request.id === id ? { ...request, status: newStatus } : request)),
      )
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Product Requests</h1>
          <p>Loading product requests...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Product Requests</h1>

        {productRequests.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No product requests found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {productRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{request.name}</CardTitle>
                    <Badge
                      variant={
                        request.status === "pending" ? "default" : request.status === "quoted" ? "secondary" : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{request.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Package className="h-4 w-4" />
                      <span>{request.products?.name || "Unknown Product"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(request.created_at).toLocaleDateString()}</span>
                    </div>
                    {request.company && <p className="text-sm text-gray-600">Company: {request.company}</p>}
                    {request.message && <p className="text-gray-700 mt-3">{request.message}</p>}
                    <div className="flex space-x-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => window.open(`mailto:${request.email}`, "_blank")}
                      >
                        Send Quote
                      </Button>
                      {request.status === "pending" && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(request.id, "quoted")}>
                          Mark as Quoted
                        </Button>
                      )}
                      {request.status === "quoted" && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(request.id, "completed")}>
                          Mark as Completed
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
