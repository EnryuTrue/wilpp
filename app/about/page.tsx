import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Target, Heart, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About Hippo Vending</h1>

          {/* Sandra's Story */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Meet Sandra Lovstad</h2>
              <p className="text-lg text-orange-600 mb-4">Owner of Hippo Vending</p>
            </div>

            <div className="prose prose-lg mx-auto mb-8">
              <p className="text-gray-700 mb-6">
                Sandra Lovstad MSGF, quickly became enamored with the town's unique Hippo mythology. She enjoys
                capturing photos of the various Hippo statues throughout the community and even got her own Hippo statue
                at the annual local fair.
              </p>
              <p className="text-gray-700 mb-6">
                In early 2024, Sandra embarked on her next business venture, founding Hippo Vending. With a mission to
                provide quality vending solutions, she aims to serve Austin, Hutto, Round Rock, Georgetown, Taylor, and
                surrounding areas. Hippo Vending offers free vending machines to businesses and provides ongoing
                servicing for them as well.
              </p>
            </div>

            <div className="text-center mb-8">
              <p className="text-xl font-semibold text-orange-600 mb-4">"What's more hip than a Hippo?"</p>
              <p className="text-gray-600">- Hippo Vending's business slogan</p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Our Mission</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-700 text-lg leading-relaxed">
                At Hippo Vending, our mission is to provide convenient, high-quality vending solutions that enhance the
                everyday lives of our community. We are committed to exceptional customer service, sustainability, and
                supporting local businesses, all while embracing the vibrant spirit of the community. Through innovation
                and a passion for our community, we aim to make the vending experience accessible and enjoyable for
                everyone.
              </p>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Service Areas</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-lg">Austin</h3>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-lg">Hutto</h3>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-lg">Round Rock</h3>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-lg">Georgetown</h3>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-lg">Taylor</h3>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-lg">Surrounding Areas</h3>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Quality Solutions</h3>
              <p className="text-gray-600">
                Providing high-quality vending machines and exceptional service to enhance your business environment.
              </p>
            </div>

            <div className="text-center">
              <Heart className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Community Focused</h3>
              <p className="text-gray-600">
                Supporting local businesses while embracing the vibrant spirit and unique hippo mythology of our
                community.
              </p>
            </div>

            <div className="text-center">
              <Lightbulb className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving our vending solutions through innovation and a passion for exceptional customer
                service.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
