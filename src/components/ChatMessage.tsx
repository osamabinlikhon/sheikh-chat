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
import { useState, useCallback } from 'react';

interface ChatMessageProps {
  message: Message;
  previousMessage?: Message;
  isLast: boolean;
}

export function ChatMessage({ message, previousMessage, isLast }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const isUser = message.role === 'user';
  const showDateSeparator = !previousMessage || 
    formatDate(message.timestamp) !== formatDate(previousMessage.timestamp);

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(message.content);
      setCopied(true);
      setCopyError(false);
      // Vercel guideline: show feedback for 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  }, [message.content]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCopy();
    }
  }, [handleCopy]);

  return (
    <article className="w-full" role="article" aria-label={`${isUser ? 'Your' : 'Sheikh Chat'} message`}>
      {showDateSeparator && (
        <div className="flex items-center justify-center my-4" role="separator" aria-label={`${formatDate(message.timestamp)}`}>
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
            {formatDate(message.timestamp)}
          </div>
        </div>
      )}
      
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 message-fade-in`}>
        <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
          {/* Message Content */}
          <div
            className={`
              relative group rounded-2xl px-4 py-3 break-words shadow-ambient
              ${isUser
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-md'
              }
            `}
            role="group"
            aria-label="Message content"
          >
            <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
              {message.content}
            </div>
            
            {/* Copy button - Vercel guideline: generous hit targets */}
            <button
              onClick={handleCopy}
              onKeyDown={handleKeyDown}
              className={`
                icon-button absolute top-2 right-2 opacity-0 group-hover:opacity-100 
                transition-opacity duration-200 rounded-md
                ${isUser 
                  ? 'hover:bg-primary-foreground/10 text-primary-foreground/70' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
                }
              `}
              title={copied ? "Copied!" : "Copy message"}
              aria-label={copied ? "Message copied to clipboard" : "Copy message to clipboard"}
              aria-live="polite"
            >
              {copied ? (
                <Check className="w-3 h-3" aria-hidden="true" />
              ) : copyError ? (
                <span className="text-xs">!</span>
              ) : (
                <Copy className="w-3 h-3" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Timestamp with proper accessibility */}
          <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 ${
            isUser ? 'text-right' : 'text-left'
          }`} aria-label={`Sent at ${formatTime(message.timestamp)}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
      
      {/* Screen reader announcements */}
      <div aria-live="polite" className="sr-only">
        {copied && "Message copied to clipboard"}
        {copyError && "Failed to copy message"}
      </div>
    </article>
  );
}