# 🏓 BabyLink - Installation ARM (Raspberry Pi)

Guide d'installation spécialement conçu pour les appareils ARM comme le Raspberry Pi.

## 🔧 Installation sur Raspberry Pi

### Méthode 1: Script automatique (Recommandé)

```bash
cd frontend
chmod +x scripts/setup-arm.sh
./scripts/setup-arm.sh
```

### Méthode 2: Installation manuelle

Si le script automatique échoue, voici les étapes manuelles :

#### 1. Installer les dépendances

```bash
cd frontend
npm install
```

#### 2. Créer la base de données manuellement

```bash
# Créer le dossier prisma
mkdir -p prisma

# Créer le fichier de base de données
touch prisma/dev.db

# Créer le schéma avec SQLite
sqlite3 prisma/dev.db < scripts/schema.sql
```

#### 3. Essayer Prisma (optionnel)

```bash
# Tentative de génération du client Prisma
npx prisma generate

# Si ça marche, lancer le seed
npx prisma db seed
```

#### 4. Données de test manuelles (si Prisma échoue)

```bash
sqlite3 prisma/dev.db << 'EOF'
-- Utilisateurs test (mot de passe: test123)
INSERT INTO User (email, name, password, score, firstName, lastName) VALUES
('messi@epsi.fr', 'Lionel Messi', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 2450, 'Lionel', 'Messi'),
('ronaldo@epsi.fr', 'Cristiano Ronaldo', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1890, 'Cristiano', 'Ronaldo');

-- Tables de baby-foot
INSERT INTO FoosballTable (name, location, isActive, isAvailable) VALUES
('Table Principale', 'Salle principale', 1, 1);
EOF
```

## 🚀 Démarrage

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🔐 Comptes de test

- **Email**: messi@epsi.fr
- **Mot de passe**: test123

## 🛠️ Dépannage ARM

### Erreur "Invalid params: invalid type: map"

Cette erreur est causée par une incompatibilité Prisma/ARM. Solutions :

1. **Utiliser le script ARM** : `./scripts/setup-arm.sh`
2. **Version Prisma downgrade** : Le package.json utilise Prisma 5.19.1
3. **Fallback SQLite direct** : Le script crée la base manuellement

### Erreur de génération Prisma

```bash
# Forcer la génération avec architecture native
PRISMA_CLI_BINARY_TARGETS=native npx prisma generate
```

### Erreur "No such file engine"

```bash
# Nettoyer et réinstaller
rm -rf node_modules/.prisma
rm -rf src/generated
npm install
npx prisma generate
```

## 📋 Architecture détectées supportées

- ✅ **armv7l** (Raspberry Pi 32-bit)
- ✅ **aarch64** (Raspberry Pi 64-bit)  
- ✅ **x86_64** (PC Linux/Windows/Mac)

## 🔄 Alternative à Prisma

Si Prisma continue de poser problème, l'application peut fonctionner avec SQLite direct. Le schema et les données sont créés automatiquement.

## 📞 Support

En cas de problème :

1. Vérifier l'architecture : `uname -m`
2. Vérifier Node.js : `node --version` (>= 18)
3. Utiliser le script ARM : `./scripts/setup-arm.sh`
4. Consulter les logs du script pour identifier l'erreur 