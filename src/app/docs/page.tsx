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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  FileText,
  BookOpen,
  Globe,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Key,
  ExternalLink,
  Plus,
  X,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { GenerateDocumentResponse } from "@/types/document";
import { apiCall, API_ENDPOINTS,API_BASE_URL } from "@/lib/api";
import DocumentHistory, { DocumentHistoryRef } from "@/components/DocumentHistory";

export default function DocsPage() {
  const [topic, setTopic] = useState("");
  const [urls, setUrls] = useState<string[]>([""]);
  const [outputFormat, setOutputFormat] = useState<string>("markdown");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<GenerateDocumentResponse | null>(null);
  const { getToken } = useAuth();
  const documentHistoryRef = useRef<DocumentHistoryRef>(null);

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index: number) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const filteredUrls = urls.filter(url => url.trim() !== "");
      
      const requestBody = {
        topic: topic,
        urls: filteredUrls.length > 0 ? filteredUrls : undefined,
        output_format: outputFormat,
      };

      const response = await apiCall(API_ENDPOINTS.GENERATE_DOCS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data: GenerateDocumentResponse = await response.json();
      setResponse(data);

      // Add to document history
      if (documentHistoryRef.current) {
        documentHistoryRef.current.addToHistory({
          topic: topic,
          urls: filteredUrls.length > 0 ? filteredUrls : undefined,
          output_format: outputFormat,
          success: data.success,
          error: data.error,
          file_path: data.file_path,
        });
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate documentation");
      }
    } catch (error) {
      const errorResponse = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        user_id: "",
      };
      setResponse(errorResponse);

      // Add failed attempt to history
      if (documentHistoryRef.current) {
        documentHistoryRef.current.addToHistory({
          topic: topic,
          urls: urls.filter(url => url.trim() !== ""),
          output_format: outputFormat,
          success: false,
          error: errorResponse.error,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTopic("");
    setUrls([""]);
    setOutputFormat("markdown");
    setResponse(null);
  };

  const handleDownload = async () => {
    if (response?.file_path) {
      try {
        const filename = response.file_path.split('/').pop();
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }

        const downloadResponse = await apiCall(`${API_ENDPOINTS.DOWNLOAD_DOCS}/${filename}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (downloadResponse.ok) {
          const blob = await downloadResponse.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename || 'document';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen grid-background">
        {/* Header */}
        <section className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <Link href="/agents">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Agents
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-cyan">
                Documentation Agent
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Generate comprehensive documentation with AI-powered research and content creation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Documentation Interface */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="glassmorphism border border-gray-700 shadow-2xl shadow-emerald-500/10">
                  <CardHeader className="text-center border-b border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-3xl font-bold text-white mb-2">
                          AI Documentation Generator
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-base">
                          Intelligent document creation powered by Portia AI
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8 bg-gradient-to-b from-gray-900/30 to-gray-900/10">
                    {/* Response Display */}
                    {response && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-4 rounded-lg border ${
                          response.success
                            ? "bg-emerald-900/20 border-emerald-500/50 text-emerald-300"
                            : "bg-red-900/20 border-red-500/50 text-red-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {response.success ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">
                              {response.success
                                ? "Documentation Generated Successfully!"
                                : "Documentation Generation Failed"}
                            </h4>
                            {response.result && (
                              <p className="text-sm opacity-90 mb-2">
                                {response.result}
                              </p>
                            )}
                            {response.error && (
                              <p className="text-sm opacity-90 mb-2">
                                {response.error}
                              </p>
                            )}
                            {response.needs_authentication && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border border-amber-500/40 rounded-xl p-4 mt-3 backdrop-blur-sm"
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <Key className="w-5 h-5 text-black" />
                                  </div>
                                  <div>
                                    <h4 className="text-amber-200 font-semibold text-sm">
                                      Authentication Required
                                    </h4>
                                    <p className="text-amber-300/80 text-xs">
                                      Additional permissions needed for document generation
                                    </p>
                                  </div>
                                </div>
                                
                                <p className="text-amber-100/90 text-sm mb-4 leading-relaxed">
                                  To generate comprehensive documentation, you may need to authenticate 
                                  with external services for content access and file creation.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                  {response.oauth_url ? (
                                    <Button
                                      onClick={() =>
                                        window.open(
                                          response.oauth_url,
                                          "_blank"
                                        )
                                      }
                                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold shadow-lg hover:shadow-amber-500/25 transition-all duration-200"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Authenticate Service
                                    </Button>
                                  ) : (
                                    <div className="text-sm text-red-300 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                                      <AlertCircle className="w-4 h-4 inline mr-2" />
                                      Authentication URL unavailable. Please try again.
                                    </div>
                                  )}
                                  <Button
                                    onClick={() =>
                                      handleSubmit({
                                        preventDefault: () => {},
                                      } as React.FormEvent)
                                    }
                                    variant="outline"
                                    className="border-amber-500/50 text-amber-200 hover:bg-amber-900/20 hover:border-amber-400"
                                  >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Try Again
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                            {response.success && (
                              <div className="flex gap-2 mt-3">
                                {response.file_path && (
                                  <Button
                                    onClick={handleDownload}
                                    variant="outline"
                                    size="sm"
                                    className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/20"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Document
                                  </Button>
                                )}
                                <Button
                                  onClick={resetForm}
                                  variant="outline"
                                  size="sm"
                                  className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/20"
                                >
                                  Generate Another Document
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Topic Input */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="topic"
                          className="text-white font-semibold text-base"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <span>Documentation Topic</span>
                          </div>
                        </Label>
                        <div className="relative">
                          <Input
                            id="topic"
                            type="text"
                            placeholder="e.g., 'React Hooks', 'Machine Learning Basics', 'API Documentation'"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="bg-gray-900/60 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 text-base rounded-xl shadow-inner"
                            required
                            disabled={isLoading}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {/* URLs Input */}
                      <div className="space-y-3">
                        <Label className="text-white font-semibold text-base">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <Globe className="w-4 h-4 text-white" />
                            </div>
                            <span>Source URLs (Optional)</span>
                          </div>
                        </Label>
                        <div className="space-y-2">
                          {urls.map((url, index) => (
                            <div key={index} className="flex gap-2">
                              <div className="relative flex-1">
                                <Input
                                  type="url"
                                  placeholder="https://example.com/documentation"
                                  value={url}
                                  onChange={(e) => updateUrl(index, e.target.value)}
                                  className="bg-gray-900/60 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 h-10 text-sm rounded-lg shadow-inner"
                                  disabled={isLoading}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <Globe className="w-4 h-4 text-gray-400" />
                                </div>
                              </div>
                              {urls.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeUrlField(index)}
                                  className="border-red-500/50 text-red-300 hover:bg-red-900/20 h-10 w-10 p-0"
                                  disabled={isLoading}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addUrlField}
                            className="border-blue-500/50 text-blue-300 hover:bg-blue-900/20"
                            disabled={isLoading}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add URL
                          </Button>
                        </div>
                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-3">
                          <p className="text-sm text-blue-200 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-400" />
                            Leave empty to let AI research and find relevant sources automatically
                          </p>
                        </div>
                      </div>

                      {/* Output Format */}
                      <div className="space-y-3">
                        <Label className="text-white font-semibold text-base">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <span>Output Format</span>
                          </div>
                        </Label>
                        <Select value={outputFormat} onValueChange={setOutputFormat} disabled={isLoading}>
                          <SelectTrigger className="bg-gray-900/60 border-gray-600 text-white focus:border-purple-400 focus:ring-purple-400/20 h-12 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="markdown">Markdown (.md)</SelectItem>
                            <SelectItem value="html">HTML (.html)</SelectItem>
                            <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                            <SelectItem value="docx">Word Document (.docx)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* AI Features Preview */}
                      <div className="bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-cyan-900/20 rounded-xl p-6 border border-emerald-500/30 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">
                              Portia AI Documentation Magic
                            </h3>
                            <p className="text-emerald-200 text-sm">
                              Advanced research and content generation
                            </p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-200 text-sm">Web research & content extraction</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-200 text-sm">Professional formatting</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-200 text-sm">Structured organization</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-200 text-sm">Multiple output formats</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-lg p-4 border border-gray-600/50">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Sparkles className="w-3 h-3 text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-sm mb-1">How it works</h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                Provide a topic and optional source URLs. Our AI will research the topic, 
                                extract relevant information, organize it into a comprehensive document 
                                with proper structure, and deliver it in your preferred format.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center pt-6">
                        <Button
                          type="submit"
                          disabled={isLoading || !topic}
                          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 text-white font-bold px-16 py-6 text-xl rounded-2xl shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Generating Documentation...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              </div>
                              <span>Generate Documentation</span>
                              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </div>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Document History */}
              <DocumentHistory ref={documentHistoryRef} />
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}