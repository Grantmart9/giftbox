"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        const { data, error } = await signUp(email, password, {
          first_name: firstName,
          last_name: lastName,
        });

        if (error) {
          setError(error.message);
        } else {
          // Check if email confirmation is required
          if (data.user && !data.session) {
            alert(
              "Please check your email and click the confirmation link to complete your registration."
            );
          } else {
            router.push("/");
          }
        }
      } else {
        const { data, error } = await signIn(email, password);

        if (error) {
          setError(error.message);
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {isSignUp
                ? "Join GiftBox Studio and start creating amazing gift boxes"
                : "Sign in to continue building your perfect gift box"}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-sm sm:text-base lg:text-lg"
              >
                {isLoading
                  ? isSignUp
                    ? "Creating Account..."
                    : "Signing In..."
                  : isSignUp
                  ? "Create Account"
                  : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setFirstName("");
                    setLastName("");
                  }}
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  {isSignUp ? "Sign in" : "Create one"}
                </button>
              </p>
            </div>

            {!isSignUp && (
              <div className="mt-4 text-center">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-gray-500 hover:text-pink-600"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
