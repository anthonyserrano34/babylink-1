"use client"

import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Main dashboard page for authenticated users
 * @returns {JSX.Element} Dashboard content
 */
export default function Home() {
  const { user } = useAuth()

  return (
    <AuthenticatedLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">
            Bienvenue, {user?.name} ! 🎯
          </h1>
          <p className="text-[#888888] text-base sm:text-lg">
            Prêt pour votre prochaine partie de babyfoot ?
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 border border-[#333]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#888888] text-sm">Score Total</p>
                <p className="text-white text-xl sm:text-2xl font-bold">{user?.score || 0}</p>
              </div>
              <div className="text-[#EA1846] text-2xl sm:text-3xl">🏆</div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 border border-[#333]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#888888] text-sm">Position</p>
                <p className="text-white text-xl sm:text-2xl font-bold">{user?.position || 'Attaquant'}</p>
              </div>
              <div className="text-[#EA1846] text-2xl sm:text-3xl">⚽</div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 border border-[#333]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#888888] text-sm">Niveau</p>
                <p className="text-white text-xl sm:text-2xl font-bold">{user?.skillLevel || 'Débutant'}</p>
              </div>
              <div className="text-[#EA1846] text-2xl sm:text-3xl">📈</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 border border-[#333]">
          <h2 className="text-white text-lg sm:text-xl font-bold mb-4">Activité Récente</h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#222] rounded-lg">
              <div className="text-2xl">🎮</div>
              <div className="flex-1">
                <p className="text-white font-medium">Partie en cours</p>
                <p className="text-[#888888] text-sm">Aucune partie active</p>
              </div>
              <button className="bg-[#EA1846] hover:bg-[#c71635] text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                Nouvelle Partie
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#222] rounded-lg">
              <div className="text-2xl">🏅</div>
              <div className="flex-1">
                <p className="text-white font-medium">Tournoi EPSI</p>
                <p className="text-[#888888] text-sm">Inscription ouverte</p>
              </div>
              <button className="border border-[#EA1846] text-[#EA1846] hover:bg-[#EA1846] hover:text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                S&apos;inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
