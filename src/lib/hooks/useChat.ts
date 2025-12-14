'use client';

/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, ChatState } from '@/types/chat';
import { generateId, scrollToBottom } from '@/lib/utils';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = useCallback((content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        if (newTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return newTheme;
    });
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom(messagesEndRef.current);
    }
  }, [messages]);

  // Apply theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  return {
    messages,
    isLoading,
    isDarkMode,
    addMessage,
    clearMessages,
    setLoading,
    toggleTheme,
    messagesEndRef,
  };
}