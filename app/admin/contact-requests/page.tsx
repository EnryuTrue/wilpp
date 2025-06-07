"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ContactRequest {
  id: number
  name: string
  email: string
  location: string
  message: string
  status: string
  created_at: string
}

export default function AdminContactRequestsPage() {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContactRequests()
  }, [])

  const fetchContactRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setContactRequests(data || [])
    } catch (error) {
      console.error("Error fetching contact requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase.from("contact_requests").update({ status: newStatus }).eq("id", id)

      if (error) throw error

      setContactRequests((prev) =>
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
          <h1 className="text-3xl font-bold">Contact Requests</h1>
          <p>Loading contact requests...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Contact Requests</h1>

        {contactRequests.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No contact requests found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {contactRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{request.name}</CardTitle>
                    <Badge
                      variant={
                        request.status === "new" ? "default" : request.status === "contacted" ? "secondary" : "outline"
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
                      <MapPin className="h-4 w-4" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(request.created_at).toLocaleDateString()}</span>
                    </div>
                    {request.message && <p className="text-gray-700 mt-3">{request.message}</p>}
                    <div className="flex space-x-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => window.open(`mailto:${request.email}`, "_blank")}
                      >
                        Reply
                      </Button>
                      {request.status === "new" && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(request.id, "contacted")}>
                          Mark as Contacted
                        </Button>
                      )}
                      {request.status === "contacted" && (
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
