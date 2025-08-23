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
    <Card className="glassmorphism border border-gray-700 mt-8">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-neon-cyan" />
          Recent Emails
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {emailHistory.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-700"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0">
                  {email.success ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300 truncate">{email.to}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white truncate">{email.subject}</span>
                  </div>
                  {email.error && (
                    <p className="text-xs text-red-400 mt-1 truncate">{email.error}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={email.success ? "default" : "destructive"} className="text-xs">
                  {email.success ? "Sent" : "Failed"}
                </Badge>
                <span className="text-xs text-gray-400">
                  {email.timestamp.toLocaleTimeString()}
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