'use client';

/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { ChatHeader } from './ChatHeader';
import { useChat } from '@/lib/hooks/useChat';
import { generateAIResponse } from '@/app/actions/chatActions';

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

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage(content, 'user');
    setLoading(true);

    try {
      // Get AI response using server action
      const response = await generateAIResponse(content);
      
      // Add AI response
      addMessage(response, 'assistant');
    } catch (error) {
      console.error('Error getting AI response:', error);
      addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearMessages();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <ChatHeader
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onClearChat={handleClearChat}
        messageCount={messages.length}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 ? (
              /* Welcome Message */
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    I'm your AI assistant, here to help with questions, explanations, and meaningful conversations. 
                    Start typing to begin!
                  </p>
                </div>
              </div>
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

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        placeholder={
          messages.length === 0 
            ? "Start a conversation with Sheikh Chat..." 
            : "Type your message..."
        }
      />
    </div>
  );
}