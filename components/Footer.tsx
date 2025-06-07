import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hippo Vending</h3>
            <p className="text-gray-400">Smart vending solutions for modern businesses.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/products" className="block text-gray-400 hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/gallery" className="block text-gray-400 hover:text-white transition-colors">
                Gallery
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              <p className="text-gray-400">Machine Installation</p>
              <p className="text-gray-400">Maintenance & Support</p>
              <p className="text-gray-400">Custom Solutions</p>
              <p className="text-gray-400">24/7 Monitoring</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-400">Info@Hippovending.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-400">Hutto & Greater Austin Area</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Service Hours</h4>
            <div className="space-y-1 text-gray-400 text-sm">
              <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:30 AM - 4:00 PM</p>
              <p>Sunday: On-Demand</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Hippo Vending. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
