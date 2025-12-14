'use client';

/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { ChatHeader } from './ChatHeader';
import { useChat } from '@/lib/hooks/useChat';
import { generateAIResponseAction, getAIStatus } from '@/app/actions/chatActions';

export function ChatContainer() {
  const {
    messages,
    isLoading,
    isDarkMode,
    addMessage,
    clearMessages,
    setLoading,
    toggleTheme,
    messagesEndRef,
  } = useChat();

  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [aiStatus, setAiStatus] = useState<{
    configured: boolean;
    provider: string;
    model: string;
  } | null>(null);

  // Check AI status on component mount
  useEffect(() => {
    const checkAIStatus = async () => {
      try {
        const status = await getAIStatus();
        setAiStatus(status);
      } catch (error) {
        console.error('Failed to check AI status:', error);
      }
    };
    checkAIStatus();
  }, []);

  // Vercel guideline: Optimistic UI with rollback on failure
  const handleSendMessage = useCallback(async (content: string) => {
    addMessage(content, 'user');
    setLoading(true);
    setError(null);

    try {
      // Generate AI response using server action
      const response = await generateAIResponseAction(content);
      
      // Add AI response
      addMessage(response, 'assistant');
      setRetryCount(0); // Reset retry count on success
      
      // Update AI status after successful response
      if (!aiStatus?.configured) {
        const status = await getAIStatus();
        setAiStatus(status);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to get AI response. Please try again.';
      setError(errorMessage);
      setRetryCount(prev => prev + 1);
      
      // Provide helpful error message based on retry count
      const fallbackMessage = retryCount < 2 
        ? 'I apologize, but I encountered an error. Please try again in a moment.'
        : 'I\'m having trouble responding. Please check your AI provider configuration.';
      
      addMessage(fallbackMessage, 'assistant');
    } finally {
      setLoading(false);
    }
  }, [addMessage, setLoading, retryCount, aiStatus]);

  // Vercel guideline: Scroll position persistence
  useEffect(() => {
    // Restore scroll position on navigation
    const savedScrollPosition = sessionStorage.getItem('chat-scroll-position');
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition));
      }, 100);
    }

    // Save scroll position before navigation
    const handleBeforeUnload = () => {
      sessionStorage.setItem('chat-scroll-position', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleClearChat = useCallback(() => {
    clearMessages();
  }, [clearMessages]);

  // Vercel guideline: No dead ends - always offer a next step
  const renderWelcomeState = () => (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-ambient">
          <svg
            className="w-8 h-8 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Welcome to Sheikh Chat
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          I'm your AI assistant, here to help with questions, explanations, and meaningful conversations.
        </p>
        
        {/* AI Status Indicator */}
        {aiStatus && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            aiStatus.configured 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
              : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
          }`}>
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                aiStatus.configured ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <span>
                {aiStatus.configured 
                  ? `Connected to ${aiStatus.provider} (${aiStatus.model})`
                  : 'AI provider not configured'
                }
              </span>
            </div>
            {!aiStatus.configured && (
              <p className="mt-2 text-xs">
                Set up your API keys in the environment variables to enable AI responses.
              </p>
            )}
          </div>
        )}
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">Try asking me about:</p>
          <ul className="text-left space-y-1">
            <li>• Technical questions and explanations</li>
            <li>• Creative writing and brainstorming</li>
            <li>• Problem-solving and analysis</li>
            <li>• General knowledge and learning</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Vercel guideline: Proper error state design
  const renderErrorState = () => (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <div className="text-center max-w-md p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
          Connection Error
        </h3>
        <p className="text-red-700 dark:text-red-300 mb-4">
          {error || 'Something went wrong. Please try again.'}
        </p>
        <button
          onClick={() => setError(null)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900"
      role="main"
      aria-label="Sheikh Chat interface"
    >
      {/* Header */}
      <ChatHeader
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onClearChat={handleClearChat}
        messageCount={messages.length}
      />

      {/* Messages Area */}
      <div 
        id="chat-messages"
        className="flex-1 overflow-hidden"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className="h-full overflow-y-auto scrollbar-thin px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {error ? (
              renderErrorState()
            ) : messages.length === 0 ? (
              renderWelcomeState()
            ) : (
              <>
                {/* Messages */}
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    previousMessage={index > 0 ? messages[index - 1] : undefined}
                    isLast={index === messages.length - 1}
                  />
                ))}

                {/* Typing Indicator */}
                {isLoading && <TypingIndicator />}

                {/* Scroll anchor for auto-scroll */}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading || !!error}
        placeholder={
          messages.length === 0 
            ? "Start a conversation with Sheikh Chat…" 
            : "Type your message…"
        }
        ariaLabel="Type your message to chat with Sheikh Chat"
      />

      {/* Screen reader announcements */}
      <div aria-live="polite" className="sr-only">
        {isLoading && "Sheikh Chat is typing…"}
        {error && `Error: ${error}`}
        {messages.length > 0 && `${messages.length} message${messages.length === 1 ? '' : 's'} in conversation`}
      </div>
    </div>
  );
}