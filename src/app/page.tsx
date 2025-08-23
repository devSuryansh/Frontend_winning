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
  Linkedin, 
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
              className="text-5xl md:text-7xl font-bold mb-6 neon-cyan"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Do Everything with Agents
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Email, meetings, coding, publishing, search — all in one place.
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
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="!bg-[#00ffff] !text-black hover:!bg-[#00ffff]/80 font-semibold px-8 py-3 text-lg border-0"
              >
                Get Started
              </Button>
              <Link href="/agents">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="!border-[#00ffff] !text-[#00ffff] hover:!bg-[#00ffff]/10 font-semibold px-8 py-3 text-lg"
                >
                  See Agents
                </Button>
              </Link>
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-green">
              Powerful AI Agents
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the right agent for your task and watch them work their magic
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
                <Card className="glassmorphism hover:neon-cyan-border transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:glow-pulse">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Work Agent</CardTitle>
                  <CardDescription className="text-gray-400">
                    Handle all your professional tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-neon-cyan" />
                    <span>Email Management</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FileText className="w-5 h-5 text-neon-cyan" />
                    <span>Document Creation</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Video className="w-5 h-5 text-neon-cyan" />
                    <span>Meeting Assistant</span>
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
                <Card className="glassmorphism hover:neon-green-border transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:glow-pulse">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Web Agent</CardTitle>
                  <CardDescription className="text-gray-400">
                    Navigate and search the web intelligently
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Search className="w-5 h-5 text-neon-green" />
                    <span>Web Search</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Briefcase className="w-5 h-5 text-neon-green" />
                    <span>Job Search</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Linkedin className="w-5 h-5 text-neon-green" />
                    <span>LinkedIn & GitHub</span>
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
                <Card className="glassmorphism hover:neon-cyan-border transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:glow-pulse">
                    <Workflow className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">MCP Agent</CardTitle>
                  <CardDescription className="text-gray-400">
                    Orchestrate complex workflows
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Workflow className="w-5 h-5 text-neon-cyan" />
                    <span>Task Orchestration</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Zap className="w-5 h-5 text-neon-cyan" />
                    <span>Workflow Management</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-neon-cyan" />
                    <span>Process Automation</span>
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-cyan">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get started in just a few simple steps
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
                      <div className="w-16 h-16 bg-gradient-to-br from-neon-cyan to-neon-green rounded-full flex items-center justify-center glow-pulse">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 neon-green">
              Your AI Operating System is here.
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of users who are already working smarter with AgenticOS
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-neon-cyan to-neon-green text-black hover:from-neon-cyan/80 hover:to-neon-green/80 font-bold px-12 py-4 text-xl group"
            >
              Launch AgenticOS
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
      </div>
    </ProtectedRoute>
  );
}
