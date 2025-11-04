"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoxStore } from "@/store/boxStore";
import { useAuth } from "@/components/auth/AuthProvider";
import { DeliveryInfo } from "@/types";

type CheckoutStep = 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const { boxConfig } = useBoxStore();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    specialInstructions: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedFromStep1 = () => {
    return (
      deliveryInfo.firstName &&
      deliveryInfo.lastName &&
      deliveryInfo.email &&
      deliveryInfo.phone &&
      deliveryInfo.address &&
      deliveryInfo.city &&
      deliveryInfo.postalCode &&
      deliveryInfo.country
    );
  };

  const canProceedFromStep2 = () => {
    return paymentMethod !== "";
  };

  const handleNext = () => {
    if (currentStep === 1 && canProceedFromStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && canProceedFromStep2()) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      "Order placed successfully! You will receive a confirmation email shortly."
    );
    setIsProcessing(false);

    // Clear the box and redirect to homepage
    useBoxStore.getState().clearBox();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Please sign in to proceed with checkout.</p>
            <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (boxConfig.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Empty Box</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Your box is empty. Add some items before checkout.
            </p>
            <Button onClick={() => router.push("/build")}>
              Build Your Box
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stepTitles = ["Delivery Address", "Payment Method", "Complete Payment"];
  const stepDescriptions = [
    "Confirm where your gift box should be delivered",
    "Choose your preferred payment method",
    "Finalize your purchase",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 lg:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 lg:mb-4">
            Complete Your Order
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 px-4">
            {stepDescriptions[currentStep - 1]}
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step < currentStep
                        ? "bg-gradient-to-r from-pink-500 to-purple-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Order Summary */}
        <div className="block lg:hidden mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {boxConfig.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="flex-1">{item.name}</span>
                    <span className="font-medium">
                      R{item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>R{boxConfig.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Order Summary - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 hidden lg:block"
          >
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {boxConfig.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span>{item.name}</span>
                      <span>R{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>R{boxConfig.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Box Preview */}
                <div className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                  <h4 className="font-medium mb-2">Your Box Preview</h4>
                  <div
                    className="w-full h-24 rounded-lg shadow-md relative"
                    style={{ backgroundColor: boxConfig.color }}
                  >
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div
                      className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2"
                      style={{ backgroundColor: boxConfig.ribbonColor }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {/* Step 1: Delivery Address */}
            {currentStep === 1 && (
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">
                    Step 1: Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4 lg:space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={deliveryInfo.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={deliveryInfo.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.postalCode}
                          onChange={(e) =>
                            handleInputChange("postalCode", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Country *
                        </label>
                        <select
                          required
                          value={deliveryInfo.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        >
                          <option value="">Select Country</option>
                          <option value="ZA">South Africa</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Special Delivery Instructions
                      </label>
                      <textarea
                        value={deliveryInfo.specialInstructions}
                        onChange={(e) =>
                          handleInputChange(
                            "specialInstructions",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        placeholder="Any special delivery instructions..."
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceedFromStep1()}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-sm sm:text-base lg:text-lg"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">
                    Step 2: Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        id: "card",
                        title: "Credit/Debit Card",
                        description: "Pay securely with your card",
                        icon: "💳",
                      },
                      {
                        id: "paypal",
                        title: "PayPal",
                        description: "Pay with your PayPal account",
                        icon: "🅿️",
                      },
                      {
                        id: "eft",
                        title: "EFT",
                        description: "Direct bank transfer",
                        icon: "🏦",
                      },
                      {
                        id: "cod",
                        title: "Cash on Delivery",
                        description: "Pay when you receive",
                        icon: "💵",
                      },
                    ].map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? "border-pink-500 bg-pink-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <h4 className="font-semibold">{method.title}</h4>
                            <p className="text-sm text-gray-600">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceedFromStep2()}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Complete Payment */}
            {currentStep === 3 && (
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">
                    Step 3: Complete Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Payment Summary */}
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border-2 border-dashed border-pink-200">
                      <h4 className="font-semibold mb-4 text-center">
                        Order Summary
                      </h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>R{boxConfig.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery:</span>
                          <span>Free</span>
                        </div>
                        <div className="border-t pt-2 font-bold text-lg">
                          <div className="flex justify-between">
                            <span>Total:</span>
                            <span>R{boxConfig.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Confirmation */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Payment Method</h4>
                      <p className="text-gray-600">
                        {paymentMethod === "card" && "Credit/Debit Card"}
                        {paymentMethod === "paypal" && "PayPal"}
                        {paymentMethod === "eft" && "Electronic Funds Transfer"}
                        {paymentMethod === "cod" && "Cash on Delivery"}
                      </p>
                    </div>

                    {/* Delivery Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Delivery Address</h4>
                      <p className="text-gray-600 text-sm">
                        {deliveryInfo.firstName} {deliveryInfo.lastName}
                        <br />
                        {deliveryInfo.address}
                        <br />
                        {deliveryInfo.city}, {deliveryInfo.postalCode}
                        <br />
                        {deliveryInfo.country}
                      </p>
                    </div>

                    {/* Demo Payment Info */}
                    {paymentMethod === "card" && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold mb-2 text-blue-800">
                          Demo Payment
                        </h4>
                        <p className="text-xs text-blue-600 mb-2">
                          This is a demo checkout. Use these test card details:
                        </p>
                        <div className="text-xs text-blue-600 space-y-1">
                          <div>Card: 4242 4242 4242 4242</div>
                          <div>Expiry: 12/25</div>
                          <div>CVC: 123</div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                      >
                        {isProcessing
                          ? "Processing..."
                          : `Pay R${boxConfig.totalPrice.toFixed(2)}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
