'use client';

/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function TypingIndicator() {
  return (
    <div 
      className="flex justify-start mb-4 message-fade-in"
      role="status"
      aria-label="Sheikh Chat is typing"
      aria-live="polite"
    >
      <div className="max-w-[80%]">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-ambient">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1" aria-hidden="true">
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              Sheikh Chat is typing…
            </span>
          </div>
        </div>
      </div>
      
      {/* Screen reader only text for better accessibility */}
      <span className="sr-only">
        Sheikh Chat is typing a response
      </span>
    </div>
  );
}