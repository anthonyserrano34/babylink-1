/**
 * @file Page de jeu principale avec options de lancement de partie
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Interface principale pour lancer et gérer les parties de baby-foot
 * Inclut les options de jeu rapide, tournoi et défis
 */

"use client"

import React from 'react'

/**
 * Page principale pour les options de jeu
 * @returns {JSX.Element} Interface de jeu avec boutons d'action
 */
export default function JouerPage() {
  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-nubernext-extended-heavy text-white mb-2">
            Prêt à jouer ?
          </h1>
          <p className="text-[#AAAAAA] text-lg">
            Choisis ton mode de jeu et lance une partie !
          </p>
        </div>

        {/* Game Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Match */}
          <div className="bg-[#101118] rounded-xl p-6 hover:bg-[#1a1a2e] transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EA1846] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-2">
                Partie Rapide
              </h3>
              <p className="text-[#AAAAAA] text-sm mb-4">
                Lance une partie immédiatement contre un adversaire disponible
              </p>
              <button className="w-full bg-[#EA1846] text-white py-3 rounded-lg font-nubernext-extended-bold hover:bg-[#d41539] transition-colors">
                Jouer Maintenant
              </button>
            </div>
          </div>

          {/* Tournament */}
          <div className="bg-[#101118] rounded-xl p-6 hover:bg-[#1a1a2e] transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#0C0E14]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-2">
                Tournoi EPSI
              </h3>
              <p className="text-[#AAAAAA] text-sm mb-4">
                Participe au championnat officiel de l&apos;école
              </p>
              <button className="w-full bg-[#FFD700] text-[#0C0E14] py-3 rounded-lg font-nubernext-extended-bold hover:bg-[#e6c200] transition-colors">
                Rejoindre
              </button>
            </div>
          </div>

          {/* Challenge */}
          <div className="bg-[#101118] rounded-xl p-6 hover:bg-[#1a1a2e] transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9C27B0] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L17 14L18.18 23L12 19L5.82 23L7 14L2 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-2">
                Défis Spéciaux
              </h3>
              <p className="text-[#AAAAAA] text-sm mb-4">
                Relève des défis uniques et gagne des récompenses
              </p>
              <button className="w-full bg-[#9C27B0] text-white py-3 rounded-lg font-nubernext-extended-bold hover:bg-[#8e24aa] transition-colors">
                Explorer
              </button>
            </div>
          </div>
        </div>

        {/* Active Tables Section */}
        <div className="bg-[#101118] rounded-xl p-6">
          <h2 className="text-2xl font-nubernext-extended-bold text-white mb-4">
            Tables Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0C0E14] rounded-lg p-4 border border-[#2a2a3e]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-nubernext-extended-bold text-white">Table 1</h3>
                <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">Libre</span>
              </div>
              <p className="text-[#AAAAAA] text-sm mb-3">Salle principal - RDC</p>
              <button className="w-full bg-[#EA1846] text-white py-2 rounded-lg font-medium hover:bg-[#d41539] transition-colors">
                Réserver
              </button>
            </div>
            
            <div className="bg-[#0C0E14] rounded-lg p-4 border border-[#2a2a3e]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-nubernext-extended-bold text-white">Table 2</h3>
                <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full">Occupée</span>
              </div>
              <p className="text-[#AAAAAA] text-sm mb-3">Salle détente - 1er étage</p>
              <button className="w-full bg-[#666666] text-white py-2 rounded-lg font-medium cursor-not-allowed" disabled>
                Indisponible
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 