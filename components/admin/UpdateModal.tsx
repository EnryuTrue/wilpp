"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Update {
  id?: number
  title: string
  thumbnail: string
  excerpt: string
  content: string
  date: string
  published: boolean
}

interface UpdateModalProps {
  update: Update | null
  isOpen: boolean
  onClose: () => void
  onSave: (update: Omit<Update, "id">) => void
}

export default function UpdateModal({ update, isOpen, onClose, onSave }: UpdateModalProps) {
  const [formData, setFormData] = useState<Omit<Update, "id">>({
    title: "",
    thumbnail: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    published: false,
  })

  useEffect(() => {
    if (update) {
      setFormData({
        title: update.title,
        thumbnail: update.thumbnail,
        excerpt: update.excerpt,
        content: update.content,
        date: update.date,
        published: update.published,
      })
    } else {
      setFormData({
        title: "",
        thumbnail: "",
        excerpt: "",
        content: "",
        date: new Date().toISOString().split("T")[0],
        published: false,
      })
    }
  }, [update])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{update ? "Edit Update" : "Add New Update"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
              Thumbnail URL
            </label>
            <Input
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="/placeholder.svg?height=200&width=300"
              required
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
              Excerpt
            </label>
            <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} required />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Full Content
            </label>
            <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={8} required />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Date
            </label>
            <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked as boolean }))}
            />
            <label htmlFor="published" className="text-sm font-medium">
              Publish immediately
            </label>
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {update ? "Update" : "Create"} Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
