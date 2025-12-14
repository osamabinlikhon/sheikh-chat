'use client';

import { Sun, Moon, MessageSquare, Trash2, Settings } from 'lucide-react';

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
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Sheikh Chat
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI Assistant • {messageCount} messages
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Clear Chat Button */}
          <button
            onClick={onClearChat}
            disabled={messageCount === 0}
            className={`
              p-2 rounded-lg transition-colors
              ${messageCount === 0
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Settings Button (placeholder) */}
          <button
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}