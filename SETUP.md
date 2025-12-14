# Sheikh Chat - AI Setup Guide

This guide will help you set up Sheikh Chat with real AI providers for intelligent conversations.

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AI Provider

Choose one of the supported AI providers and add your API key:

#### Option A: OpenAI (Recommended)
```bash
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-openai-api-key-here
DEFAULT_AI_PROVIDER=openai
DEFAULT_AI_MODEL=gpt-4o-mini
```

#### Option B: Google AI
```bash
# Get your API key from: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY=your-google-api-key-here
DEFAULT_AI_PROVIDER=google
DEFAULT_AI_MODEL=gemini-1.5-flash
```

#### Option C: Anthropic
```bash
# Get your API key from: https://console.anthropic.com/
ANTHROPIC_API_KEY=your-anthropic-api-key-here
DEFAULT_AI_PROVIDER=anthropic
DEFAULT_AI_MODEL=claude-3-haiku-20240307
```

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and start chatting with AI!

## 🔧 Advanced Configuration

### Environment Variables

Create a `.env.local` file with these settings:

```bash
# AI Provider (openai, google, or anthropic)
DEFAULT_AI_PROVIDER=openai

# AI Model (provider-specific)
DEFAULT_AI_MODEL=gpt-4o-mini

# Response Settings
AI_MAX_TOKENS=1000
AI_TEMPERATURE=0.7

# Provider API Keys
OPENAI_API_KEY=sk-your-key-here
GOOGLE_API_KEY=your-key-here
ANTHROPIC_API_KEY=your-key-here
```

### Available Models

| Provider | Model | Description | Best For |
|----------|-------|-------------|----------|
| **OpenAI** | `gpt-4o` | Latest GPT-4 | Complex reasoning |
| OpenAI | `gpt-4o-mini` | Cost-effective GPT-4 | Most use cases |
| OpenAI | `gpt-4-turbo` | GPT-4 Turbo | Long conversations |
| OpenAI | `gpt-3.5-turbo` | GPT-3.5 | Simple tasks |
| **Google** | `gemini-1.5-pro` | Gemini Pro | Multimodal tasks |
| Google | `gemini-1.5-flash` | Gemini Flash | Fast responses |
| **Anthropic** | `claude-3-opus-20240229` | Claude 3 Opus | Complex analysis |
| Anthropic | `claude-3-sonnet-20240229` | Claude 3 Sonnet | Balanced performance |
| Anthropic | `claude-3-haiku-20240307` | Claude 3 Haiku | Fast & affordable |

### Custom Settings

```bash
# Response creativity (0.0 = factual, 2.0 = creative)
AI_TEMPERATURE=0.7

# Maximum response length
AI_MAX_TOKENS=1000

# Development settings
NODE_ENV=development
AI_ENABLED=true
```

## 🛠️ Troubleshooting

### Common Issues

**1. "AI provider not configured"**
- Ensure you've set the correct API key
- Check that `DEFAULT_AI_PROVIDER` matches your provider
- Verify the API key has sufficient credits

**2. "Rate limit exceeded"**
- Wait a moment and try again
- Consider upgrading your API plan
- Use a different model (e.g., switch from GPT-4 to GPT-3.5)

**3. "API quota exceeded"**
- Check your usage in the provider dashboard
- Upgrade your plan or wait for quota reset
- Consider using a more cost-effective model

**4. Connection test fails**
- Verify your API key is correct
- Check network connectivity
- Ensure the API key has proper permissions

### Debug Mode

Enable debug logging:

```bash
NODE_ENV=development
```

Check the browser console for detailed error messages.

### Testing Connection

The chat interface includes a connection test feature:
1. Look for the AI status indicator in the welcome screen
2. Click "Test" to verify your connection
3. Status will show green when working correctly

## 💡 Pro Tips

1. **Choose the Right Model:**
   - Use `gpt-4o-mini` or `gemini-1.5-flash` for most conversations
   - Switch to `gpt-4o` or `claude-3-opus` for complex tasks
   - Use smaller models for development/testing

2. **Cost Optimization:**
   - Set reasonable `AI_MAX_TOKENS` limits
   - Use appropriate temperature settings
   - Monitor usage in provider dashboards

3. **Performance:**
   - Enable streaming for better UX (automatic with Vercel AI SDK)
   - Use multiple providers for redundancy
   - Cache responses for common queries

4. **Security:**
   - Never commit API keys to version control
   - Use environment variables for all secrets
   - Rotate keys regularly

## 🔄 Switching Providers

To switch between AI providers:

1. Update your `.env.local`:
```bash
DEFAULT_AI_PROVIDER=new-provider
DEFAULT_AI_MODEL=appropriate-model
```

2. Add the new provider's API key

3. Restart the development server

The chat will automatically use the new provider!

## 📚 Additional Resources

- [Vercel AI SDK Documentation](https://ai-sdk.dev/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Google AI Documentation](https://ai.google.dev/)
- [Anthropic API Documentation](https://docs.anthropic.com/)

---

**Need help?** Check the GitHub issues or create a new one for support.