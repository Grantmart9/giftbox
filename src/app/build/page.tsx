"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoxStore } from "@/store/boxStore";
import { GiftItem } from "@/types";

// Mock data for available items
const mockItems: GiftItem[] = [
  {
    id: "1",
    name: "Red Roses Bouquet",
    category: "Flowers",
    price: 519.47,
    imageUrl: "/api/placeholder/150/150",
    description: "Beautiful red roses with elegant wrapping",
  },
  {
    id: "2",
    name: "Premium Chocolates",
    category: "Chocolates",
    price: 277.21,
    imageUrl: "/api/placeholder/150/150",
    description: "Artisan chocolate collection",
  },
  {
    id: "3",
    name: "Handwritten Card",
    category: "Cards",
    price: 86.48,
    imageUrl: "/api/placeholder/150/150",
    description: "Customizable greeting card",
  },
  {
    id: "4",
    name: "Plush Teddy Bear",
    category: "Toys",
    price: 433.08,
    imageUrl: "/api/placeholder/150/150",
    description: "Soft and cuddly teddy bear",
  },
  {
    id: "5",
    name: "Bestselling Novel",
    category: "Books",
    price: 346.43,
    imageUrl: "/api/placeholder/150/150",
    description: "Popular fiction book",
  },
  {
    id: "6",
    name: "Silver Necklace",
    category: "Jewelry",
    price: 1559.33,
    imageUrl: "/api/placeholder/150/150",
    description: "Elegant sterling silver necklace",
  },
];

export default function BoxBuilderPage() {
  const {
    boxConfig,
    addItemToBox,
    removeItemFromBox,
    selectedCategory,
    setSelectedCategory,
    toggle3DPreview,
    is3DPreview,
    clearBox,
    setAvailableItems,
  } = useBoxStore();

  const [availableItems, setLocalItems] = useState<GiftItem[]>(mockItems);

  useEffect(() => {
    setAvailableItems(mockItems);
  }, [setAvailableItems]);

  const filteredItems =
    selectedCategory === "All"
      ? availableItems
      : availableItems.filter((item) => item.category === selectedCategory);

  const categories = [
    "All",
    "Flowers",
    "Chocolates",
    "Cards",
    "Toys",
    "Books",
    "Jewelry",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 lg:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 lg:mb-4">
            Build Your Perfect Gift Box
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 px-4">
            Choose items to create your personalized gift experience
          </p>
        </motion.div>

        {/* Mobile 3D Preview */}
        <div className="block lg:hidden mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-lg">
                Your Gift Box
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
                <div
                  className="w-24 h-24 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: boxConfig.color }}
                >
                  <div className="w-full h-full rounded-lg bg-gradient-to-br from-white/30 to-transparent"></div>

                  {/* Ribbon */}
                  <div
                    className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2"
                    style={{ backgroundColor: boxConfig.ribbonColor }}
                  ></div>
                  <div
                    className="absolute top-0 bottom-0 left-1/2 w-1 transform -translate-x-1/2"
                    style={{ backgroundColor: boxConfig.ribbonColor }}
                  ></div>
                </div>

                {is3DPreview && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-4xl opacity-20">🎁</span>
                  </motion.div>
                )}
              </div>

              <div className="text-center space-y-3">
                <Button
                  variant="outline"
                  onClick={toggle3DPreview}
                  className="w-full"
                  size="sm"
                >
                  {is3DPreview ? "Stop 3D Preview" : "Preview in 3D"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Total: R{boxConfig.totalPrice.toFixed(2)} (
                    {boxConfig.items.length} item
                    {boxConfig.items.length !== 1 ? "s" : ""})
                  </p>

                  {/* Mobile Box Size Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Box Size
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: "small", label: "Small", price: 0 },
                        { key: "medium", label: "Medium", price: 86.65 },
                        { key: "large", label: "Large", price: 173.3 },
                        { key: "extra-large", label: "XL", price: 259.95 },
                      ].map((size) => (
                        <button
                          key={size.key}
                          className={`p-2 rounded-lg border text-xs transition-colors ${
                            boxConfig.size === size.key
                              ? "border-pink-500 bg-pink-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() =>
                            useBoxStore
                              .getState()
                              .setBoxConfig({ size: size.key as any })
                          }
                        >
                          <div className="font-medium">{size.label}</div>
                          <div className="text-xs text-pink-600">
                            {size.price === 0 ? "Free" : `+R${size.price}`}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
                    disabled={boxConfig.items.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Box Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      key: "small",
                      label: "Small",
                      dimensions: '6" x 4" x 3"',
                      price: 0,
                    },
                    {
                      key: "medium",
                      label: "Medium",
                      dimensions: '8" x 6" x 4"',
                      price: 86.65,
                    },
                    {
                      key: "large",
                      label: "Large",
                      dimensions: '10" x 8" x 5"',
                      price: 173.3,
                    },
                    {
                      key: "extra-large",
                      label: "Extra Large",
                      dimensions: '12" x 10" x 6"',
                      price: 259.95,
                    },
                  ].map((size) => (
                    <button
                      key={size.key}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        boxConfig.size === size.key
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        useBoxStore
                          .getState()
                          .setBoxConfig({ size: size.key as any })
                      }
                    >
                      <div className="font-medium text-sm">{size.label}</div>
                      <div className="text-xs text-gray-600">
                        {size.dimensions}
                      </div>
                      <div className="text-xs font-medium text-pink-600">
                        {size.price === 0 ? "Free" : `+R${size.price}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Box Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      key: "small",
                      label: "Small",
                      dimensions: '6" x 4" x 3"',
                      price: 0,
                    },
                    {
                      key: "medium",
                      label: "Medium",
                      dimensions: '8" x 6" x 4"',
                      price: 86.65,
                    },
                    {
                      key: "large",
                      label: "Large",
                      dimensions: '10" x 8" x 5"',
                      price: 173.3,
                    },
                    {
                      key: "extra-large",
                      label: "Extra Large",
                      dimensions: '12" x 10" x 6"',
                      price: 259.95,
                    },
                  ].map((size) => (
                    <button
                      key={size.key}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        boxConfig.size === size.key
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        useBoxStore
                          .getState()
                          .setBoxConfig({ size: size.key as any })
                      }
                    >
                      <div className="font-medium text-sm">{size.label}</div>
                      <div className="text-xs text-gray-600">
                        {size.dimensions}
                      </div>
                      <div className="text-xs font-medium text-pink-600">
                        {size.price === 0 ? "Free" : `+R${size.price}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Box Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      key: "small",
                      label: "Small",
                      dimensions: '6" x 4" x 3"',
                      price: 0,
                    },
                    {
                      key: "medium",
                      label: "Medium",
                      dimensions: '8" x 6" x 4"',
                      price: 86.65,
                    },
                    {
                      key: "large",
                      label: "Large",
                      dimensions: '10" x 8" x 5"',
                      price: 173.3,
                    },
                    {
                      key: "extra-large",
                      label: "Extra Large",
                      dimensions: '12" x 10" x 6"',
                      price: 259.95,
                    },
                  ].map((size) => (
                    <button
                      key={size.key}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        boxConfig.size === size.key
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        useBoxStore
                          .getState()
                          .setBoxConfig({ size: size.key as any })
                      }
                    >
                      <div className="font-medium text-sm">{size.label}</div>
                      <div className="text-xs text-gray-600">
                        {size.dimensions}
                      </div>
                      <div className="text-xs font-medium text-pink-600">
                        {size.price === 0 ? "Free" : `+R${size.price}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Sidebar - Items */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <span className="text-lg lg:text-xl">Available Items</span>
                  <Button
                    variant="outline"
                    onClick={clearBox}
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    Clear Box
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs flex-1 sm:flex-none"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80">
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                          <span className="text-2xl sm:text-3xl lg:text-4xl">
                            📦
                          </span>
                        </div>
                        <CardContent className="p-2 sm:p-3 lg:p-4">
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 hidden sm:block">
                            {item.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm sm:text-lg font-bold text-pink-600">
                              R{item.price}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => addItemToBox(item)}
                              className="text-xs px-2 py-1 h-7 sm:h-8 bg-gradient-to-r from-pink-500 to-purple-600"
                            >
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Desktop 3D Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 lg:space-y-6 order-1 lg:order-2 hidden lg:block"
          >
            {/* 3D Box Preview */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Your Gift Box</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div
                    className="w-32 h-32 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: boxConfig.color }}
                  >
                    {/* Box representation */}
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-white/30 to-transparent"></div>

                    {/* Ribbon */}
                    <div
                      className="absolute top-1/2 left-0 right-0 h-2 transform -translate-y-1/2"
                      style={{ backgroundColor: boxConfig.ribbonColor }}
                    ></div>
                    <div
                      className="absolute top-0 bottom-0 left-1/2 w-2 transform -translate-x-1/2"
                      style={{ backgroundColor: boxConfig.ribbonColor }}
                    ></div>
                  </div>

                  {is3DPreview && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="text-6xl opacity-20">🎁</span>
                    </motion.div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={toggle3DPreview}
                    className="w-full"
                  >
                    {is3DPreview ? "Stop 3D Preview" : "Preview in 3D"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Box Configuration */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Customize Box</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Box Color
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      "#ff6b9d",
                      "#ffd700",
                      "#87ceeb",
                      "#98fb98",
                      "#dda0dd",
                      "#f0e68c",
                    ].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${
                          boxConfig.color === color
                            ? "border-gray-800"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          useBoxStore.getState().setBoxConfig({ color })
                        }
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ribbon Color
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      "#ffd700",
                      "#ff69b4",
                      "#ff4500",
                      "#800080",
                      "#000000",
                      "#ff0000",
                    ].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${
                          boxConfig.ribbonColor === color
                            ? "border-gray-800"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          useBoxStore
                            .getState()
                            .setBoxConfig({ ribbonColor: color })
                        }
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Box Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        key: "small",
                        label: "Small",
                        dimensions: '6" x 4" x 3"',
                        price: 0,
                      },
                      {
                        key: "medium",
                        label: "Medium",
                        dimensions: '8" x 6" x 4"',
                        price: 86.65,
                      },
                      {
                        key: "large",
                        label: "Large",
                        dimensions: '10" x 8" x 5"',
                        price: 173.3,
                      },
                      {
                        key: "extra-large",
                        label: "Extra Large",
                        dimensions: '12" x 10" x 6"',
                        price: 259.95,
                      },
                    ].map((size) => (
                      <button
                        key={size.key}
                        className={`p-3 rounded-lg border-2 text-left transition-colors ${
                          boxConfig.size === size.key
                            ? "border-pink-500 bg-pink-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() =>
                          useBoxStore
                            .getState()
                            .setBoxConfig({ size: size.key as any })
                        }
                      >
                        <div className="font-medium text-sm">{size.label}</div>
                        <div className="text-xs text-gray-600">
                          {size.dimensions}
                        </div>
                        <div className="text-xs font-medium text-pink-600">
                          {size.price === 0 ? "Free" : `+R${size.price}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Items */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Box Contents ({boxConfig.items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {boxConfig.items.length === 0 ? (
                  <p className="text-gray-500 text-center py-4 text-sm">
                    No items added yet
                  </p>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {boxConfig.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-2 bg-white/50 rounded text-sm"
                      >
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-xs text-gray-500 block">
                            R{item.price}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeItemFromBox(item.id)}
                          className="h-6 px-2 text-xs"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Total and Checkout */}
            <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-4 lg:p-6 text-center">
                <h3 className="text-lg lg:text-2xl font-bold mb-2">
                  Total: R{boxConfig.totalPrice.toFixed(2)}
                </h3>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full mb-2 text-sm lg:text-base"
                  disabled={boxConfig.items.length === 0}
                >
                  Proceed to Checkout
                </Button>
                <p className="text-xs lg:text-sm opacity-90">
                  {boxConfig.items.length} item
                  {boxConfig.items.length !== 1 ? "s" : ""} selected
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
