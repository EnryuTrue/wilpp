"use client"

import { useState } from "react"
import AdminLayout from "@/components/AdminLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar } from "lucide-react"
import UpdateModal from "@/components/admin/UpdateModal"

// Mock data - replace with Supabase data
const mockUpdates = [
  {
    id: 1,
    title: "New Healthy Options Machine Launched",
    thumbnail: "/placeholder.svg?height=200&width=300",
    excerpt:
      "We're excited to announce our new healthy vending machine featuring organic snacks, fresh salads, and nutritious beverages.",
    content: "Full content here...",
    date: "2024-01-15",
    published: true,
  },
  {
    id: 2,
    title: "Partnership with Local Universities",
    thumbnail: "/placeholder.svg?height=200&width=300",
    excerpt:
      "Hippo Vending has partnered with three major universities to provide smart vending solutions across campus locations.",
    content: "Full content here...",
    date: "2024-01-10",
    published: true,
  },
]

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState(mockUpdates)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUpdate, setEditingUpdate] = useState<(typeof mockUpdates)[0] | null>(null)

  const handleAddUpdate = () => {
    setEditingUpdate(null)
    setIsModalOpen(true)
  }

  const handleEditUpdate = (update: (typeof mockUpdates)[0]) => {
    setEditingUpdate(update)
    setIsModalOpen(true)
  }

  const handleDeleteUpdate = (id: number) => {
    if (confirm("Are you sure you want to delete this update?")) {
      setUpdates(updates.filter((u) => u.id !== id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Updates</h1>
          <Button onClick={handleAddUpdate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Update
          </Button>
        </div>

        <div className="space-y-4">
          {updates.map((update) => (
            <Card key={update.id}>
              <div className="md:flex">
                <div className="md:w-1/4">
                  <img
                    src={update.thumbnail || "/placeholder.svg"}
                    alt={update.title}
                    className="w-full h-48 md:h-full object-cover rounded-l-lg"
                  />
                </div>
                <div className="md:w-3/4">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{update.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={update.published ? "default" : "secondary"}>
                          {update.published ? "Published" : "Draft"}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => handleEditUpdate(update)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteUpdate(update.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(update.date).toLocaleDateString()}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{update.excerpt}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <UpdateModal
          update={editingUpdate}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(update) => {
            if (editingUpdate) {
              setUpdates(updates.map((u) => (u.id === editingUpdate.id ? { ...update, id: editingUpdate.id } : u)))
            } else {
              setUpdates([...updates, { ...update, id: Date.now() }])
            }
            setIsModalOpen(false)
          }}
        />
      </div>
    </AdminLayout>
  )
}
