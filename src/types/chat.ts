/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isDarkMode: boolean;
}

export interface ChatAction {
  type: 'ADD_MESSAGE' | 'SET_LOADING' | 'TOGGLE_THEME' | 'CLEAR_MESSAGES';
  payload?: any;
}