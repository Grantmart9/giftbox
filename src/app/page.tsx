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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
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
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-float">
                GiftBox Studio
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Create the perfect personalized gift box with our interactive 3D
                builder. Design, customize, and delight with every box.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/build">
                  <Button
                    size="lg"
                    className="btn-primary px-8 py-4 text-lg animate-pulse-glow"
                  >
                    Start Building Your Box
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="btn-secondary px-8 py-4 text-lg border-white/30 text-gray-200 hover:text-white"
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
              <div className="w-full h-96 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden card-glass">
                <GiftBox3D
                  color="#667eea"
                  ribbonColor="#764ba2"
                  size="medium"
                  bowStyle="luxury"
                  isAnimating={true}
                  showItems={true}
                />
                <div className="absolute bottom-4 left-4 text-white/90 text-sm font-medium bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                  🎮 Interactive 3D Preview - Drag to explore!
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
              Why Choose GiftBox Studio?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                <Card className="h-full card-hover border-0 card-glass">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4 animate-float">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-center text-lg">
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
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="card-glass rounded-3xl p-12 text-white border border-white/20"
            style={{
              background:
                "linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%)",
            }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
              Ready to Create Magic?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Join thousands of happy customers who have discovered the joy of
              personalized gift-giving.
            </p>
            <Link href="/build">
              <Button
                size="lg"
                variant="secondary"
                className="btn-primary px-8 py-4 text-lg font-semibold"
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
