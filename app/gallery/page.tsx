"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase"

interface GalleryImage {
  id: number
  image_url: string
  caption: string
  alt_text: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error("Error fetching gallery images:", error)
    } finally {
      setLoading(false)
    }
  }

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>Loading gallery...</p>
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
          <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            See our vending machines in action across various locations
          </p>

          {images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No gallery images available at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="group cursor-pointer" onClick={() => openModal(image)}>
                  <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-md group-hover:shadow-xl transition-shadow">
                    <img
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.alt_text}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-3 text-center text-gray-700 font-medium">{image.caption}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img
              src={selectedImage.image_url || "/placeholder.svg"}
              alt={selectedImage.alt_text}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <p className="text-center">{selectedImage.caption}</p>
            </div>
            <button onClick={closeModal} className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300">
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
