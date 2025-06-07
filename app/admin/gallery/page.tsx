"use client"

import { useState } from "react"
import AdminLayout from "@/components/AdminLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import GalleryModal from "@/components/admin/GalleryModal"

// Mock data - replace with Supabase data
const mockGalleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Modern office installation",
    alt: "Vending machine in modern office lobby",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    caption: "University campus deployment",
    alt: "Multiple vending machines on university campus",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Hospital healthy options",
    alt: "Healthy vending machine in hospital corridor",
  },
]

export default function AdminGalleryPage() {
  const [images, setImages] = useState(mockGalleryImages)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDeleteImage = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((img) => img.id !== id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gallery</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-square relative group">
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteImage(image.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm font-medium">{image.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <GalleryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(imageData) => {
            setImages([...images, { ...imageData, id: Date.now() }])
            setIsModalOpen(false)
          }}
        />
      </div>
    </AdminLayout>
  )
}
