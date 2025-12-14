'use client';

/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  ariaLabel?: string;
}

export function ChatInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message...",
  ariaLabel = "Chat message input"
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't block typing - validate after submission
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled || isSubmitting) {
      return;
    }

    // Keep submit button enabled until request starts (Vercel guideline)
    setIsSubmitting(true);
    
    try {
      await onSendMessage(trimmedMessage);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      
      // Focus back to textarea for continuous typing
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [message, disabled, isSubmitting, onSendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Vercel guideline: Enter submits, Cmd/Ctrl+Enter in textarea adds newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea with performance optimization
    const textarea = e.target;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 120);
    textarea.style.height = newHeight + 'px';
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    // Vercel guideline: Don't block paste functionality
    // Allow natural paste behavior
  }, []);

  useEffect(() => {
    // Autofocus on desktop when there's a single primary input
    if (!disabled && !isSubmitting && textareaRef.current) {
      // Only autofocus on desktop to avoid mobile keyboard layout shift
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        textareaRef.current.focus();
      }
    }
  }, [disabled, isSubmitting]);

  // Handle unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (message.trim() && !isSubmitting) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [message, isSubmitting]);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 safe-area-inset-bottom">
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="max-w-4xl mx-auto p-4"
        aria-label="Send message form"
        noValidate
      >
        <div className="relative flex items-end space-x-3">
          <div className="flex-1 relative">
            <label 
              htmlFor="message-input" 
              className="sr-only"
            >
              {ariaLabel}
            </label>
            <textarea
              id="message-input"
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={`${placeholder}…`}
              disabled={disabled || isSubmitting}
              aria-describedby="message-help"
              aria-label={ariaLabel}
              aria-invalid={message.length > 4000}
              className={`
                w-full resize-none rounded-2xl border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                px-4 py-3 pr-12 placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 font-medium
                ${disabled || isSubmitting ? 'cursor-not-allowed' : 'cursor-text'}
                hit-target
              `}
              rows={1}
              style={{ 
                minHeight: '48px', 
                maxHeight: '120px',
                fontSize: 'max(16px, 1em)' // Prevent iOS zoom
              }}
              spellCheck={true}
            />
            
            {/* Character count with proper contrast */}
            {message.length > 0 && (
              <div className="absolute bottom-1 right-12 text-xs text-gray-500 dark:text-gray-400 optical-center">
                {message.length > 4000 ? (
                  <span className="text-red-500 dark:text-red-400">
                    {message.length}/4000
                  </span>
                ) : (
                  message.length
                )}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled || isSubmitting}
            aria-label={isSubmitting ? "Sending message…" : "Send message"}
            className={`
              icon-button rounded-2xl transition-all duration-200 transform
              ${!message.trim() || disabled || isSubmitting
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-ambient hover:shadow-lg active:scale-95'
              }
            `}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
        
        {/* Helper text with proper accessibility */}
        <div 
          id="message-help" 
          className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center"
          role="note"
        >
          Press Enter to send, Shift+Enter for new line
        </div>
        
        {/* Screen reader announcements */}
        <div aria-live="polite" className="sr-only">
          {isSubmitting && "Sending message…"}
          {message.length > 4000 && "Message too long"}
        </div>
      </form>
    </div>
  );
}