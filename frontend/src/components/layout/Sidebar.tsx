"use client"

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import PlayerXPIndicator from '@/components/ui/PlayerXPIndicator'
import { 
  Users, 
  User,
  Trophy,
  Calendar,
  DollarSign,
  MapPin,
  Menu,
  X,
  LogOut
} from 'lucide-react'

/**
 * Modern sidebar component with semantic HTML and optimal responsive behavior
 * Uses CSS Grid for navigation layout and follows accessibility best practices
 * @returns {JSX.Element} Semantic sidebar with navigation and user profile
 */
export default function Sidebar() {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (!user) return null

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  /**
   * Format user name with proper capitalization
   * @param {string} firstName - user's first name
   * @param {string} lastName - user's last name  
   * @param {string} fallbackName - fallback name if firstName/lastName not available
   * @returns {string} formatted name
   */
  const formatUserName = (firstName?: string, lastName?: string, fallbackName?: string): string => {
    if (firstName && lastName) {
      const formattedFirst = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
      const formattedLast = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
      return `${formattedFirst} ${formattedLast}`
    }
    return fallbackName || 'Player'
  }

  /**
   * Get skill level display text in French without accents
   * @param {string} skillLevel - user's skill level
   * @returns {string} formatted skill level in French
   */
  const getSkillLevelDisplay = (skillLevel?: string): string => {
    const skillLevels: { [key: string]: string } = {
      'beginner': 'DEBUTANT',
      'intermediate': 'INTERMEDIAIRE', 
      'expert': 'EXPERT',
      'advanced': 'AVANCE',
      'novice': 'NOVICE',
      'master': 'MAITRE'
    }
    
    if (!skillLevel) return 'DEBUTANT'
    const normalized = skillLevel.toLowerCase()
    return skillLevels[normalized] || skillLevel.toUpperCase()
  }

  // Custom Soccer Field Icon SVG component
  const SoccerFieldIcon = ({ className }: { className?: string }) => (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M4 4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2h7v2.13c-1.76.46-3 2.05-3 3.87a4.01 4.01 0 0 0 3 3.87V18H4v-2h3V8H4zm9 0h7v2h-3v8h3v2h-7v-2.13c1.76-.46 3-2.05 3-3.87a4.01 4.01 0 0 0-3-3.87zm-9 4h1v4H4zm15 0h1v4h-1zm-6 .27c.62.36 1 1.02 1 1.73s-.38 1.37-1 1.73zm-2 0v3.46c-.62-.36-1-1.02-1-1.73s.38-1.37 1-1.73"
      />
    </svg>
  )

  const navigationItems = [
    { id: 'jouer', label: 'Jouer', icon: SoccerFieldIcon, active: true },
    { id: 'profil', label: 'Profil', icon: User, active: false },
    { id: 'joueurs', label: 'Joueurs', icon: Users, active: false },
    { id: 'classement', label: 'Classement', icon: Trophy, active: false },
    { id: 'reserver', label: 'Réserver', icon: Calendar, active: false },
    { id: 'parier', label: 'Parier', icon: DollarSign, active: false },
  ]

  return (
    <>
      
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-50 bg-[#1a1a1a] text-white p-3 rounded-lg shadow-lg"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        bg-[#0C0E14] h-full flex flex-col
        lg:relative lg:translate-x-0
        max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-80 max-lg:z-50 max-lg:overflow-y-auto
        max-lg:transform max-lg:transition-transform max-lg:duration-300
        ${isMobileMenuOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
      `}>
        
        {/* Header Section */}
        <header className="flex-shrink-0 px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand - Centered on desktop */}
            <div className="flex items-center gap-3 lg:mx-auto">
              <Image 
                src="/assets/logo.png" 
                alt="BabyLink Logo" 
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h1 className="text-lg font-nubernext-extended-heavy uppercase">
                <span className="text-white">Baby</span>
                <span className="text-[#EA1846]">Link</span>
              </h1>
            </div>
            
            {/* Mobile Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close navigation menu"
            >
              <X size={24} />
            </button>
          </div>
        </header>

        {/* User Profile Section */}
        <section className="flex-shrink-0 px-6 pb-6">
          <div className="flex flex-col items-center">
            {/* Avatar with XP Indicator */}
            <PlayerXPIndicator
              xpLevel={2}
              avatarSrc={user.avatar}
              userName={formatUserName(user.firstName, user.lastName, user.name)}
            />

            {/* Skill Level */}
            <p className="text-[#666666] text-xs uppercase tracking-wide mt-3">
              {getSkillLevelDisplay(user.skillLevel)}
            </p>

            {/* User Name */}
            <h2 className="text-white font-nubernext-extended-heavy text-lg text-center mt-2">
              {formatUserName(user.firstName, user.lastName, user.name)}
            </h2>

            {/* XP Display */}
            <p className="text-[#EA1846] font-nubernext-extended-heavy text-sm mt-2">
              XP: {user.xp || 1250}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 mt-3">
              <MapPin className="w-4 h-4 text-[#888888]" />
              <span className="text-[#AAAAAA] text-sm">EPSI Montpellier</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="flex-shrink-0 px-6 pb-8">
          <div className="flex justify-center gap-10">
            {/* Coins */}
            <div className="flex flex-col items-center space-y-2">
              <Image 
                src="/assets/coin.png" 
                alt="Coins" 
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <div className="text-white font-nubernext-extended-heavy text-lg">
                  {user.coins || 850}
                </div>
                <div className="text-[#888888] text-xs">Coins</div>
              </div>
            </div>
            
            {/* ELO */}
            <div className="flex flex-col items-center space-y-2">
              <Image 
                src="/assets/trophy.png" 
                alt="ELO Rating" 
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-center">
                <div className="text-white font-nubernext-extended-heavy text-lg">
                  {user.elo || 1340}
                </div>
                <div className="text-[#888888] text-xs">ELO</div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <nav className="flex-1 px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  className={`
                    h-28 w-full flex flex-col items-center justify-center gap-3 
                    transition-all duration-200 hover:bg-[#EA1846] group
                    ${item.active 
                      ? 'bg-[#EA1846]' 
                      : 'bg-[#101118] hover:bg-[#EA1846]'
                    }
                  `}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <IconComponent 
                    className={`w-6 h-6 transition-colors ${
                      item.active 
                        ? 'text-white' 
                        : 'text-[#888888] group-hover:text-white'
                    }`} 
                  />
                  <span 
                    className={`font-nubernext-bold text-sm transition-colors ${
                      item.active 
                        ? 'text-white' 
                        : 'text-[#888888] group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Footer with Logout */}
        <footer className="flex-shrink-0 px-6 pb-6">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 text-[#888888] hover:text-[#EA1846] transition-colors duration-200 py-4 group"
            aria-label="Logout from account"
          >
            <LogOut className="w-5 h-5 group-hover:text-[#EA1846] transition-colors" />
            <span className="font-medium group-hover:text-[#EA1846] transition-colors">
              Déconnexion
            </span>
          </button>
        </footer>
      </div>
    </>
  )
} 