'use server';

/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Message } from '@/types/chat';
import { generateAIResponse, isAIConfigured, getAIConfig } from '@/lib/ai/chat';

// This is a server action that will handle chat messages with AI
export async function sendMessage(messages: Message[]): Promise<string> {
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== 'user') {
    return 'Please send a message first.';
  }

  // Check if AI is configured
  if (!isAIConfigured()) {
    return getFallbackResponse(lastMessage.content);
  }

  try {
    // Convert messages to AI format
    const aiMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Generate AI response
    const response = await generateAIResponse(aiMessages);
    return response;
  } catch (error) {
    console.error('AI response generation failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return '⚠️ AI provider not configured. Please check your API keys in the environment variables.';
      }
      if (error.message.includes('rate limit')) {
        return '⏳ Rate limit exceeded. Please try again in a moment.';
      }
      if (error.message.includes('quota')) {
        return '💳 API quota exceeded. Please check your account limits.';
      }
    }
    
    return '❌ Sorry, I encountered an error while generating a response. Please try again.';
  }
}

// Server action for generating AI responses
export async function generateAIResponseAction(userMessage: string): Promise<string> {
  // Check if AI is configured
  if (!isAIConfigured()) {
    return getFallbackResponse(userMessage);
  }

  try {
    const config = getAIConfig();
    const response = await generateAIResponse(
      [{ role: 'user', content: userMessage }],
      {
        maxTokens: config.maxTokens,
        temperature: config.temperature,
      }
    );
    return response;
  } catch (error) {
    console.error('AI response generation failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return '⚠️ AI provider not configured. Please set up your API keys in the environment variables.\n\nSupported providers:\n• OpenAI (OPENAI_API_KEY)\n• Google AI (GOOGLE_API_KEY)\n• Anthropic (ANTHROPIC_API_KEY)';
      }
      if (error.message.includes('rate limit')) {
        return '⏳ Rate limit exceeded. Please try again in a moment.';
      }
      if (error.message.includes('quota')) {
        return '💳 API quota exceeded. Please check your account limits.';
      }
    }
    
    return '❌ Sorry, I encountered an error while generating a response. Please try again.';
  }
}

// Server action to get AI configuration status
export async function getAIStatus(): Promise<{
  configured: boolean;
  provider: string;
  model: string;
  availableProviders: Array<{ id: string; name: string; models: string[] }>;
}> {
  const config = getAIConfig();
  const provider = (await import('@/lib/ai/provider')).aiProvider;
  
  return {
    configured: isAIConfigured(),
    provider: config.provider,
    model: config.model,
    availableProviders: provider.getAvailableProviders(),
  };
}

// Server action to test AI connection
export async function testAIConnection(): Promise<{
  success: boolean;
  message: string;
  provider: string;
  model: string;
}> {
  try {
    if (!isAIConfigured()) {
      return {
        success: false,
        message: 'No AI provider configured. Please set up your API keys.',
        provider: 'none',
        model: 'none',
      };
    }

    const config = getAIConfig();
    const testMessage = 'Hello! Please respond with "Connection successful" if you can see this message.';
    
    const response = await generateAIResponse(
      [{ role: 'user', content: testMessage }],
      {
        maxTokens: 50,
        temperature: 0.1,
      }
    );

    return {
      success: true,
      message: `AI connection successful! Model: ${config.model}`,
      provider: config.provider,
      model: config.model,
    };
  } catch (error) {
    console.error('AI connection test failed:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      provider: 'error',
      model: 'error',
    };
  }
}

// Fallback response when AI is not configured
function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm Sheikh Chat, but I'm not connected to an AI provider yet. To enable real AI responses, please set up your API keys:\n\n🔧 **Setup Required:**\n• OpenAI: Set `OPENAI_API_KEY`\n• Google AI: Set `GOOGLE_API_KEY`\n• Anthropic: Set `ANTHROPIC_API_KEY`\n\nOnce configured, I'll be able to have real conversations with you!";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return "I'm Sheikh Chat, but I need AI provider configuration to function properly. Once you set up your API keys, I can:\n\n🤖 **AI Capabilities:**\n• Answer questions across many topics\n• Help with problem-solving and analysis\n• Assist with writing and creative tasks\n• Engage in meaningful conversations\n• Provide explanations and insights\n\n🔧 **To Enable:**\nAdd your preferred AI provider's API key to the environment variables.";
  }
  
  return `I understand you're asking about "${userMessage}". To provide real AI-powered responses, please configure an AI provider by setting the appropriate API key in your environment variables. I'm currently running in fallback mode with limited functionality.`;
}