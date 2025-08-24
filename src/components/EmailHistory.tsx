"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Mail, User, CheckCircle, XCircle } from "lucide-react";

interface EmailHistoryItem {
  id: string;
  to: string;
  subject: string;
  success: boolean;
  timestamp: Date;
  error?: string;
}

export interface EmailHistoryRef {
  addToHistory: (item: Omit<EmailHistoryItem, 'id' | 'timestamp'>) => void;
}

const EmailHistory = forwardRef<EmailHistoryRef>((props, ref) => {
  const [emailHistory, setEmailHistory] = useState<EmailHistoryItem[]>([]);

  useEffect(() => {
    // Load email history from localStorage
    const savedHistory = localStorage.getItem('email_history');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setEmailHistory(parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })));
    }
  }, []);

  const addToHistory = (item: Omit<EmailHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: EmailHistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    const updatedHistory = [newItem, ...emailHistory].slice(0, 10); // Keep last 10 emails
    setEmailHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem('email_history', JSON.stringify(updatedHistory));
  };

  useImperativeHandle(ref, () => ({
    addToHistory,
  }));

  if (emailHistory.length === 0) {
    return null;
  }

  return (
    <Card className="glassmorphism border border-gray-700 mt-8 shadow-xl shadow-purple-500/10">
      <CardHeader className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-b border-gray-700">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold">Email History</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-gradient-to-b from-gray-900/20 to-gray-900/5">
        <div className="space-y-4">
          {emailHistory.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-200 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    email.success 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                      : 'bg-gradient-to-br from-red-500 to-rose-600'
                  }`}>
                    {email.success ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <XCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-200 truncate font-medium">{email.to}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                      <Mail className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-white truncate">{email.subject}</span>
                  </div>
                  {email.error && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-2 mt-2">
                      <p className="text-xs text-red-300 truncate">{email.error}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <Badge 
                  variant={email.success ? "default" : "destructive"} 
                  className={`text-xs font-medium ${
                    email.success 
                      ? 'bg-green-500/20 text-green-300 border-green-500/50' 
                      : 'bg-red-500/20 text-red-300 border-red-500/50'
                  }`}
                >
                  {email.success ? "✓ Sent" : "✗ Failed"}
                </Badge>
                <span className="text-xs text-gray-400 font-mono">
                  {email.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

EmailHistory.displayName = "EmailHistory";

export default EmailHistory;