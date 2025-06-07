"use client"

import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, MessageSquare, FileText, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0)
  const [productRequestsCount, setProductRequestsCount] = useState(0)
  const [updatesCount, setUpdatesCount] = useState(0)
  const [contactRequestsCount, setContactRequestsCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products count
        const { data: products, error: productsError } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })

        if (productsError) {
          console.error("Error fetching products:", productsError)
        } else {
          setProductCount(products?.length || 0)
        }

        // Fetch product_requests count
        const { data: productRequests, error: productRequestsError } = await supabase
          .from("product_requests")
          .select("*", { count: "exact", head: true })

        if (productRequestsError) {
          console.error("Error fetching product requests:", productRequestsError)
        } else {
          setProductRequestsCount(productRequests?.length || 0)
        }

        // Fetch updates count
        const { data: updates, error: updatesError } = await supabase
          .from("updates")
          .select("*", { count: "exact", head: true })

        if (updatesError) {
          console.error("Error fetching updates:", updatesError)
        } else {
          setUpdatesCount(updates?.length || 0)
        }

        // Fetch contact_requests count
        const { data: contactRequests, error: contactRequestsError } = await supabase
          .from("contact_requests")
          .select("*", { count: "exact", head: true })

        if (contactRequestsError) {
          console.error("Error fetching contact requests:", contactRequestsError)
        } else {
          setContactRequestsCount(contactRequests?.length || 0)
        }
      } catch (error) {
        console.error("An error occurred:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productCount}</div>
              <p className="text-xs text-muted-foreground">Active products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Product Requests</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productRequestsCount}</div>
              <p className="text-xs text-muted-foreground">Pending requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Updates Posted</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{updatesCount}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Requests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactRequestsCount}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">New product request from ABC Corp</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Contact form submitted</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">New gallery image uploaded</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  Add New Product
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Create Update Post
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Upload Gallery Image
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  View Contact Requests
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
