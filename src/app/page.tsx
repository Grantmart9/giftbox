"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GiftBox3D from "@/components/GiftBox3D";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                GiftBox Studio
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Create the perfect personalized gift box with our interactive 3D
                builder. Design, customize, and delight with every box.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/build">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
                  >
                    Start Building Your Box
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* 3D Box Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-96 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-2xl overflow-hidden">
                <GiftBox3D
                  color="#ff6b9d"
                  ribbonColor="#ffd700"
                  size="medium"
                  bowStyle="classic"
                  isAnimating={true}
                  showItems={true}
                />
                <div className="absolute bottom-4 left-4 text-white/80 text-sm font-medium bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2">
                  🎮 Interactive 3D Preview - Drag to explore!
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose GiftBox Studio?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of gift-giving with our innovative 3D
              customization platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Interactive 3D Builder",
                description:
                  "Design your box in real-time with our advanced 3D visualization tool.",
                icon: "🎨",
              },
              {
                title: "Customizable Bows",
                description:
                  "Choose from 5 unique bow styles - from classic to luxury designs.",
                icon: "🎀",
              },
              {
                title: "Premium Items",
                description:
                  "Choose from a curated selection of high-quality gifts and accessories.",
                icon: "💎",
              },
              {
                title: "Personal Touch",
                description:
                  "Add custom messages and create truly unique presents for your loved ones.",
                icon: "💝",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-white/60 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-2xl text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center text-lg">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Create Magic?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of happy customers who have discovered the joy of
              personalized gift-giving.
            </p>
            <Link href="/build">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg font-semibold"
              >
                Build Your First Box
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
