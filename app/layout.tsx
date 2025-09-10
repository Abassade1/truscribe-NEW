import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google';
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '600', '700', '800'],
  variable: "--font-poppins",
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TruScribe – AI Job Fact Checker for Gen Z & Young Pros',
  description: 'Stop falling for fake job posts. TruScribe verifies job claims, salaries, and more using AI. Trusted by job seekers across Canada',
  keywords: 'AI job fact checker, verify job listings, fake job detection tool, career claim verifier, job truth checker, employment scam detector, salary claim checker, AI resume analyzer, job posting validation, remote job scams check, TruScribe app, TruScribe AI, TruScribe fact-checker, TruScribe job truth score, TruScribe for job seekers',
  generator: 'v0.dev',
  openGraph: {
    title: 'TruScribe – AI Job Fact Checker for Gen Z & Young Pros',
    description: 'Stop falling for fake job posts. TruScribe verifies job claims, salaries, and more using AI. Trusted by job seekers across Canada',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TruScribe – AI Job Fact Checker for Gen Z & Young Pros',
    description: 'Stop falling for fake job posts. TruScribe verifies job claims, salaries, and more using AI. Trusted by job seekers across Canada',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
