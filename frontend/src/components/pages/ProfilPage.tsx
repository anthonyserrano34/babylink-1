/**
 * @file Page de profil utilisateur avec statistiques et personnalisation
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Interface de gestion du profil joueur incluant les stats, avatar et préférences
 */

"use client"

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import PlayerXPIndicator from '@/components/ui/PlayerXPIndicator'

/**
 * Page de profil utilisateur
 * @returns {JSX.Element} Interface de profil avec stats et options
 */
export default function ProfilPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-nubernext-extended-heavy text-white mb-2">
            Mon Profil
          </h1>
          <p className="text-[#AAAAAA] text-lg">
            Gérer mes informations et statistiques
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#101118] rounded-xl p-6">
              <div className="text-center">
                <PlayerXPIndicator
                  xpLevel={2}
                  avatarSrc={user.avatar}
                  userName={user.name || 'Player'}
                />
                <h2 className="text-xl font-nubernext-extended-bold text-white mt-4 mb-2">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.name
                  }
                </h2>
                <p className="text-[#EA1846] font-nubernext-extended-bold mb-4">
                  XP: {user.xp || 1250}
                </p>
                <button className="w-full bg-[#EA1846] text-white py-3 rounded-lg font-nubernext-extended-bold hover:bg-[#d41539] transition-colors">
                  Modifier Avatar
                </button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Overview */}
            <div className="bg-[#101118] rounded-xl p-6">
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-4">
                Statistiques
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-nubernext-extended-bold text-[#EA1846] mb-1">
                    47
                  </div>
                  <div className="text-sm text-[#AAAAAA]">Victoires</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-nubernext-extended-bold text-[#EA1846] mb-1">
                    23
                  </div>
                  <div className="text-sm text-[#AAAAAA]">Défaites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-nubernext-extended-bold text-[#EA1846] mb-1">
                    67%
                  </div>
                  <div className="text-sm text-[#AAAAAA]">Winrate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-nubernext-extended-bold text-[#EA1846] mb-1">
                    {user.elo || 1340}
                  </div>
                  <div className="text-sm text-[#AAAAAA]">ELO</div>
                </div>
              </div>
            </div>

            {/* Recent Matches */}
            <div className="bg-[#101118] rounded-xl p-6">
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-4">
                Dernières Parties
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((match) => (
                  <div key={match} className="bg-[#0C0E14] rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="text-white font-medium">vs. Player{match}</div>
                                                                          <div className="text-[#AAAAAA] text-sm">Il y a {match} jour{match > 1 ? "s" : ""}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500 font-nubernext-extended-bold">Victoire</div>
                      <div className="text-[#AAAAAA] text-sm">10 - {8 - match}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 