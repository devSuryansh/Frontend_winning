"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  FileText,
  Video,
  Search,
  Briefcase,
  Github,
  Workflow,
  Users,
  Zap,
  CheckCircle,
  LogOut,
  Sparkles,
  Bot,
  Brain,
} from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { logout } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
        damping: 10,
      },
    },
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        {/* Header with Enhanced Logout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 right-6 z-50"
        >
          <Button
            onClick={logout}
            variant="ghost"
            className="backdrop-blur-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Hero Section with Enhanced Animation */}
        <section className="relative z-10 pt-20 pb-32">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-6xl mx-auto"
            >
              {/* Floating Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm mb-8"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">
                  The Future of AI Automation
                </span>
              </motion.div>

              {/* Main Heading with Enhanced Typography */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent block">
                  Do Everything
                </span>
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent block animate-gradient-x">
                  with Agents
                </span>
              </motion.h1>

              {/* Enhanced Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
              >
                Experience the next generation of AI-powered automation. Email,
                meetings, coding, publishing, search — all seamlessly
                orchestrated by intelligent agents.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto"
              >
                {[
                  { value: "10K+", label: "Active Users" },
                  { value: "1M+", label: "Tasks Completed" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "24/7", label: "AI Support" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced Demo Video */}
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-4xl mx-auto mb-16 group"
              >
                <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-white/10 relative shadow-2xl">
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 z-10" />
                  {/* Play Button
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors duration-300">
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </div>
                  </motion.div> */}
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/Demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl opacity-60 blur-lg group-hover:opacity-80 transition-opacity duration-300 -z-10" />
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Link href="/agents">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold px-12 py-4 text-lg rounded-2xl border-0 shadow-2xl shadow-purple-500/25 group"
                  >
                    <Bot className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {/* <Rocket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" /> */}
                    Explore Agents
                  </Button>
                </Link>

                {/* <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 font-bold px-12 py-4 text-lg rounded-2xl backdrop-blur-sm group"
                  >
                    
                    Explore Agents
                  </Button> */}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Agent Cards Section */}
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 backdrop-blur-sm mb-6">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">
                  AI-Powered Automation
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Intelligent Agents
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Each agent is specifically designed to excel at different tasks,
                working together to create a seamless automation experience.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Work Agent */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href="/agents">
                  <Card className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardHeader className="relative text-center pb-4">
                      <div className="relative mx-auto mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white mb-3">
                        Work Agent
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-base">
                        Your professional productivity powerhouse
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-4">
                      {[
                        {
                          icon: Mail,
                          text: "Smart Email Management",
                          color: "text-blue-400",
                        },
                        {
                          icon: FileText,
                          text: "Document Generation",
                          color: "text-cyan-400",
                        },
                        {
                          icon: Video,
                          text: "Meeting Orchestration",
                          color: "text-blue-300",
                        },
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 text-gray-300 group-hover:text-white transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <feature.icon
                              className={`w-4 h-4 ${feature.color}`}
                            />
                          </div>
                          <span className="font-medium">{feature.text}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              {/* Web Agent */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href="/agents/web">
                  <Card className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-green-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardHeader className="relative text-center pb-4">
                      <div className="relative mx-auto mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Search className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white mb-3">
                        Web Agent
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-base">
                        Intelligent web navigation and discovery
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-4">
                      {[
                        {
                          icon: Search,
                          text: "Advanced Web Search",
                          color: "text-green-400",
                        },
                        {
                          icon: Briefcase,
                          text: "Career Opportunities",
                          color: "text-emerald-400",
                        },
                        {
                          icon: Github,
                          text: "Professional Networks",
                          color: "text-green-300",
                        },
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 text-gray-300 group-hover:text-white transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <feature.icon
                              className={`w-4 h-4 ${feature.color}`}
                            />
                          </div>
                          <span className="font-medium">{feature.text}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              {/* MCP Agent */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href="/agents/mcp">
                  <Card className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardHeader className="relative text-center pb-4">
                      <div className="relative mx-auto mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Workflow className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white mb-3">
                        MCP Agent
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-base">
                        Complex workflow orchestration
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-4">
                      {[
                        {
                          icon: Workflow,
                          text: "Task Orchestration",
                          color: "text-purple-400",
                        },
                        {
                          icon: Zap,
                          text: "Process Automation",
                          color: "text-pink-400",
                        },
                        {
                          icon: CheckCircle,
                          text: "Quality Assurance",
                          color: "text-purple-300",
                        },
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 text-gray-300 group-hover:text-white transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <feature.icon
                              className={`w-4 h-4 ${feature.color}`}
                            />
                          </div>
                          <span className="font-medium">{feature.text}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Timeline Section */}
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm mb-6">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">
                  Simple Process
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  How It Works
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Get started in minutes, not hours. Our streamlined process makes
                AI automation accessible to everyone.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: "Choose Agent",
                    description:
                      "Select the AI agent that matches your specific needs and goals",
                    icon: Users,
                    color: "from-blue-500 to-cyan-500",
                    delay: 0.1,
                  },
                  {
                    step: "02",
                    title: "Describe Task",
                    description:
                      "Simply explain what you need in natural, conversational language",
                    icon: Search,
                    color: "from-green-500 to-emerald-500",
                    delay: 0.2,
                  },
                  {
                    step: "03",
                    title: "AI Executes",
                    description:
                      "Watch as your agent intelligently completes the work autonomously",
                    icon: Zap,
                    color: "from-purple-500 to-pink-500",
                    delay: 0.3,
                  },
                  {
                    step: "04",
                    title: "Get Results",
                    description:
                      "Receive polished, professional results in seconds, not hours",
                    icon: CheckCircle,
                    color: "from-cyan-500 to-blue-500",
                    delay: 0.4,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: item.delay }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    {/* Connection Line */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
                    )}

                    <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-full hover:border-white/30 transition-all duration-300 group-hover:scale-[1.02]">
                      {/* Step Number */}
                      <div className="absolute -top-4 left-6 px-3 py-1 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-full">
                        <span className="text-sm font-bold text-white">
                          {item.step}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="relative mb-6 mt-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <div
                          className={`absolute -inset-2 bg-gradient-to-br ${item.color} rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300`}
                        />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-5xl mx-auto relative"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 blur-3xl -z-10" />

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm mb-8">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-lg font-semibold text-purple-300">
                  Ready to Transform Your Workflow?
                </span>
              </div>

              {/* Main CTA Heading */}
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  Your AI Operating
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                  System is here.
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Join thousands of innovators who are already transforming their
                productivity with AgenticOS. The future of work starts today.
              </p>

              {/* Feature Highlights */}
              <div className="flex flex-wrap justify-center gap-6 mb-16">
                {[
                  "🚀 Instant Setup",
                  "🤖 AI-Powered",
                  "⚡ Lightning Fast",
                  "🔒 Secure & Private",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 font-medium"
                  >
                    {feature}
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 hover:from-purple-500 hover:via-cyan-500 hover:to-purple-500 text-white font-bold px-16 py-6 text-xl rounded-2xl border-0 shadow-2xl shadow-purple-500/25 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center">
                    <Rocket className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Launch AgenticOS
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-bold px-16 py-6 text-xl rounded-2xl backdrop-blur-sm group"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </motion.div> */}

              {/* Social Proof */}
              {/* <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-16 pt-8 border-t border-white/10"
              >
                <p className="text-gray-400 mb-4">Trusted by teams at</p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  {["Microsoft", "Google", "Meta", "Apple", "Tesla"].map(
                    (company, index) => (
                      <div
                        key={index}
                        className="text-lg font-semibold text-gray-500"
                      >
                        {company}
                      </div>
                    )
                  )}
                </div>
              </motion.div> */}
            </motion.div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
