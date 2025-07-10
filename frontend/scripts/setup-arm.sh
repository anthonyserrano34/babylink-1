#!/bin/bash

# Setup script for ARM devices (Raspberry Pi)
# This script handles Prisma compatibility issues on ARM architectures

echo "🔧 BabyLink ARM Setup Script"
echo "📱 Detected ARM architecture, using optimized setup..."

# Check if we're on ARM
ARCH=$(uname -m)
echo "🔍 Architecture: $ARCH"

# Install dependencies first
echo "📦 Installing dependencies..."
npm install

# Create database directory if it doesn't exist
mkdir -p prisma

# Create database file if it doesn't exist
touch prisma/dev.db

# Try to create schema directly with SQL
echo "🗄️ Creating database schema..."
sqlite3 prisma/dev.db << 'EOF'
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
EOF

# Try to generate Prisma client
echo "⚙️ Attempting to generate Prisma client..."
if npx prisma generate; then
    echo "✅ Prisma client generated successfully"
    
    # Run seed
    echo "🌱 Running seed..."
    npx prisma db seed || {
        echo "⚠️ Seed failed, creating manual test data..."
        
        # Manual seed with SQL
        sqlite3 prisma/dev.db << 'EOF'
-- Clear existing data
DELETE FROM GamePlayer;
DELETE FROM Game;
DELETE FROM FoosballTable;
DELETE FROM User;

-- Insert test users (password hash for 'test123')
INSERT INTO User (email, name, password, score, firstName, lastName, avatar, skillLevel, position, championship, xp, coins, elo, jerseyNumber) VALUES
('messi@epsi.fr', 'Lionel Messi', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 2450, 'Lionel', 'Messi', 'https://api.dicebear.com/7.x/adventurer/svg?seed=messi10', 'EXPERT', 'Attaquant', 'EPSI Montpellier', 2450, 1200, 2100, 10),
('ronaldo@epsi.fr', 'Cristiano Ronaldo', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1890, 'Cristiano', 'Ronaldo', 'https://api.dicebear.com/7.x/adventurer/svg?seed=ronaldo7', 'EXPERT', 'Attaquant', 'EPSI Montpellier', 1890, 950, 1980, 7),
('neymar@epsi.fr', 'Neymar Jr', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1650, 'Neymar', 'Da Silva Santos Jr', 'https://api.dicebear.com/7.x/adventurer/svg?seed=neymar11', 'AVANCE', 'Milieu', 'EPSI Montpellier', 1650, 800, 1750, 11),
('mbappe@epsi.fr', 'Kylian Mbappé', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1200, 'Kylian', 'Mbappé', 'https://api.dicebear.com/7.x/adventurer/svg?seed=mbappe9', 'INTERMEDIAIRE', 'Attaquant', 'EPSI Montpellier', 1200, 600, 1520, 9);

-- Insert foosball tables
INSERT INTO FoosballTable (name, location, isActive, isAvailable) VALUES
('Table Principale', 'Salle principale - RDC', 1, 1),
('Table 2', 'Salle détente - 1er étage', 1, 0);

-- Insert test games
INSERT INTO Game (code, status, gameMode, tableId, hostId, scoreLeft, scoreRight) VALUES
('ABC123', 'waiting', '1v1', 1, 1, 0, 0),
('DEF456', 'playing', '1v1', 2, 3, 3, 2);

-- Insert game players
INSERT INTO GamePlayer (gameId, userId, team) VALUES
(1, 1, 'left'),
(1, 2, 'right'),
(2, 3, 'left'),
(2, 4, 'right');
EOF
        echo "✅ Manual test data created"
    }
else
    echo "⚠️ Prisma generate failed, but database schema is created"
    echo "🎯 You can still use the application, some features may be limited"
fi

echo ""
echo "🎉 ARM setup complete!"
echo "🔑 Test users password: test123"
echo "📊 Users: messi@epsi.fr, ronaldo@epsi.fr, neymar@epsi.fr, mbappe@epsi.fr"
echo ""
echo "🚀 To start the application:"
echo "   npm run dev"
echo "" 