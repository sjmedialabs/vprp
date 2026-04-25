import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { QueryProvider } from '@/components/providers/query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { PageTransition } from '@/components/motion/page-transition'
import { ParticleBackground } from '@/components/ui/particle-background'
import './globals.css'

export const metadata: Metadata = {
  title: 'VPRP - Virtual Placement Readiness Platform',
  description: 'A comprehensive platform connecting students, colleges, and recruiters for seamless placement preparation and recruitment.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ParticleBackground />
        <ThemeProvider>
          <QueryProvider>
            <PageTransition>{children}</PageTransition>
          </QueryProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
