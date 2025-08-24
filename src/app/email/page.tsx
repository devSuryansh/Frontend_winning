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
import {
  ArrowLeft,
  Send,
  Mail,
  User,
  MessageSquare,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Key,
  ExternalLink,
  Bot,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { SendEmailResponse } from "@/types/email";
import { apiCall, API_ENDPOINTS } from "@/lib/api";
import EmailHistory, { EmailHistoryRef } from "@/components/EmailHistory";

export default function EmailPage() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<SendEmailResponse | null>(null);
  const { getToken } = useAuth();
  const emailHistoryRef = useRef<EmailHistoryRef>(null);

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
    setResponse(null);

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const requestBody = {
        to: recipientEmail,
        subject: subject,
        body: "Please generate appropriate content for this email based on the subject line.",
      };

      const response = await apiCall(API_ENDPOINTS.SEND_EMAIL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data: SendEmailResponse = await response.json();

      // Debug: Log the response to see what we're getting
      console.log("Backend response:", data);
      console.log("OAuth URL:", data.oauth_url);
      console.log("Needs auth:", data.needs_authentication);

      setResponse(data);

      // Add to email history
      if (emailHistoryRef.current) {
        emailHistoryRef.current.addToHistory({
          to: recipientEmail,
          subject: subject,
          success: data.success,
          error: data.error,
        });
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
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
      if (emailHistoryRef.current) {
        emailHistoryRef.current.addToHistory({
          to: recipientEmail,
          subject: subject,
          success: false,
          error: errorResponse.error,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setRecipientEmail("");
    setSubject("");
    setResponse(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/5 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full" />
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
              className="text-center mb-20"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm mb-8"
              >
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  AI-Powered Email Assistant
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block animate-gradient-x">
                  Email Agent
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              >
                Let AI handle your email communication with intelligence and
                professionalism
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Email Interface */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group"
              >
                <Card className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/10 overflow-hidden">
                  {/* Card Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent opacity-50" />

                  <CardHeader className="relative text-center border-b border-white/10 pb-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex items-center justify-center gap-4 mb-6"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Mail className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-lg" />
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-3xl font-bold text-white mb-2">
                          Compose Email
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-lg">
                          AI-powered email composition and delivery
                        </CardDescription>
                      </div>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="relative p-8 space-y-8">
                    {response && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-6 rounded-xl border backdrop-blur-sm ${
                          response.success
                            ? "bg-green-500/10 border-green-400/30 text-green-300"
                            : "bg-red-500/10 border-red-400/30 text-red-300"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {response.success ? (
                              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-3">
                            <h4 className="font-semibold text-lg">
                              {response.success
                                ? "Email Sent Successfully!"
                                : "Email Failed"}
                            </h4>
                            {/* {response.result && (
                              <p className="text-sm opacity-90">
                                {response.result}
                              </p>
                            )} */}
                            {response.error && (
                              <p className="text-sm opacity-90">
                                {response.error}
                              </p>
                            )}
                            {response.needs_authentication && (
                              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4 mt-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                    <Key className="w-4 h-4 text-yellow-400" />
                                  </div>
                                  <span className="text-yellow-300 font-semibold">
                                    Gmail Authentication Required
                                  </span>
                                </div>
                                <p className="text-sm text-yellow-200 mb-4">
                                  You need to authenticate with Gmail to send
                                  emails. Click the button below to authorize
                                  access.
                                </p>

                                <div className="flex flex-wrap gap-3">
                                  {response.oauth_url ? (
                                    <Button
                                      onClick={() =>
                                        window.open(
                                          response.oauth_url,
                                          "_blank"
                                        )
                                      }
                                      className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Authenticate Gmail
                                    </Button>
                                  ) : (
                                    <div className="text-sm text-red-300 p-2 bg-red-900/20 rounded">
                                      OAuth URL not found in response
                                    </div>
                                  )}
                                  <Button
                                    onClick={() =>
                                      handleSubmit({
                                        preventDefault: () => {},
                                      } as React.FormEvent)
                                    }
                                    variant="outline"
                                    className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/10"
                                  >
                                    <Send className="w-4 h-4 mr-2" />
                                    Retry Send
                                  </Button>
                                </div>
                              </div>
                            )}
                            {response.success && (
                              <Button
                                onClick={resetForm}
                                variant="outline"
                                className="border-green-400/30 text-green-300 hover:bg-green-500/10"
                              >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Send Another Email
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Recipient Email */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-3"
                      >
                        <Label
                          htmlFor="recipientEmail"
                          className="text-white font-semibold text-lg"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-400" />
                            </div>
                            Recipient Email Address
                          </div>
                        </Label>
                        <div className="relative">
                          <Input
                            id="recipientEmail"
                            type="email"
                            placeholder="recipient@example.com"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 h-14 text-lg rounded-xl backdrop-blur-sm"
                            required
                            disabled={isLoading}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </motion.div>

                      {/* Email Subject */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="space-y-3"
                      >
                        <Label
                          htmlFor="subject"
                          className="text-white font-semibold text-lg"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                              <MessageSquare className="w-4 h-4 text-cyan-400" />
                            </div>
                            Email Subject
                          </div>
                        </Label>
                        <div className="relative">
                          <Input
                            id="subject"
                            type="text"
                            placeholder="e.g., 'Follow up on project proposal', 'Schedule a meeting', 'Thank you for your time'"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-14 text-lg rounded-xl backdrop-blur-sm"
                            required
                            disabled={isLoading}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          AI will generate professional email content based on
                          your subject line
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
                            AI Agent Capabilities
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Generate email content from subject",
                            "Professional tone & formatting",
                            "Context-appropriate messaging",
                            "Gmail integration & delivery",
                          ].map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 text-gray-300"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-start gap-3">
                            <Bot className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-white font-medium mb-1">
                                How it works:
                              </h4>
                              <p className="text-sm text-gray-400">
                                Just provide the recipient and subject line. AI
                                will generate appropriate email content and send
                                it via your Gmail account.
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
                          disabled={isLoading || !subject || !recipientEmail}
                          className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:via-cyan-500 hover:to-blue-500 text-white font-bold px-16 py-4 text-lg rounded-xl border-0 shadow-2xl shadow-blue-500/25 group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {isLoading ? (
                            <div className="relative flex items-center justify-center gap-3">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Sending Email...</span>
                            </div>
                          ) : (
                            <div className="relative flex items-center justify-center gap-3">
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              <span>Send Email</span>
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Email History */}
              <EmailHistory ref={emailHistoryRef} />
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
