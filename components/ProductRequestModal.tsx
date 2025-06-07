"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  price: number
}

interface ProductRequestModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductRequestModal({ product, isOpen, onClose }: ProductRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("product_requests").insert([
        {
          ...formData,
          product_id: product?.id,
        },
      ])

      if (error) throw error

      alert("Request submitted successfully! We'll contact you soon.")
      setFormData({ name: "", email: "", company: "", location: "", message: "" })
      onClose()
    } catch (error) {
      console.error("Error submitting request:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Quote: {product?.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company
            </label>
            <Input id="company" name="company" value={formData.company} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Installation Location
            </label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Additional Requirements
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Any specific requirements or questions..."
            />
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              style={{ backgroundColor: isSubmitting ? "orange" : "", color: isSubmitting ? "white" : "" }}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
