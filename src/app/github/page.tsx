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
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Github,
  GitPullRequest,
  Eye,
  FileText,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Bot,
  Search,
  Folder,
  Bug,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface GitHubResponse {
  success: boolean;
  message: string;
  details?: {
    action: string;
    repository: string;
    task: string;
  };
}

export default function GitHubPage() {
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<GitHubResponse | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setResponse({
        success: true,
        message: "GitHub task completed successfully!",
        details: {
          action: selectedAction,
          repository: repositoryUrl,
          task: taskDescription,
        },
      });
      setIsLoading(false);
    }, 2000);
  };

  const githubActions = [
    {
      id: "code-review",
      title: "Code Review",
      description: "Analyze code quality and suggest improvements",
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
      features: ["Security Analysis", "Performance Review", "Best Practices"],
    },
    {
      id: "pull-request",
      title: "Pull Request Management",
      description: "Create, review, and manage pull requests",
      icon: GitPullRequest,
      color: "from-green-500 to-emerald-500",
      features: ["Auto-merge", "Conflict Resolution", "Review Comments"],
    },
    {
      id: "issue-tracking",
      title: "Issue Management",
      description: "Track bugs, features, and project issues",
      icon: Bug,
      color: "from-orange-500 to-red-500",
      features: ["Bug Detection", "Issue Prioritization", "Auto-labeling"],
    },
    {
      id: "repository-analysis",
      title: "Repository Analysis",
      description: "Comprehensive analysis of repository health",
      icon: Search,
      color: "from-purple-500 to-pink-500",
      features: ["Code Quality", "Dependency Check", "Performance Metrics"],
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        {/* Header */}
        <section className="relative z-10 pt-8 pb-12">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/agents">
                <Button
                  variant="ghost"
                  className="backdrop-blur-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 mb-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Agents
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-16"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm mb-8"
              >
                <Github className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">
                  GitHub AI Agent
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent block animate-gradient-x">
                  GitHub Agent
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              >
                Advanced AI-powered GitHub management for code review,
                repository analysis, and development workflow optimization.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* GitHub Actions Grid */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              Available GitHub Actions
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {githubActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group cursor-pointer ${
                    selectedAction === action.id ? "ring-2 ring-purple-400" : ""
                  }`}
                  onClick={() => setSelectedAction(action.id)}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <action.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-white mb-2">
                        {action.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm">
                        {action.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {action.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2 text-sm text-gray-300"
                          >
                            <CheckCircle className="w-4 h-4 text-purple-400" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Interface */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader className="text-center border-b border-white/10 pb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center gap-4 mb-6"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Github className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-white">
                        GitHub AI Assistant
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg mt-2">
                        Intelligent repository management and code analysis
                      </CardDescription>
                    </div>
                  </motion.div>
                </CardHeader>

                <CardContent className="p-8">
                  {response ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-6"
                    >
                      <div
                        className={`p-6 rounded-xl border ${
                          response.success
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-red-500/10 border-red-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          {response.success ? (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-red-400" />
                          )}
                          <span
                            className={`font-semibold text-lg ${
                              response.success
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {response.success ? "Success!" : "Error"}
                          </span>
                        </div>
                        <p className="text-white text-lg">{response.message}</p>

                        {response.details && (
                          <div className="mt-4 p-4 bg-white/5 rounded-lg">
                            <h4 className="text-white font-medium mb-2">
                              Task Details:
                            </h4>
                            <div className="space-y-2 text-sm text-gray-300">
                              <p>
                                <span className="text-purple-400">Action:</span>{" "}
                                {response.details.action}
                              </p>
                              <p>
                                <span className="text-purple-400">
                                  Repository:
                                </span>{" "}
                                {response.details.repository}
                              </p>
                              <p>
                                <span className="text-purple-400">Task:</span>{" "}
                                {response.details.task}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={() => setResponse(null)}
                        className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold py-3 text-lg rounded-xl border-0 shadow-lg shadow-purple-500/25"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        Start New Task
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Repository URL */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-3"
                      >
                        <Label
                          htmlFor="repositoryUrl"
                          className="text-white font-semibold text-lg"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                              <Folder className="w-4 h-4 text-purple-400" />
                            </div>
                            Repository URL
                          </div>
                        </Label>
                        <div className="relative">
                          <Input
                            id="repositoryUrl"
                            type="url"
                            placeholder="https://github.com/username/repository"
                            value={repositoryUrl}
                            onChange={(e) => setRepositoryUrl(e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 h-14 text-lg rounded-xl backdrop-blur-sm"
                            required
                            disabled={isLoading}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </motion.div>

                      {/* Task Description */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="space-y-3"
                      >
                        <Label
                          htmlFor="taskDescription"
                          className="text-white font-semibold text-lg"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-pink-400" />
                            </div>
                            Task Description
                          </div>
                        </Label>
                        <div className="relative">
                          <Textarea
                            id="taskDescription"
                            placeholder="Describe what you'd like the GitHub agent to do... e.g., 'Review the latest pull request for security issues', 'Analyze code quality in the main branch', 'Create an issue for the new feature request'"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-pink-400 focus:ring-pink-400/20 min-h-[120px] text-lg rounded-xl backdrop-blur-sm resize-none"
                            required
                            disabled={isLoading}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          AI will analyze your repository and execute the
                          requested GitHub operations
                        </p>
                      </motion.div>

                      {/* AI Features Preview */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-semibold text-lg">
                            GitHub AI Capabilities
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Automated code review & analysis",
                            "Pull request management",
                            "Issue tracking & prioritization",
                            "Repository health monitoring",
                            "Security vulnerability scanning",
                            "Performance optimization suggestions",
                          ].map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 text-gray-300"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-start gap-3">
                            <Bot className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-white font-medium mb-1">
                                How it works:
                              </h4>
                              <p className="text-sm text-gray-400">
                                Provide a repository URL and describe your task.
                                The AI agent will analyze your repository,
                                understand the context, and execute the
                                requested GitHub operations with intelligent
                                automation.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex justify-center pt-6"
                      >
                        <Button
                          type="submit"
                          disabled={
                            isLoading ||
                            !taskDescription ||
                            !repositoryUrl ||
                            !selectedAction
                          }
                          className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold px-16 py-4 text-lg rounded-xl border-0 shadow-2xl shadow-purple-500/25 group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {isLoading ? (
                            <div className="relative flex items-center justify-center gap-3">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Processing Task...</span>
                            </div>
                          ) : (
                            <div className="relative flex items-center justify-center gap-3">
                              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                              <span>Execute GitHub Task</span>
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
