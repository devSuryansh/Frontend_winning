"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  FileText, 
  Video, 
  Search, 
  Briefcase, 
  Github, 
  Workflow, 
  ArrowRight,
  Play,
  Users,
  Zap,
  CheckCircle,
  LogOut
} from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen grid-background">
        {/* Header with Logout */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            onClick={logout}
            variant="ghost"
            className="text-gray-300 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden z-10">
        
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            >
              Do Everything with{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                AI Agents
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-3xl text-gray-200 mb-16 max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            >
              Transform your workflow with intelligent AI agents that handle{" "}
              <span className="text-cyan-400 font-medium">email</span>,{" "}
              <span className="text-emerald-400 font-medium">documentation</span>,{" "}
              <span className="text-purple-400 font-medium">coding</span>, and more — all in one unified platform.
            </motion.p>
            
            {/* Demo Video */}
            <motion.div
              className="w-full max-w-4xl mx-auto mb-12 aspect-video rounded-2xl border border-gray-700 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
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
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/agents">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold px-12 py-4 text-xl rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                >
                  Explore AI Agents
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5 font-semibold px-12 py-4 text-xl rounded-2xl transition-all duration-300"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                <Play className="mr-3 w-6 h-6" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Agent Cards Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent leading-tight"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Powerful AI Agents
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed"
               style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Choose the perfect agent for your workflow and experience the future of productivity
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Work Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/agents">
                <Card className="glassmorphism hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 cursor-pointer group backdrop-blur-xl bg-gray-900/40 border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20">
                <CardHeader className="text-center pb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                    Work Agent
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-base leading-relaxed" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                    Handle all your professional tasks with intelligent automation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-200 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">Smart Email Management</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-200 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">Document Generation</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-200 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Video className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">Meeting Assistant</span>
                  </div>
                </CardContent>
              </Card>
              </Link>
            </motion.div>

            {/* Web Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/agents/web">
                <Card className="glassmorphism hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 cursor-pointer group backdrop-blur-xl bg-gray-900/40 border border-gray-700/50 shadow-2xl hover:shadow-emerald-500/20">
                <CardHeader className="text-center pb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Search className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                    Web Agent
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-base leading-relaxed" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                    Navigate and search the web with AI-powered intelligence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-200 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <Search className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium">Intelligent Web Search</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-200 p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                    <Briefcase className="w-5 h-5 text-teal-400" />
                    <span className="font-medium">Job & Career Search</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-200 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <Github className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">Social & Professional</span>
                  </div>
                </CardContent>
              </Card>
              </Link>
            </motion.div>

            {/* MCP Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/agents/mcp">
                <Card className="glassmorphism hover:border-purple-400/50 transition-all duration-500 hover:scale-105 cursor-pointer group backdrop-blur-xl bg-gray-900/40 border border-gray-700/50 shadow-2xl hover:shadow-purple-500/20">
                <CardHeader className="text-center pb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-600 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Workflow className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                    MCP Agent
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-base leading-relaxed" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                    Orchestrate complex workflows with advanced automation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-200 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Workflow className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">Task Orchestration</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-200 p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                    <Zap className="w-5 h-5 text-pink-400" />
                    <span className="font-medium">Workflow Management</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-200 p-3 bg-rose-500/10 rounded-lg border border-rose-500/20">
                    <CheckCircle className="w-5 h-5 text-rose-400" />
                    <span className="font-medium">Process Automation</span>
                  </div>
                </CardContent>
              </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              How It Works
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed"
               style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Get started in just a few simple steps and transform your productivity
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan to-neon-green transform -translate-x-1/2" />
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {[
                  { step: "1", title: "Choose your agent", description: "Select from our specialized AI agents designed for different tasks", icon: Users },
                  { step: "2", title: "Ask anything", description: "Describe what you need in natural language", icon: Search },
                  { step: "3", title: "Agent executes tasks", description: "Watch as your agent works autonomously", icon: Zap },
                  { step: "4", title: "Get results instantly", description: "Receive completed work in seconds", icon: CheckCircle }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Icon */}
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30 hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {item.step}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-600/50 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent leading-tight"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Your AI Operating System is here.
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-16 font-light leading-relaxed max-w-4xl mx-auto"
               style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Join thousands of users who are already working smarter with{" "}
              <span className="text-cyan-400 font-medium">Portia AI</span> — 
              the future of intelligent productivity
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/agents">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-700 text-white font-bold px-16 py-6 text-2xl rounded-2xl shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 group"
                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                >
                  Launch Portia AI
                  <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-gray-600 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/5 font-semibold px-16 py-6 text-2xl rounded-2xl transition-all duration-300"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </ProtectedRoute>
  );
}
