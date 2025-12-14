'use client';

/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Sun, Moon, MessageSquare, Trash2, Settings } from 'lucide-react';
import { useCallback } from 'react';

interface ChatHeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onClearChat: () => void;
  messageCount: number;
}

export function ChatHeader({ 
  isDarkMode, 
  onToggleTheme, 
  onClearChat, 
  messageCount 
}: ChatHeaderProps) {
  const handleClearChat = useCallback(() => {
    // Vercel guideline: Confirm destructive actions
    const confirmed = window.confirm(
      `Are you sure you want to clear all ${messageCount} message${messageCount === 1 ? '' : 's'}? This action cannot be undone.`
    );
    if (confirmed) {
      onClearChat();
    }
  }, [messageCount, onClearChat]);

  const handleThemeToggle = useCallback(() => {
    onToggleTheme();
  }, [onToggleTheme]);

  return (
    <header 
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 safe-area-inset-top"
      role="banner"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl shadow-ambient">
            <MessageSquare className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Sheikh Chat
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI Assistant • {messageCount} {messageCount === 1 ? 'message' : 'messages'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2" role="toolbar" aria-label="Chat controls">
          {/* Clear Chat Button */}
          <button
            onClick={handleClearChat}
            disabled={messageCount === 0}
            className={`
              icon-button rounded-lg transition-colors
              ${messageCount === 0
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
            title="Clear chat history"
            aria-label={`Clear all ${messageCount} message${messageCount === 1 ? '' : 's'}`}
            aria-describedby="clear-chat-help"
          >
            <Trash2 className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Settings Button (placeholder with proper accessibility) */}
          <button
            className="icon-button rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Settings"
            aria-label="Open settings"
            disabled
            aria-disabled="true"
          >
            <Settings className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="icon-button rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      
      {/* Hidden help text for screen readers */}
      <div id="clear-chat-help" className="sr-only">
        This action cannot be undone
      </div>
      
      {/* Skip to content link */}
      <a 
        href="#chat-messages" 
        className="skip-to-content"
        aria-label="Skip to chat messages"
      >
        Skip to chat messages
      </a>
    </header>
  );
}