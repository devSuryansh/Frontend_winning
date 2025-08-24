"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Sparkles, ArrowRight, Shield } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/api";

export default function LoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          openai_api_key: apiKey,
          user_id: `user_${Date.now()}`, // Generate a simple user ID
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store the token in localStorage
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user_id", data.user_id);

        // Redirect to home page
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Invalid API key");
      }
    } catch {
      setError("Invalid Api Key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid-background flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="glassmorphism border border-gray-700">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-cyan to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-white">
                Welcome to AgenticOS
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Enter your OpenAI API key to get started
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* API Key Input */}
                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-white font-medium">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-neon-cyan" />
                      OpenAI API Key
                    </div>
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-neon-cyan focus:ring-neon-cyan"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-900/30 border border-red-500 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Security Info */}
                <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-neon-cyan" />
                    <span className="text-white font-medium">
                      Your API key is secure
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                      <span>Stored locally in your browser</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                      <span>Never sent to our servers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                      <span>Used only for AI operations</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !apiKey}
                  className="w-full bg-gradient-to-r from-neon-cyan to-blue-500 text-black hover:from-neon-cyan/80 hover:to-blue-500/80 font-bold py-4 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying API Key...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
