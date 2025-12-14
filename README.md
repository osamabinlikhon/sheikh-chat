# Sheikh Chat

A modern, responsive ChatGPT-like interface built with Next.js 16, React 19.2, TypeScript, and Tailwind CSS. Features server actions for handling AI conversations with a clean, accessible UI and latest architectural improvements.

## Features

- 🎨 **Modern UI**: Clean, responsive design with dark/light mode toggle
- 💬 **Real-time Chat**: Smooth message animations and typing indicators
- 🌙 **Theme Support**: Automatic theme detection with manual toggle
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- ⚡ **Next.js 16**: Built with the latest Next.js features including stable Turbopack integration, Server Actions, and React 19.2 support
- 🔄 **Smart Actions**: Server-side AI response generation
- 📋 **Message Management**: Copy messages, clear chat history
- 🎭 **Smooth Animations**: Fade-in effects and micro-interactions

## Tech Stack

- **Framework**: Next.js 16 with App Router and stable Turbopack
- **Language**: TypeScript
- **React**: 19.2 with latest features and optimizations
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Server Actions (ready for OpenAI integration)
- **Build**: Enhanced Webpack optimizations and SWC minification

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sheikh-chat
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
sheikh-chat/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── actions/           # Server actions
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ChatContainer.tsx  # Main chat interface
│   │   ├── ChatHeader.tsx     # Header with controls
│   │   ├── ChatInput.tsx      # Message input
│   │   ├── ChatMessage.tsx    # Individual message
│   │   └── TypingIndicator.tsx # Typing animation
│   ├── lib/                   # Utilities and hooks
│   │   ├── hooks/
│   │   │   └── useChat.ts     # Chat state management
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript types
│       └── chat.ts            # Chat-related types
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

## Usage

### Basic Chat

1. Start typing in the input field
2. Press Enter or click the send button
3. Watch as Sheikh Chat responds with thoughtful replies

### Features

- **Theme Toggle**: Click the sun/moon icon in the header
- **Clear Chat**: Click the trash icon to clear all messages
- **Copy Messages**: Hover over any message and click the copy icon
- **Responsive Design**: Works seamlessly on desktop and mobile

## Customization

### Adding OpenAI Integration

1. Install OpenAI SDK:
```bash
npm install openai
```

2. Add your API key to environment variables:
```bash
echo "OPENAI_API_KEY=your-api-key-here" > .env.local
```

3. Update the server action in `src/app/actions/chatActions.ts`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIResponse(userMessage: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are Sheikh Chat, a helpful AI assistant." },
      { role: "user", content: userMessage }
    ],
    max_tokens: 150,
  });

  return completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
}
```

### Styling Customization

The app uses Tailwind CSS with custom design tokens. Modify `tailwind.config.js` to customize:

- Colors: Update the `theme.extend.colors` section
- Animations: Add new keyframes in `theme.extend.animation`
- Typography: Modify font families and sizes

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by Osama Bin Likhon (osamabinlikhon@gmail.com)

---

Built with ❤️ using Next.js 16, React 19.2, and modern web technologies.