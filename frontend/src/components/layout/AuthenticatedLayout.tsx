"use client"

import { useAuth } from '@/contexts/AuthContext'
import Sidebar from './Sidebar'
import { ReactNode } from 'react'

/**
 * Modern authenticated layout using CSS Grid for optimal responsiveness
 * Follows best practices for layout architecture and semantic HTML
 * @param {Object} props - component props
 * @param {ReactNode} props.children - page content to render in main area
 * @returns {JSX.Element} Grid-based layout with sidebar and main content
 */
interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C0E14] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0C0E14] grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 p-4">
      {/* Sidebar - Always takes exactly 280px on desktop, full width on mobile */}
      <aside className="lg:block">
        <Sidebar />
      </aside>
      
      {/* Main Content Area - Takes remaining space and scrolls naturally */}
      <main className="min-h-0 w-full">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  )
} 