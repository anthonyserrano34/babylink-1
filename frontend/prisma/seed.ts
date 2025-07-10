import { PrismaClient } from '../src/generated/prisma'
import { createHash } from 'crypto'

const prisma = new PrismaClient()

/**
 * Simple password hasher using SHA256 - keeps things consistent with the auth routes
 * @param {string} password - plain text password
 * @returns {string} - hashed password
 */
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

/**
 * Main seeding function - sets up some famous football players for testing
 */
async function main() {
  // Clear existing data first
  await prisma.gamePlayer.deleteMany()
  await prisma.game.deleteMany()
  await prisma.foosballTable.deleteMany()
  await prisma.user.deleteMany()

  const users = [
    {
      email: 'messi@epsi.fr',
      name: 'Lionel Messi',
      password: 'test123',
      score: 2450,
      firstName: 'Lionel',
      lastName: 'Messi',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=messi10',
      skillLevel: 'EXPERT',
      position: 'Attaquant',
      championship: 'EPSI Montpellier',
      xp: 2450,
      coins: 1200,
      elo: 2100,
      jerseyNumber: 10,
    },
    {
      email: 'ronaldo@epsi.fr',
      name: 'Cristiano Ronaldo',
      password: 'test123',
      score: 1890,
      firstName: 'Cristiano',
      lastName: 'Ronaldo',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ronaldo7',
      skillLevel: 'EXPERT',
      position: 'Attaquant',
      championship: 'EPSI Montpellier',
      xp: 1890,
      coins: 950,
      elo: 1980,
      jerseyNumber: 7,
    },
    {
      email: 'neymar@epsi.fr',
      name: 'Neymar Jr',
      password: 'test123',
      score: 1650,
      firstName: 'Neymar',
      lastName: 'Da Silva Santos Jr',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=neymar11',
      skillLevel: 'AVANCE',
      position: 'Milieu',
      championship: 'EPSI Montpellier',
      xp: 1650,
      coins: 800,
      elo: 1750,
      jerseyNumber: 11,
    },
    {
      email: 'mbappe@epsi.fr',
      name: 'Kylian Mbappé',
      password: 'test123',
      score: 1200,
      firstName: 'Kylian',
      lastName: 'Mbappé',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=mbappe9',
      skillLevel: 'INTERMEDIAIRE',
      position: 'Attaquant',
      championship: 'EPSI Montpellier',
      xp: 1200,
      coins: 600,
      elo: 1520,
      jerseyNumber: 9,
    },
  ]

  for (const userData of users) {
    const hashedPassword = hashPassword(userData.password)
    
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        score: userData.score,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        skillLevel: userData.skillLevel,
        position: userData.position,
        championship: userData.championship,
        xp: userData.xp,
        coins: userData.coins,
        elo: userData.elo,
        jerseyNumber: userData.jerseyNumber,
      },
    })

    console.log(`✅ Utilisateur créé: ${user.name} (${user.email}) - Score: ${user.score}`)
  }

  // Create foosball tables
  const tables = [
    {
      name: 'Table Principale',
      location: 'Salle principale - RDC',
      isActive: true,
      isAvailable: true,
    },
    {
      name: 'Table 2',
      location: 'Salle détente - 1er étage',
      isActive: true,
      isAvailable: false,
    },
  ]

  for (const tableData of tables) {
    const table = await prisma.foosballTable.create({
      data: tableData,
    })

    console.log(`🏓 Table créée: ${table.name} (${table.location}) - Disponible: ${table.isAvailable ? 'Oui' : 'Non'}`)
  }

  console.log('\n🎉 Base de données initialisée avec succès!')
  console.log('🔑 Mot de passe pour tous les utilisateurs de test: test123')
  console.log('📊 4 utilisateurs créés avec des profils complets')
  console.log('🏓 2 tables de baby-foot créées')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 