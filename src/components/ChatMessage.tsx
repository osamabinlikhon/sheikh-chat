'use client';

/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Message } from '@/types/chat';
import { formatTime, formatDate, copyToClipboard } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ChatMessageProps {
  message: Message;
  previousMessage?: Message;
  isLast: boolean;
}

export function ChatMessage({ message, previousMessage, isLast }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const showDateSeparator = !previousMessage || 
    formatDate(message.timestamp) !== formatDate(previousMessage.timestamp);

  const handleCopy = async () => {
    try {
      await copyToClipboard(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="w-full">
      {showDateSeparator && (
        <div className="flex items-center justify-center my-4">
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
            {formatDate(message.timestamp)}
          </div>
        </div>
      )}
      
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
        <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
          {/* Message Content */}
          <div
            className={`
              relative group rounded-2xl px-4 py-3 break-words
              ${isUser
                ? 'bg-blue-600 text-white rounded-br-md'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-md'
              }
            `}
          >
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>
            
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`
                absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity
                ${isUser 
                  ? 'hover:bg-blue-700 text-blue-100' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
                }
              `}
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}