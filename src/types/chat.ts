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