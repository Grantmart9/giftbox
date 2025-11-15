"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoxStore } from "@/store/boxStore";
import { useToast } from "@/components/ui/toast";
import Loading from "@/components/ui/loading";
import { GiftItem } from "@/types";
import GiftBox3D from "@/components/GiftBox3D";

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

  const { addToast } = useToast();
  const [availableItems, setLocalItems] = useState<GiftItem[]>(mockItems);
  const [isLoading, setIsLoading] = useState(false);
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    setAvailableItems(mockItems);
  }, [setAvailableItems]);

  // Enhanced item management with better UX
  const handleAddItem = async (item: GiftItem) => {
    setIsLoading(true);
    setAnimatingItems((prev) => new Set(prev).add(item.id));

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    addItemToBox(item);
    setIsLoading(false);

    addToast({
      type: "success",
      title: "Item Added! 🎉",
      message: `${item.name} has been added to your box`,
      duration: 3000,
    });

    // Remove animation after delay
    setTimeout(() => {
      setAnimatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 600);
  };

  const handleRemoveItem = async (itemId: string) => {
    const item = boxConfig.items.find((i) => i.id === itemId);
    if (item) {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 200));

      removeItemFromBox(itemId);
      setIsLoading(false);

      addToast({
        type: "info",
        title: "Item Removed",
        message: `${item.name} has been removed from your box`,
        duration: 2500,
      });
    }
  };

  const handleClearBox = async () => {
    if (boxConfig.items.length === 0) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    clearBox();
    setIsLoading(false);

    addToast({
      type: "warning",
      title: "Box Cleared",
      message: "All items have been removed from your box",
      duration: 3000,
    });
  };

  const handleCheckout = () => {
    if (boxConfig.items.length === 0) {
      addToast({
        type: "warning",
        title: "Empty Box",
        message: "Please add some items before proceeding to checkout",
        duration: 4000,
      });
      return;
    }

    addToast({
      type: "info",
      title: "Redirecting to Checkout",
      message: "Preparing your order...",
      duration: 2000,
    });

    setTimeout(() => {
      window.location.href = "/checkout";
    }, 500);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="container mx-auto px-4 py-6 lg:py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 lg:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gradient mb-2 lg:mb-4">
            Build Your Perfect Gift Box
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-300 px-4 mb-4">
            Choose items to create your personalized gift experience
          </p>

          {/* Progress Indicator */}
          {boxConfig.items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass rounded-xl px-4 py-2 inline-block shadow-lg border border-white/20"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-white">
                  Box Progress:
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 progress-modern rounded-full h-2">
                    <motion.div
                      className="progress-bar h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          (boxConfig.items.length / 6) * 100,
                          100
                        )}%`,
                      }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-xs text-gray-300">
                    {boxConfig.items.length}/6 items
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Mobile 3D Preview */}
        <div className="block lg:hidden mb-6">
          <Card className="card-glass border-0 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-lg">
                Your Gift Box
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-xl overflow-hidden mb-4 relative">
                <GiftBox3D
                  color={boxConfig.color}
                  ribbonColor={boxConfig.ribbonColor}
                  size={boxConfig.size}
                  bowStyle={boxConfig.bowStyle}
                  isAnimating={is3DPreview}
                  showItems={boxConfig.items.length > 0}
                />
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

                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
                    disabled={boxConfig.items.length === 0 || isLoading}
                    onClick={handleCheckout}
                  >
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                </div>
              </div>

              {/* Box Size Selection */}
              <div className="mb-4">
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
            <Card className="card-glass border-0 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <span className="text-lg lg:text-xl text-white">
                    Available Items
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleClearBox}
                    disabled={boxConfig.items.length === 0 || isLoading}
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? "Clearing..." : "Clear Box"}
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
                <div
                  data-tour="items-grid"
                  className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4"
                >
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="cursor-pointer card-hover border-0 bg-white/20 backdrop-blur-md">
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
                              onClick={() => handleAddItem(item)}
                              disabled={
                                isLoading || animatingItems.has(item.id)
                              }
                              className="text-xs px-2 py-1 h-7 sm:h-8 bg-gradient-to-r from-pink-500 to-purple-600"
                            >
                              {animatingItems.has(item.id)
                                ? "Adding..."
                                : "Add"}
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
            <Card
              data-tour="3d-preview"
              className="bg-white/60 backdrop-blur-sm border-0 shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-center">Your Gift Box</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-xl overflow-hidden relative">
                  <GiftBox3D
                    color={boxConfig.color}
                    ribbonColor={boxConfig.ribbonColor}
                    size={boxConfig.size}
                    bowStyle={boxConfig.bowStyle}
                    isAnimating={is3DPreview}
                    showItems={boxConfig.items.length > 0}
                  />
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
            <Card
              data-tour="customization-panel"
              className="bg-white/60 backdrop-blur-sm border-0 shadow-lg"
            >
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
                    Bow Style
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      {
                        key: "classic",
                        label: "Classic",
                        icon: "🎀",
                        description: "Traditional bow with loops and tails",
                      },
                      {
                        key: "elegant",
                        label: "Elegant",
                        icon: "✨",
                        description: "Sophisticated single-loop design",
                      },
                      {
                        key: "playful",
                        label: "Playful",
                        icon: "🎈",
                        description: "Fun, bouncy bow style",
                      },
                      {
                        key: "luxury",
                        label: "Luxury",
                        icon: "💎",
                        description: "Premium ornate bow design",
                      },
                      {
                        key: "minimalist",
                        label: "Minimalist",
                        icon: "➰",
                        description: "Clean, simple ribbon accent",
                      },
                    ].map((bow) => (
                      <button
                        key={bow.key}
                        className={`p-3 rounded-lg border-2 text-left transition-colors ${
                          boxConfig.bowStyle === bow.key
                            ? "border-pink-500 bg-pink-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() =>
                          useBoxStore
                            .getState()
                            .setBoxConfig({ bowStyle: bow.key as any })
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{bow.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {bow.label}
                            </div>
                            <div className="text-xs text-gray-600">
                              {bow.description}
                            </div>
                          </div>
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

            {/* Current Items */}
            <Card className="card-glass border-0 shadow-2xl">
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
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isLoading}
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
                  disabled={boxConfig.items.length === 0 || isLoading}
                  onClick={handleCheckout}
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
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
