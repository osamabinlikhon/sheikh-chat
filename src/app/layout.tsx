import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sheikh Chat - AI Assistant',
  description: 'A modern ChatGPT-like interface built with Next.js 16, React 19.2, and Server Actions',
  keywords: ['AI', 'Chat', 'Assistant', 'Next.js', 'ChatGPT', 'React 19.2', 'Server Actions'],
  authors: [{ name: 'Osama Bin Likhon', email: 'osamabinlikhon@gmail.com' }],
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' }
  ],
  colorScheme: 'light dark',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Sheikh Chat - AI Assistant',
    description: 'Modern ChatGPT-like interface with Next.js 16 and React 19.2',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sheikh Chat - AI Assistant',
    description: 'Modern ChatGPT-like interface with Next.js 16 and React 19.2',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="skip-to-content"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        
        <div id="root">
          <main id="main-content" role="main">
            {children}
          </main>
        </div>
        
        {/* Focus management script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Vercel guideline: Handle focus management
              (function() {
                // Ensure focus is visible
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'Tab') {
                    document.body.classList.add('using-keyboard');
                  }
                });
                
                document.addEventListener('mousedown', function() {
                  document.body.classList.remove('using-keyboard');
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}