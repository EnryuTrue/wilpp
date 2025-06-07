"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Update {
  id: number
  title: string
  excerpt: string
  content: string
  thumbnail_url: string
  published: boolean
  created_at: string
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null)

  useEffect(() => {
    fetchUpdates()
  }, [])

  const fetchUpdates = async () => {
    try {
      const { data, error } = await supabase
        .from("updates")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (error) throw error
      setUpdates(data || [])
    } catch (error) {
      console.error("Error fetching updates:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReadMore = (update: Update) => {
    setSelectedUpdate(update)
  }

  const handleCloseModal = () => {
    setSelectedUpdate(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>Loading updates...</p>
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Latest Updates</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Stay informed about our latest news, product launches, and company updates
          </p>

          {updates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No updates available at this time.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {updates.map((update) => (
                <Card key={update.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={update.thumbnail_url || "/placeholder.svg?height=200&width=300"}
                        alt={update.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(update.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <CardTitle className="text-2xl">{update.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{update.excerpt}</p>
                        <Button
                          variant="outline"
                          onClick={() => handleReadMore(update)}
                          className="hover:bg-orange-50 hover:border-orange-600"
                        >
                          Read More
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for full content */}
      {selectedUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedUpdate.title}</h2>
                <Button variant="ghost" onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  ✕
                </Button>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(selectedUpdate.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <img
                src={selectedUpdate.thumbnail_url || "/placeholder.svg?height=300&width=600"}
                alt={selectedUpdate.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedUpdate.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
