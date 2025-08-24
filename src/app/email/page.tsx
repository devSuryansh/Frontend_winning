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
                Email Agent
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Let AI handle your email communication intelligently
              </p>
            </motion.div>
          </div>
        </section>

        {/* Email Interface */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="glassmorphism border border-gray-700 shadow-2xl shadow-cyan-500/10">
                  <CardHeader className="text-center border-b border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Mail className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-3xl font-bold text-white mb-2">
                          AI Email Composer
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-base">
                          Intelligent email generation powered by Portia AI
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
                            ? "bg-green-900/20 border-green-500/50 text-green-300"
                            : "bg-red-900/20 border-red-500/50 text-red-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {response.success ? (
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">
                              {response.success
                                ? "Email Sent Successfully!"
                                : "Email Failed"}
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
                                      Gmail Authentication Required
                                    </h4>
                                    <p className="text-amber-300/80 text-xs">
                                      Connect your Gmail account to send emails
                                    </p>
                                  </div>
                                </div>

                                <p className="text-amber-100/90 text-sm mb-4 leading-relaxed">
                                  To send emails through Gmail, you need to
                                  authenticate your account. This is a secure
                                  one-time setup that allows Portia AI to send
                                  emails on your behalf.
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
                                      Connect Gmail Account
                                    </Button>
                                  ) : (
                                    <div className="text-sm text-red-300 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                                      <AlertCircle className="w-4 h-4 inline mr-2" />
                                      Authentication URL unavailable. Please try
                                      again.
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
                                    <Send className="w-4 h-4 mr-2" />
                                    Try Again
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                            {response.success && (
                              <Button
                                onClick={resetForm}
                                variant="outline"
                                size="sm"
                                className="mt-2 border-green-500/50 text-green-300 hover:bg-green-900/20"
                              >
                                Send Another Email
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Recipient Email */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="recipientEmail"
                          className="text-white font-semibold text-base"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <span>Recipient Email Address</span>
                          </div>
                        </Label>
                        <div className="relative">
                          <Input
                            id="recipientEmail"
                            type="email"
                            placeholder="Enter recipient's email address..."
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            className="bg-gray-900/60 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-base rounded-xl shadow-inner"
                            required
                            disabled={isLoading}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Mail className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {/* Email Subject */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="subject"
                          className="text-white font-semibold text-base"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <MessageSquare className="w-4 h-4 text-white" />
                            </div>
                            <span>Email Subject</span>
                          </div>
                        </Label>
                        <div className="relative">
                          <Input
                            id="subject"
                            type="text"
                            placeholder="Describe what your email is about..."
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="bg-gray-900/60 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 h-12 text-base rounded-xl shadow-inner"
                            required
                            disabled={isLoading}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Sparkles className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-3">
                          <p className="text-sm text-purple-200 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            AI will craft professional email content based on
                            your subject line
                          </p>
                        </div>
                      </div>

                      {/* AI Features Preview */}
                      <div className="bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-cyan-500/30 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">
                              Portia AI Magic
                            </h3>
                            <p className="text-cyan-200 text-sm">
                              Advanced email intelligence at work
                            </p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-200 text-sm">
                              Smart content generation
                            </span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-200 text-sm">
                              Professional tone
                            </span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-200 text-sm">
                              Context awareness
                            </span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-200 text-sm">
                              Gmail integration
                            </span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-lg p-4 border border-gray-600/50">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Sparkles className="w-3 h-3 text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-sm mb-1">
                                How it works
                              </h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                Simply provide the recipient and subject line.
                                Our AI analyzes the context, generates
                                professional email content, and delivers it
                                through your Gmail account with perfect
                                formatting and tone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center pt-6">
                        <Button
                          type="submit"
                          disabled={isLoading || !subject || !recipientEmail}
                          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white font-bold px-16 py-6 text-xl rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Crafting & Sending...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                              <span>Generate & Send Email</span>
                              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </div>
                          )}
                        </Button>
                      </div>
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
