import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RN All Steel Fabrication Work | Mumbai & Thane',
  description: 'Professional steel fabrication services in Mumbai and Thane. Specializing in railings, security doors, gates, industrial structures, and custom metal fabrication.',
  keywords: 'steel fabrication, Mumbai, Thane, railings, security doors, gates, industrial structures, welding',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow page-transition">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}