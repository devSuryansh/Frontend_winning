"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Globe, CheckCircle, XCircle, Download } from "lucide-react";
import { DocumentHistoryItem } from "@/types/document";
import { apiCall, API_ENDPOINTS } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export interface DocumentHistoryRef {
  addToHistory: (item: Omit<DocumentHistoryItem, 'id' | 'timestamp'>) => void;
}

const DocumentHistory = forwardRef<DocumentHistoryRef>((_, ref) => {
  const [documentHistory, setDocumentHistory] = useState<DocumentHistoryItem[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    // Load document history from localStorage
    const savedHistory = localStorage.getItem('document_history');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setDocumentHistory(parsed.map((item: DocumentHistoryItem & { timestamp: string }) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })));
    }
  }, []);

  const addToHistory = (item: Omit<DocumentHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: DocumentHistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    const updatedHistory = [newItem, ...documentHistory].slice(0, 10); // Keep last 10 documents
    setDocumentHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem('document_history', JSON.stringify(updatedHistory));
  };

  useImperativeHandle(ref, () => ({
    addToHistory,
  }));

  const handleDownload = async (filename: string) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await apiCall(`${API_ENDPOINTS.DOWNLOAD_DOCS}/${filename}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (documentHistory.length === 0) {
    return null;
  }

  return (
    <Card className="glassmorphism border border-gray-700 mt-8 shadow-xl shadow-emerald-500/10">
      <CardHeader className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-b border-gray-700">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold">Document History</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-gradient-to-b from-gray-900/20 to-gray-900/5">
        <div className="space-y-4">
          {documentHistory.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-200 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    doc.success 
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                      : 'bg-gradient-to-br from-red-500 to-rose-600'
                  }`}>
                    {doc.success ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <XCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-200 truncate font-medium">{doc.topic}</span>
                    <Badge className="bg-gray-700/50 text-gray-300 text-xs">
                      {doc.output_format.toUpperCase()}
                    </Badge>
                  </div>
                  {doc.urls && doc.urls.length > 0 && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                        <Globe className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-300">
                        {doc.urls.length} source{doc.urls.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  {doc.error && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-2 mt-2">
                      <p className="text-xs text-red-300 truncate">{doc.error}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={doc.success ? "default" : "destructive"} 
                    className={`text-xs font-medium ${
                      doc.success 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                        : 'bg-red-500/20 text-red-300 border-red-500/50'
                    }`}
                  >
                    {doc.success ? "✓ Generated" : "✗ Failed"}
                  </Badge>
                  {doc.success && doc.file_path && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(doc.file_path!.split('/').pop()!)}
                      className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/20 h-6 px-2"
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {doc.timestamp.toLocaleTimeString([], { 
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

DocumentHistory.displayName = "DocumentHistory";

export default DocumentHistory;