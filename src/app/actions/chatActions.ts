'use server';

import { Message } from '@/types/chat';

// This is a server action that will handle chat messages
export async function sendMessage(messages: Message[]): Promise<string> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== 'user') {
    return 'Please send a message first.';
  }

  // For demo purposes, we'll return a simple response
  // In a real app, you would integrate with OpenAI API here
  const responses = [
    "I'm Sheikh Chat, your AI assistant! How can I help you today?",
    "That's an interesting question. Let me think about that...",
    "I'd be happy to help you with that. Could you provide more details?",
    "Based on what you've shared, here's my perspective...",
    "That's a great point! Here's what I think about it...",
    "I understand your question. Let me break it down for you...",
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return randomResponse;
}

// Server action for generating AI responses with OpenAI integration
export async function generateAIResponse(userMessage: string): Promise<string> {
  // In a real implementation, you would:
  // 1. Set up OpenAI API key in environment variables
  // 2. Make API calls to OpenAI
  // 3. Handle streaming responses
  
  // For now, return a mock response
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
    return "Hello! I'm Sheikh Chat. I'm here to assist you with your questions and have meaningful conversations. What would you like to talk about?";
  }
  
  if (userMessage.toLowerCase().includes('help')) {
    return "I'm here to help! I can assist with a wide variety of topics including:\n\n• Answering questions on various subjects\n• Helping with problem-solving\n• Providing explanations and insights\n• Engaging in thoughtful conversations\n\nWhat specific area would you like help with?";
  }
  
  if (userMessage.toLowerCase().includes('what can you do')) {
    return "I'm Sheikh Chat, an AI assistant created to be helpful, harmless, and honest. I can:\n\n• Answer questions across many topics\n• Help explain complex concepts\n• Assist with writing and editing\n• Provide creative ideas and suggestions\n• Engage in meaningful discussions\n\nI'm designed to be conversational and helpful. What would you like to explore together?";
  }
  
  // Default response
  return `I understand you're asking about "${userMessage}". That's a thoughtful question! While I'm still learning and growing, I'm here to help you explore ideas and find answers. Could you tell me more about what specifically interests you about this topic?`;
}