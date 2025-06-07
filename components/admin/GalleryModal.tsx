"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface GalleryImage {
  src: string
  caption: string
  alt: string
}

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (imageData: GalleryImage) => void
}

export default function GalleryModal({ isOpen, onClose, onSave }: GalleryModalProps) {
  const [formData, setFormData] = useState<GalleryImage>({
    src: "",
    caption: "",
    alt: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setFormData({ src: "", caption: "", alt: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload New Image</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="src" className="block text-sm font-medium mb-2">
              Image URL
            </label>
            <Input
              id="src"
              name="src"
              value={formData.src}
              onChange={handleChange}
              placeholder="/placeholder.svg?height=400&width=600"
              required
            />
            <p className="text-xs text-gray-500 mt-1">In production, this would be a file upload component</p>
          </div>

          <div>
            <label htmlFor="caption" className="block text-sm font-medium mb-2">
              Caption
            </label>
            <Input
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              placeholder="Brief description of the image"
              required
            />
          </div>

          <div>
            <label htmlFor="alt" className="block text-sm font-medium mb-2">
              Alt Text
            </label>
            <Textarea
              id="alt"
              name="alt"
              value={formData.alt}
              onChange={handleChange}
              rows={2}
              placeholder="Detailed description for accessibility"
              required
            />
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Upload Image
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
