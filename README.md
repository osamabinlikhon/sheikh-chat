# Sheikh Chat

A modern, responsive ChatGPT-like interface built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Features server actions for handling AI conversations with real AI providers (OpenAI, Google AI, Anthropic) and a clean, accessible UI.

## Features

- 🎨 **Modern UI**: Clean, responsive design with dark/light mode toggle
- 💬 **Real-time Chat**: Smooth message animations and typing indicators
- 🌙 **Theme Support**: Automatic theme detection with manual toggle
- 📱 **Mobile Responsive**: Optimized for all screen sizes with safe areas
- ⚡ **Next.js 16**: Built with the latest Next.js features including stable Turbopack integration, Server Actions, and React 19.2 support
- 🔄 **Smart Actions**: Server-side AI response generation
- 📋 **Message Management**: Copy messages, clear chat history
- 🎭 **Smooth Animations**: Fade-in effects and micro-interactions with `prefers-reduced-motion` support
- ♿ **Accessibility First**: Full WCAG compliance with proper ARIA labels, keyboard navigation, and screen reader support
- 🎯 **Vercel Design Guidelines**: Implements comprehensive UI/UX best practices
- ⌨️ **Keyboard Navigation**: Complete keyboard operability following WAI-ARIA patterns
- 🎨 **Focus Management**: Visible focus rings and proper focus trapping
- 📐 **Touch Targets**: 44px minimum touch targets for mobile accessibility
- 🔄 **Optimistic UI**: Real-time updates with error handling and rollback
- 🛡️ **Security**: Proper focus management and protection against common UX issues

## Tech Stack

- **Framework**: Next.js 14 with App Router and Server Actions
- **Language**: TypeScript
- **React**: 18 with latest features and optimizations
- **Styling**: Tailwind CSS with Vercel Design System principles
- **Icons**: Lucide React
- **AI Integration**: Vercel AI SDK with multi-provider support (OpenAI, Google AI, Anthropic)
- **Build**: Enhanced Webpack optimizations and SWC minification
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Performance**: Optimized for Core Web Vitals and mobile performance
- **Design System**: Implements Vercel's Web Interface Guidelines

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
- **Clear Chat**: Click the trash icon to clear all messages (with confirmation)
- **Copy Messages**: Hover over any message and click the copy icon
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Keyboard Navigation**: Fully accessible via keyboard
- **Screen Reader Support**: Optimized for assistive technologies

## Accessibility & Design Standards

This project implements **Vercel's Web Interface Guidelines** and **WCAG 2.1 AA** standards:

### ♿ Accessibility Features
- **Keyboard Navigation**: Complete keyboard operability following WAI-ARIA patterns
- **Screen Reader Support**: Proper ARIA labels, roles, and live regions
- **Focus Management**: Visible focus rings and logical focus flow
- **Color Contrast**: Meets WCAG AA contrast requirements
- **Touch Targets**: 44px minimum for mobile accessibility
- **Reduced Motion**: Respects `prefers-reduced-motion` preference

### 🎨 Design Guidelines
- **Vercel Design System**: Implements comprehensive UI/UX best practices
- **Optical Alignment**: Precise visual alignment with perceptual adjustments
- **Layered Shadows**: Ambient + direct lighting effects
- **Loading States**: Proper loading indicators and feedback
- **Error Handling**: Clear error messages with recovery options
- **Empty States**: Helpful guidance for new users

### 📱 Mobile Optimization
- **Safe Areas**: Proper handling of notches and device insets
- **Viewport**: Optimized viewport configuration
- **Touch Interactions**: Proper touch target sizing and feedback
- **Performance**: Optimized for mobile devices and low-power mode

## AI Provider Setup

Sheikh Chat supports multiple AI providers through the Vercel AI SDK. Configure any of the following providers:

### 🔧 OpenAI Setup (Recommended)

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `.env.local`:
```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
DEFAULT_AI_PROVIDER=openai
DEFAULT_AI_MODEL=gpt-4o-mini
```

**Available Models:**
- `gpt-4o` - Latest GPT-4 model
- `gpt-4o-mini` - Cost-effective GPT-4 model
- `gpt-4-turbo` - GPT-4 Turbo
- `gpt-3.5-turbo` - GPT-3.5 Turbo

### 🔧 Google AI Setup

1. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add to `.env.local`:
```bash
GOOGLE_API_KEY=your-google-api-key-here
DEFAULT_AI_PROVIDER=google
DEFAULT_AI_MODEL=gemini-1.5-flash
```

**Available Models:**
- `gemini-1.5-pro` - Gemini Pro model
- `gemini-1.5-flash` - Gemini Flash model (fast & cost-effective)

### 🔧 Anthropic Setup

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Add to `.env.local`:
```bash
ANTHROPIC_API_KEY=your-anthropic-api-key-here
DEFAULT_AI_PROVIDER=anthropic
DEFAULT_AI_MODEL=claude-3-haiku-20240307
```

**Available Models:**
- `claude-3-sonnet-20240229` - Claude 3 Sonnet
- `claude-3-haiku-20240307` - Claude 3 Haiku (fast & cost-effective)
- `claude-3-opus-20240229` - Claude 3 Opus

### ⚙️ Global AI Settings

Add these to your `.env.local`:

```bash
# Maximum tokens for responses (default: 1000)
AI_MAX_TOKENS=1000

# AI creativity/temperature (0.0-2.0, default: 0.7)
AI_TEMPERATURE=0.7

# Enable/disable AI features
AI_ENABLED=true
```

### 🚀 Quick Start

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your API key

3. Start the development server:
```bash
npm run dev
```

The chat interface will automatically detect your AI configuration and enable real AI responses!

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