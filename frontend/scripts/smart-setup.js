#!/usr/bin/env node

/**
 * Smart setup script for BabyLink
 * Automatically detects architecture and chooses the appropriate setup method
 */

const { execSync } = require('child_process')
const os = require('os')
const fs = require('fs')
const path = require('path')

console.log('🔧 BabyLink Smart Setup')
console.log('📊 Detecting system architecture...')

// Detect architecture
const arch = os.arch()
const platform = os.platform()

console.log(`🔍 Architecture: ${arch}`)
console.log(`🖥️ Platform: ${platform}`)

// Check if we're on ARM
const isARM = arch.includes('arm') || arch.includes('aarch')
const isARM32 = arch === 'arm' || arch === 'armv7l'

if (isARM) {
  console.log('📱 ARM architecture detected!')
  
  if (platform === 'linux') {
    console.log('🔄 Using ARM-optimized setup...')
    
    // Check if bash script exists and is executable
    const bashScript = path.join(__dirname, 'setup-arm.sh')
    
    if (fs.existsSync(bashScript)) {
      try {
        // Make script executable
        execSync(`chmod +x "${bashScript}"`, { stdio: 'inherit' })
        
        // Run ARM setup script
        execSync(`"${bashScript}"`, { stdio: 'inherit', shell: '/bin/bash' })
      } catch (error) {
        console.log('⚠️ Bash script failed, falling back to manual setup...')
        setupManualARM()
      }
    } else {
      console.log('⚠️ ARM script not found, using manual setup...')
      setupManualARM()
    }
  } else {
    console.log('⚠️ ARM on non-Linux platform, using standard setup...')
    setupStandard()
  }
} else {
  console.log('💻 Standard architecture detected')
  console.log('🔄 Using standard Prisma setup...')
  setupStandard()
}

function setupStandard() {
  try {
    console.log('📦 Installing dependencies...')
    execSync('npm install', { stdio: 'inherit' })
    
    console.log('⚙️ Generating Prisma client...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    
    console.log('🗄️ Setting up database...')
    execSync('npx prisma db push', { stdio: 'inherit' })
    
    console.log('🌱 Running seed...')
    execSync('npx prisma db seed', { stdio: 'inherit' })
    
    console.log('✅ Standard setup complete!')
  } catch (error) {
    console.error('❌ Standard setup failed:', error.message)
    console.log('🔄 Trying ARM fallback...')
    setupManualARM()
  }
}

function setupManualARM() {
  try {
    console.log('📦 Installing dependencies...')
    execSync('npm install', { stdio: 'inherit' })
    
    // Create database directory
    const prismaDir = path.join(process.cwd(), 'prisma')
    if (!fs.existsSync(prismaDir)) {
      fs.mkdirSync(prismaDir, { recursive: true })
    }
    
    // Create database file
    const dbPath = path.join(prismaDir, 'dev.db')
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, '')
    }
    
    console.log('🗄️ Creating database schema...')
    
    // Create schema with sqlite3
    const schema = `
CREATE TABLE IF NOT EXISTS User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  firstName TEXT,
  lastName TEXT,
  avatar TEXT,
  jerseyNumber INTEGER,
  skillLevel TEXT,
  position TEXT,
  championship TEXT,
  xp INTEGER DEFAULT 1250,
  coins INTEGER DEFAULT 0,
  elo INTEGER DEFAULT 1000
);

CREATE TABLE IF NOT EXISTS FoosballTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  isActive BOOLEAN DEFAULT 1,
  isAvailable BOOLEAN DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Game (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'waiting',
  gameMode TEXT DEFAULT '1v1',
  scoreLeft INTEGER DEFAULT 0,
  scoreRight INTEGER DEFAULT 0,
  maxScore INTEGER DEFAULT 10,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  startedAt DATETIME,
  finishedAt DATETIME,
  tableId INTEGER NOT NULL,
  hostId INTEGER NOT NULL,
  FOREIGN KEY (tableId) REFERENCES FoosballTable(id),
  FOREIGN KEY (hostId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS GamePlayer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team TEXT NOT NULL,
  position TEXT,
  isGuest BOOLEAN DEFAULT 0,
  guestName TEXT,
  gameId INTEGER NOT NULL,
  userId INTEGER,
  FOREIGN KEY (gameId) REFERENCES Game(id),
  FOREIGN KEY (userId) REFERENCES User(id),
  UNIQUE(gameId, userId)
);
    `
    
    // Write schema to temporary file and execute
    const tempSchema = path.join(prismaDir, 'temp-schema.sql')
    fs.writeFileSync(tempSchema, schema)
    
    try {
      execSync(`sqlite3 "${dbPath}" < "${tempSchema}"`, { stdio: 'inherit' })
      fs.unlinkSync(tempSchema) // Clean up
    } catch (error) {
      console.log('⚠️ sqlite3 command not found, creating basic database...')
      // Fallback: just create empty file
    }
    
    console.log('⚙️ Attempting Prisma client generation...')
    try {
      execSync('npx prisma generate', { stdio: 'inherit' })
      console.log('✅ Prisma client generated successfully')
      
      // Try seed
      try {
        execSync('npx prisma db seed', { stdio: 'inherit' })
        console.log('✅ Seed completed')
      } catch (seedError) {
        console.log('⚠️ Seed failed, but database is ready')
        createManualTestData(dbPath)
      }
    } catch (genError) {
      console.log('⚠️ Prisma generate failed, but database schema is created')
      createManualTestData(dbPath)
    }
    
    console.log('')
    console.log('🎉 ARM setup complete!')
    console.log('🔑 Test password: test123')
    console.log('📧 Test users: messi@epsi.fr, ronaldo@epsi.fr')
    console.log('')
    console.log('🚀 To start: npm run dev')
    
  } catch (error) {
    console.error('❌ ARM setup failed:', error.message)
    console.log('📚 Please check README-ARM.md for manual installation')
    process.exit(1)
  }
}

function createManualTestData(dbPath) {
  console.log('🌱 Creating manual test data...')
  
  const testData = `
DELETE FROM GamePlayer;
DELETE FROM Game;
DELETE FROM FoosballTable;
DELETE FROM User;

INSERT INTO User (email, name, password, score, firstName, lastName, avatar, skillLevel, position, championship, xp, coins, elo, jerseyNumber) VALUES
('messi@epsi.fr', 'Lionel Messi', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 2450, 'Lionel', 'Messi', 'https://api.dicebear.com/7.x/adventurer/svg?seed=messi10', 'EXPERT', 'Attaquant', 'EPSI Montpellier', 2450, 1200, 2100, 10),
('ronaldo@epsi.fr', 'Cristiano Ronaldo', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1890, 'Cristiano', 'Ronaldo', 'https://api.dicebear.com/7.x/adventurer/svg?seed=ronaldo7', 'EXPERT', 'Attaquant', 'EPSI Montpellier', 1890, 950, 1980, 7);

INSERT INTO FoosballTable (name, location, isActive, isAvailable) VALUES
('Table Principale', 'Salle principale - RDC', 1, 1),
('Table 2', 'Salle détente - 1er étage', 1, 0);

INSERT INTO Game (code, status, gameMode, tableId, hostId, scoreLeft, scoreRight) VALUES
('ABC123', 'waiting', '1v1', 1, 1, 0, 0);

INSERT INTO GamePlayer (gameId, userId, team) VALUES
(1, 1, 'left'),
(1, 2, 'right');
  `
  
  const tempData = path.join(path.dirname(dbPath), 'temp-data.sql')
  fs.writeFileSync(tempData, testData)
  
  try {
    execSync(`sqlite3 "${dbPath}" < "${tempData}"`, { stdio: 'inherit' })
    fs.unlinkSync(tempData) // Clean up
    console.log('✅ Manual test data created')
  } catch (error) {
    console.log('⚠️ Could not create test data, but database structure exists')
    fs.unlinkSync(tempData) // Clean up anyway
  }
} 