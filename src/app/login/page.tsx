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
import { Key, Sparkles, ArrowRight, Shield, Zap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="w-full max-w-lg px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Badge */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                Secure Authentication
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10 overflow-hidden">
              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-transparent opacity-50" />

              <CardHeader className="relative text-center pb-6">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl opacity-20 blur-lg" />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <CardTitle className="text-4xl font-black mb-4">
                    <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Welcome to AgenticOS
                    </span>
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg leading-relaxed">
                    Enter your OpenAI API key to unlock the power of intelligent
                    automation
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="relative p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* API Key Input */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label
                      htmlFor="apiKey"
                      className="text-white font-semibold text-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-purple-400" />
                        OpenAI API Key
                      </div>
                    </Label>
                    <div className="relative">
                      <Input
                        id="apiKey"
                        type="password"
                        placeholder="sk-..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 h-14 text-lg rounded-xl backdrop-blur-sm"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm"
                    >
                      <p className="text-red-400 font-medium">{error}</p>
                    </motion.div>
                  )}

                  {/* Security Info */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold text-lg">
                        Your API key is secure
                      </span>
                    </div>
                    <div className="space-y-3">
                      {[
                        "Stored locally in your browser",
                        "Never sent to our servers",
                        "Used only for AI operations",
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-gray-300"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      disabled={isLoading || !apiKey}
                      className="w-full bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 hover:from-purple-500 hover:via-cyan-500 hover:to-purple-500 text-white font-bold py-4 text-lg rounded-xl border-0 shadow-2xl shadow-purple-500/25 group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {isLoading ? (
                        <div className="relative flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Verifying API Key...</span>
                        </div>
                      ) : (
                        <div className="relative flex items-center justify-center gap-3">
                          <Zap className="w-5 h-5" />
                          <span>Get Started</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
