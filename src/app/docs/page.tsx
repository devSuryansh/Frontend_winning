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
  FileText,
  PenTool,
  Edit3,
  Share2,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Bot,
  Zap,
  Search,
  BookOpen,
  Type,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { apiCall, API_ENDPOINTS } from "@/lib/api";
import { CreateDocRequest, CreateDocResponse } from "@/types/docs";

export default function DocsPage() {
  const [documentTitle, setDocumentTitle] = useState("");
  const [contentPrompt, setContentPrompt] = useState("");
  const [selectedDocType, setSelectedDocType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<CreateDocResponse | null>(null);
  const { getToken } = useAuth();

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
    console.log("Form submitted with:", {
      documentTitle,
      contentPrompt,
      selectedDocType,
    });

    setIsLoading(true);
    setResponse(null);

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const requestBody: CreateDocRequest = {
        title: documentTitle,
        description: contentPrompt,
        content_type: selectedDocType || "general",
      };

      console.log("Sending request with body:", requestBody);

      const apiResponse = await apiCall(API_ENDPOINTS.CREATE_DOCS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("API Response status:", apiResponse.status);
      console.log("API Response headers:", apiResponse.headers);

      const data: CreateDocResponse = await apiResponse.json();

      // Debug: Log the response to see what we're getting
      console.log("Backend response:", data);

      setResponse(data);

      // Note: apiCall already throws on !response.ok, so we don't need to check again
    } catch (error) {
      console.error("Error creating document:", error);

      // For testing purposes, let's add a fallback simulation
      // Remove this once the backend is ready
      if (error instanceof Error && error.message.includes("API call failed")) {
        console.log("API not available, using fallback simulation...");
        setTimeout(() => {
          const simulatedResponse: CreateDocResponse = {
            success: true,
            doc_id: "test-doc-" + Date.now(),
            doc_title: documentTitle,
            doc_url: "https://docs.google.com/document/d/test",
            result: "Document created successfully (simulated)",
            user_id: "test-user",
            service: "google_docs",
            action: "create_document",
          };
          setResponse(simulatedResponse);
          setIsLoading(false);
        }, 2000);
        return;
      }

      const errorResponse: CreateDocResponse = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        user_id: "",
      };
      setResponse(errorResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const documentTypes = [
    {
      id: "business-proposal",
      title: "Business Proposal",
      description: "Professional proposals and business documents",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Executive Summary",
        "Market Analysis",
        "Financial Projections",
      ],
    },
    {
      id: "technical-report",
      title: "Technical Report",
      description: "Detailed technical documentation and reports",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
      features: ["Research Data", "Technical Analysis", "Conclusions"],
    },
    {
      id: "creative-writing",
      title: "Creative Content",
      description: "Blog posts, articles, and creative writing",
      icon: PenTool,
      color: "from-purple-500 to-pink-500",
      features: ["Engaging Content", "SEO Optimization", "Creative Style"],
    },
    {
      id: "academic-paper",
      title: "Academic Paper",
      description: "Research papers and academic documents",
      icon: Search,
      color: "from-orange-500 to-red-500",
      features: ["Citations", "Bibliography", "Academic Format"],
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-green-950/20 to-slate-950">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-green-500/5 to-transparent rounded-full" />
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm mb-8"
              >
                <FileText className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-green-300">
                  Google Docs AI Agent
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent block animate-gradient-x">
                  Docs Agent
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              >
                Intelligent document creation, editing, and collaboration
                powered by advanced AI for professional content generation.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Document Types Grid */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              Choose Document Type
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {documentTypes.map((docType, index) => (
                <motion.div
                  key={docType.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group cursor-pointer ${
                    selectedDocType === docType.id
                      ? "ring-2 ring-green-400"
                      : ""
                  }`}
                  onClick={() => setSelectedDocType(docType.id)}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/20 hover:border-green-400/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${docType.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <docType.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-white mb-2">
                        {docType.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm">
                        {docType.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {docType.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2 text-sm text-gray-300"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400" />
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
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-white">
                        Google Docs AI Assistant
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-lg mt-2">
                        Create professional documents with AI assistance
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
                            {response.success ? "Document Created!" : "Error"}
                          </span>
                        </div>
                        <p className="text-white text-lg">
                          {response.success
                            ? "Document created successfully!"
                            : response.error || "Failed to create document"}
                        </p>

                        {response.success && (
                          <div className="mt-4 p-4 bg-white/5 rounded-lg">
                            <h4 className="text-white font-medium mb-2">
                              Document Details:
                            </h4>
                            <div className="space-y-2 text-sm text-gray-300">
                              <p>
                                <span className="text-green-400">Type:</span>{" "}
                                {selectedDocType
                                  ? documentTypes.find(
                                      (type) => type.id === selectedDocType
                                    )?.title || selectedDocType
                                  : "General"}
                              </p>
                              <p>
                                <span className="text-green-400">Title:</span>{" "}
                                {documentTitle}
                              </p>
                              {response.doc_id && (
                                <p>
                                  <span className="text-green-400">
                                    Document ID:
                                  </span>{" "}
                                  {response.doc_id}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => setResponse(null)}
                          className="flex-1 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-500 hover:via-emerald-500 hover:to-green-500 text-white font-bold py-3 text-lg rounded-xl border-0 shadow-lg shadow-green-500/25"
                        >
                          <FileText className="w-5 h-5 mr-2" />
                          Create Another Document
                        </Button>
                        {response.doc_url ? (
                          <Button
                            variant="outline"
                            className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 py-3 text-lg rounded-xl"
                            onClick={() =>
                              window.open(response.doc_url, "_blank")
                            }
                          >
                            <Share2 className="w-5 h-5 mr-2" />
                            Open in Google Docs
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 py-3 text-lg rounded-xl opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <Share2 className="w-5 h-5 mr-2" />
                            Google Docs URL Pending
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Document Title */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-3"
                      >
                        <Label
                          htmlFor="documentTitle"
                          className="text-white font-semibold text-lg"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                              <Type className="w-4 h-4 text-green-400" />
                            </div>
                            Document Title
                          </div>
                        </Label>
                        <div className="relative">
                          <Input
                            id="documentTitle"
                            type="text"
                            placeholder="e.g., 'Quarterly Business Report', 'Product Launch Proposal', 'Marketing Strategy'"
                            value={documentTitle}
                            onChange={(e) => setDocumentTitle(e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/20 h-14 text-lg rounded-xl backdrop-blur-sm"
                            required
                            disabled={isLoading}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </motion.div>

                      {/* Document Type Selection */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="space-y-3"
                      >
                        <Label className="text-white font-semibold text-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-blue-400" />
                            </div>
                            Document Type
                          </div>
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          {documentTypes.map((docType) => (
                            <div
                              key={docType.id}
                              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                selectedDocType === docType.id
                                  ? "bg-white/10 border-green-400 ring-2 ring-green-400/30"
                                  : "bg-white/5 border-white/20 hover:border-green-400/50 hover:bg-white/8"
                              }`}
                              onClick={() => setSelectedDocType(docType.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 bg-gradient-to-br ${docType.color} rounded-lg flex items-center justify-center`}
                                >
                                  <docType.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-white font-medium">
                                    {docType.title}
                                  </h4>
                                  <p className="text-gray-400 text-sm">
                                    {docType.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Choose the type of document you want to create
                        </p>
                      </motion.div>

                      {/* Content Description */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="space-y-3"
                      >
                        <Label
                          htmlFor="contentPrompt"
                          className="text-white font-semibold text-lg"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                              <Edit3 className="w-4 h-4 text-emerald-400" />
                            </div>
                            Content Description
                          </div>
                        </Label>
                        <div className="relative">
                          <Textarea
                            id="contentPrompt"
                            placeholder="Describe the content you want to create... e.g., 'A comprehensive business proposal for expanding into new markets, including market analysis, financial projections, and implementation timeline'"
                            value={contentPrompt}
                            onChange={(e) => setContentPrompt(e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 min-h-[120px] text-lg rounded-xl backdrop-blur-sm resize-none"
                            required
                            disabled={isLoading}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          AI will generate structured, professional content
                          based on your description
                        </p>
                      </motion.div>

                      {/* AI Features Preview */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.65 }}
                        className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-semibold text-lg">
                            Google Docs AI Features
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Professional document structure",
                            "Grammar & style optimization",
                            "Research-backed content",
                            "Auto-formatting & styling",
                            "Collaborative editing setup",
                            "Export to multiple formats",
                          ].map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 text-gray-300"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-start gap-3">
                            <Bot className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-white font-medium mb-1">
                                How it works:
                              </h4>
                              <p className="text-sm text-gray-400">
                                Select a document type, provide a title and
                                content description. AI will create a
                                professionally structured document with relevant
                                content, proper formatting, and collaborative
                                features ready for Google Docs.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.75 }}
                        className="flex justify-center pt-6"
                      >
                        <Button
                          type="submit"
                          disabled={
                            isLoading || !contentPrompt || !documentTitle
                          }
                          onClick={() => {
                            console.log("Button clicked!", {
                              isLoading,
                              contentPrompt: !!contentPrompt,
                              documentTitle: !!documentTitle,
                              selectedDocType: !!selectedDocType,
                              isDisabled:
                                isLoading || !contentPrompt || !documentTitle,
                            });
                          }}
                          className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-500 hover:via-emerald-500 hover:to-green-500 text-white font-bold px-16 py-4 text-lg rounded-xl border-0 shadow-2xl shadow-green-500/25 group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {isLoading ? (
                            <div className="relative flex items-center justify-center gap-3">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Creating Document...</span>
                            </div>
                          ) : (
                            <div className="relative flex items-center justify-center gap-3">
                              <Zap className="w-5 h-5" />
                              <span>Create Document</span>
                              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
