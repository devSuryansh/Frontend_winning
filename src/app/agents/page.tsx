"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  FileText, 
  Video, 
  Search, 
  Briefcase, 
  Linkedin, 
  Github, 
  Workflow, 
  ArrowLeft,
  Users,
  Zap,
  CheckCircle,
  MessageSquare,
  Calendar,
  Send,
  FileEdit
} from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AgentsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen grid-background">
      {/* Header */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-cyan">
              Work Agents
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional AI agents designed to handle your work tasks efficiently
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work Agent Cards */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Email Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="/email">
                <Card className="glassmorphism hover:neon-cyan-border transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:glow-pulse">
                      <Mail className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Email Agent</CardTitle>
                    <CardDescription className="text-gray-400">
                      Intelligent email management and communication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Send className="w-5 h-5 text-neon-cyan" />
                        <span>Smart Email Drafting</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <MessageSquare className="w-5 h-5 text-neon-cyan" />
                        <span>Inbox Organization</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-neon-cyan" />
                        <span>Auto-Response</span>
                      </div>
                    </div>
                    <Button className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 mt-4">
                      Launch Email Agent
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Docs Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glassmorphism hover:neon-green-border transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:glow-pulse">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Docs Agent</CardTitle>
                  <CardDescription className="text-gray-400">
                    Document creation and editing assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <FileEdit className="w-5 h-5 text-neon-green" />
                      <span>Document Writing</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Zap className="w-5 h-5 text-neon-green" />
                      <span>Content Generation</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-neon-green" />
                      <span>Format & Style</span>
                    </div>
                  </div>
                  <Button className="w-full bg-neon-green text-black hover:bg-neon-green/80 mt-4">
                    Launch Docs Agent
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* GitHub Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="glassmorphism hover:neon-cyan-border transition-all duration-300 hover:scale-105 cursor-pointer group h-full">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:glow-pulse">
                    <Github className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">GitHub Agent</CardTitle>
                  <CardDescription className="text-gray-400">
                    Code management and development assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Github className="w-5 h-5 text-neon-cyan" />
                      <span>Code Review</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Zap className="w-5 h-5 text-neon-cyan" />
                      <span>Repository Management</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-neon-cyan" />
                      <span>Issue Tracking</span>
                    </div>
                  </div>
                  <Button className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 mt-4">
                    Launch GitHub Agent
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </ProtectedRoute>
  );
}
