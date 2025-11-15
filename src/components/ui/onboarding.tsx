"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface OnboardingProps {
  onComplete: () => void;
  isVisible: boolean;
}

interface Step {
  id: number;
  title: string;
  description: string;
  target?: string;
  position?: "top" | "bottom" | "left" | "right";
  action?: () => void;
}

const onboardingSteps: Step[] = [
  {
    id: 1,
    title: "Welcome to GiftBox Studio! 🎁",
    description:
      "Let's show you how to create the perfect custom gift box in just a few steps.",
  },
  {
    id: 2,
    title: "Choose Your Items 📦",
    description:
      "Select from our curated collection of premium gifts across different categories.",
    target: "[data-tour='items-grid']",
    position: "bottom",
  },
  {
    id: 3,
    title: "Customize Your Box 🎨",
    description:
      "Personalize colors, bow styles, and size to match your recipient's taste.",
    target: "[data-tour='customization-panel']",
    position: "left",
  },
  {
    id: 4,
    title: "Preview in 3D 👀",
    description:
      "See your creation come to life with our interactive 3D preview. Drag to rotate!",
    target: "[data-tour='3d-preview']",
    position: "right",
  },
  {
    id: 5,
    title: "Ready to Build! 🚀",
    description:
      "You now know everything you need. Start creating amazing gift boxes!",
  },
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(isVisible);

  useEffect(() => {
    setShowOnboarding(isVisible);
  }, [isVisible]);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    onComplete();
  };

  if (!showOnboarding) return null;

  const step = onboardingSteps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-pink-600/20 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            {/* Progress indicator */}
            <div className="flex space-x-2 mb-6">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full flex-1 transition-colors duration-300 ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-pink-500 to-purple-600"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Step content */}
            <div className="text-center mb-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  {step.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={skipOnboarding}
                className="text-gray-500 hover:text-gray-700"
              >
                Skip Tour
              </Button>

              <div className="flex space-x-3">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={prevStep} className="px-6">
                    Back
                  </Button>
                )}
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6"
                >
                  {currentStep === onboardingSteps.length - 1
                    ? "Get Started!"
                    : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Onboarding;
