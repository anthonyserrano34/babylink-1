import { PrismaClient } from '@prisma/client'
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
  await prisma.user.deleteMany()

  const users = [
    {
      email: 'messi@epsi.fr',
      name: 'Lionel Messi',
      password: 'test123',
      score: 2450,
    },
    {
      email: 'ronaldo@epsi.fr',
      name: 'Cristiano Ronaldo',
      password: 'test123',
      score: 1890,
    },
    {
      email: 'neymar@epsi.fr',
      name: 'Neymar Jr',
      password: 'test123',
      score: 1650,
    },
    {
      email: 'mbappe@epsi.fr',
      name: 'Kylian Mbappé',
      password: 'test123',
      score: 1200,
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
      },
    })

    console.log(`Utilisateur créé: ${user.name} (${user.email})`)
  }

  console.log('Base de données initialisée avec succès!')
  console.log('Mot de passe pour tous les utilisateurs de test: test123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 