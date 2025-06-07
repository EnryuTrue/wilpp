import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Clock } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img src="/Hippo-Vending-logo.png" alt="Hippo Vending Logo" className="mx-auto mb-6 h-26 w-52" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Hippo Vending</h1>
          <p className="text-xl md:text-2xl text-orange-600 mb-6">
            Free Vending Solutions in Hutto & Greater Austin Area
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Hippo Vending offers free vending machines and smart coolers to businesses in the greater Austin area. We
            provide in-house servicing for all the vending machines and smart coolers we install. If you're looking for
            a brand-new vending machine or smart cooler at no cost to your business, contact Hippo Vending today at
            Info@Hippovending.com.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
              Get Free Installation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Vending Machine Images */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Vending Machines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-36-35%20Hippo%20Vending%20Free%20Vending%20Solutions%20in%20Hutto%20Round%20Rock%20Georgetown%20Taylor%20and%20Pflugerville.%20Hippo%20Vending-ckLJiMZRDRB8eUgHDWUQmSvVkdlC9e.png"
                alt="Hippo Vending Machine with snacks and beverages"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-36-08%20Hippo%20Vending%20Free%20Vending%20Solutions%20in%20Hutto%20Round%20Rock%20Georgetown%20Taylor%20and%20Pflugerville.%20Hippo%20Vending-IdhXt2OJAbQaAajoEwFHwacJMxBauc.png"
                alt="Hippo Vending smart cooler with drinks"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-35-59%20Hippo%20Vending%20Free%20Vending%20Solutions%20in%20Hutto%20Round%20Rock%20Georgetown%20Taylor%20and%20Pflugerville.%20Hippo%20Vending-SpSsTaVjULBL3egewBuq3gqMTMMkQX.png"
                alt="Hippo Vending Machine with variety of snacks"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-06%20at%2021-36-26%20Hippo%20Vending%20Free%20Vending%20Solutions%20in%20Hutto%20Round%20Rock%20Georgetown%20Taylor%20and%20Pflugerville.%20Hippo%20Vending-pCsSRseF3f3gWpeglDiKkYkolzPdil.png"
                alt="Hippo Vending snack machine"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Hippo Vending?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free Installation</h3>
              <p className="text-gray-600">
                Enjoy hassle-free installation of vending machines at your site without any upfront costs or fees.
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Full Service</h3>
              <p className="text-gray-600">
                Our vending machines are stocked with popular snacks and beverages tailored for your location's needs.
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Support</h3>
              <p className="text-gray-600">Community vending solution serving the Greater Austin area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Info Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Commitment</h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700 mb-6">
              Hippo Vending includes in-house servicing for all vending machines & smart coolers we install. Whether you
              encounter a machine error or have specific snack requests, our dedicated team is ready to address any
              issues promptly and ensure your vending experience runs smoothly. We are committed to keeping your
              machines stocked and fully operational, so you can enjoy hassle-free service every time.
            </p>
            <p className="text-gray-700">
              Our vending machines are filled with a variety of popular snacks and beverages, customized to meet the
              needs of your location. Experience seamless vending machine installation at your location with no upfront
              costs or hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Service Hours */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Service Hours</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Monday - Friday</h3>
              <p className="text-gray-600">9:00 AM - 6:00 PM</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Saturday</h3>
              <p className="text-gray-600">10:30 AM - 4:00 PM</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Sunday</h3>
              <p className="text-gray-600">On-Demand</p>
            </div>
          </div>
          <Link href="/contact">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Contact Us Today</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
