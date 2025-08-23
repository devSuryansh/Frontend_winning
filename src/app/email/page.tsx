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
                <Card className="glassmorphism border border-gray-700">
                  <CardHeader className="text-center border-b border-gray-700">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-white">
                          Compose Email
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          AI-powered email composition
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
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
                              <div className="bg-yellow-900/20 border border-yellow-500/50 rounded p-3 mt-2">
                                <div className="flex items-center gap-2 text-sm mb-2">
                                  <Key className="w-4 h-4 text-yellow-400" />
                                  <span className="text-yellow-300 font-medium">
                                    Gmail Authentication Required
                                  </span>
                                </div>
                                <p className="text-xs text-yellow-200 mb-3">
                                  You need to authenticate with Gmail to send
                                  emails. Click the button below to authorize
                                  access.
                                </p>

                                {/* Debug info */}
                                <div className="text-xs text-gray-400 mb-2 p-2 bg-gray-800/50 rounded">
                                  <div>
                                    OAuth URL:{" "}
                                    {response.oauth_url || "Not provided"}
                                  </div>
                                  <div>
                                    Needs Auth:{" "}
                                    {response.needs_authentication
                                      ? "Yes"
                                      : "No"}
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  {response.oauth_url ? (
                                    <Button
                                      onClick={() =>
                                        window.open(
                                          response.oauth_url,
                                          "_blank"
                                        )
                                      }
                                      size="sm"
                                      className="bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Authenticate Gmail
                                    </Button>
                                  ) : (
                                    <div className="text-xs text-red-300">
                                      OAuth URL not found in response
                                    </div>
                                  )}
                                  <Button
                                    onClick={() =>
                                      handleSubmit({
                                        preventDefault: () => {},
                                      } as React.FormEvent)
                                    }
                                    size="sm"
                                    variant="outline"
                                    className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-900/20"
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
                      <div className="space-y-2">
                        <Label
                          htmlFor="recipientEmail"
                          className="text-white font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-neon-cyan" />
                            Recipient Email Address
                          </div>
                        </Label>
                        <Input
                          id="recipientEmail"
                          type="email"
                          placeholder="recipient@example.com"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-neon-cyan focus:ring-neon-cyan"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      {/* Email Subject */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-white font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-neon-cyan" />
                            Email Subject
                          </div>
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="e.g., 'Follow up on project proposal', 'Schedule a meeting', 'Thank you for your time'"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-neon-cyan focus:ring-neon-cyan"
                          required
                          disabled={isLoading}
                        />
                        <p className="text-sm text-gray-400">
                          AI will generate professional email content based on
                          your subject line
                        </p>
                      </div>

                      {/* AI Features Preview */}
                      <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-neon-cyan" />
                          <span className="text-white font-medium">
                            Portia AI will handle:
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                            <span>Generate email content from subject</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                            <span>Professional tone & formatting</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                            <span>Context-appropriate messaging</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                            <span>Gmail integration & delivery</span>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-400 bg-gray-800/50 rounded p-2">
                          <strong>How it works:</strong> Just provide the
                          recipient and subject line. AI will generate
                          appropriate email content and send it via your Gmail
                          account.
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center pt-4">
                        <Button
                          type="submit"
                          disabled={isLoading || !subject || !recipientEmail}
                          className="bg-gradient-to-r from-neon-cyan to-blue-500 text-black hover:from-neon-cyan/80 hover:to-blue-500/80 font-bold px-12 py-4 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                              <span>Sending Email...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              <span>Send Email</span>
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
