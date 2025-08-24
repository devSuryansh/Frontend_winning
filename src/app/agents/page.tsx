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
import {
  Mail,
  FileText,
  Github,
  ArrowLeft,
  Zap,
  CheckCircle,
  MessageSquare,
  Send,
  FileEdit,
  Sparkles,
  Bot,
  Brain,
  Code,
} from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AgentsPage() {
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
    hidden: { y: 30, opacity: 0 },
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/5 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        {/* Header */}
        <section className="relative z-10 pt-8 pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/">
                <Button
                  variant="ghost"
                  className="backdrop-blur-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 mb-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-20"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm mb-8"
              >
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Professional AI Agents
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent block animate-gradient-x">
                  Work Agents
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              >
                Professional AI agents designed to revolutionize your workflow
                and boost productivity across all your work tasks.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Work Agent Cards */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Email Agent */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group"
              >
                <Link href="/email">
                  <Card className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardHeader className="relative text-center pb-6">
                      <div className="relative mx-auto mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Mail className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
                      </div>
                      <CardTitle className="text-3xl font-bold text-white mb-3">
                        Email Agent
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg">
                        Intelligent email management and communication
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative space-y-6">
                      <div className="space-y-4">
                        {[
                          {
                            icon: Send,
                            text: "Smart Email Drafting",
                            color: "text-blue-400",
                          },
                          {
                            icon: MessageSquare,
                            text: "Inbox Organization",
                            color: "text-cyan-400",
                          },
                          {
                            icon: CheckCircle,
                            text: "Auto-Response",
                            color: "text-blue-300",
                          },
                        ].map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 text-gray-300 group-hover:text-white transition-colors"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                              <feature.icon
                                className={`w-5 h-5 ${feature.color}`}
                              />
                            </div>
                            <span className="font-medium text-lg">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 text-lg rounded-xl border-0 shadow-lg shadow-blue-500/25 mt-6">
                        <Bot className="w-5 h-5 mr-2" />
                        Launch Email Agent
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              {/* Docs Agent */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group"
              >
                {" "}
                <Link href="/docs">
                  <Card className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-green-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardHeader className="relative text-center pb-6">
                      <div className="relative mx-auto mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <FileText className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
                      </div>
                      <CardTitle className="text-3xl font-bold text-white mb-3">
                        Docs Agent
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg">
                        Document creation and editing assistance
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative space-y-6">
                      <div className="space-y-4">
                        {[
                          {
                            icon: FileEdit,
                            text: "Document Writing",
                            color: "text-green-400",
                          },
                          {
                            icon: Sparkles,
                            text: "Content Generation",
                            color: "text-emerald-400",
                          },
                          {
                            icon: CheckCircle,
                            text: "Format & Style",
                            color: "text-green-300",
                          },
                        ].map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 text-gray-300 group-hover:text-white transition-colors"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                              <feature.icon
                                className={`w-5 h-5 ${feature.color}`}
                              />
                            </div>
                            <span className="font-medium text-lg">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 text-lg rounded-xl border-0 shadow-lg shadow-green-500/25 mt-6">
                        <FileText className="w-5 h-5 mr-2" />
                        Launch Docs Agent
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              {/* GitHub Agent */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="group"
              >
                <Link href="/github">
                  <Card className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardHeader className="relative text-center pb-6">
                      <div className="relative mx-auto mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Github className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
                      </div>
                      <CardTitle className="text-3xl font-bold text-white mb-3">
                        GitHub Agent
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg">
                        Code management and development assistance
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative space-y-6">
                      <div className="space-y-4">
                        {[
                          {
                            icon: Code,
                            text: "Code Review",
                            color: "text-purple-400",
                          },
                          {
                            icon: Zap,
                            text: "Repository Management",
                            color: "text-pink-400",
                          },
                          {
                            icon: CheckCircle,
                            text: "Issue Tracking",
                            color: "text-purple-300",
                          },
                        ].map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 text-gray-300 group-hover:text-white transition-colors"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                              <feature.icon
                                className={`w-5 h-5 ${feature.color}`}
                              />
                            </div>
                            <span className="font-medium text-lg">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 text-lg rounded-xl border-0 shadow-lg shadow-purple-500/25 mt-6">
                        <Github className="w-5 h-5 mr-2" />
                        Launch GitHub Agent
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
