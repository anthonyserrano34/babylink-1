# 🏗️ Configuration Complète - Architecture Distribuée

Guide complet pour configurer BabyLink avec frontend et backend sur des machines séparées.

## 🎯 Scénario type : Windows + Raspberry Pi

```
┌─────────────────────┐         ┌─────────────────────┐
│    WINDOWS PC       │◄───────►│    RASPBERRY PI     │
│                     │         │                     │
│  📱 Frontend        │  WiFi   │  🔧 Backend         │
│  • Next.js :3000   │  LAN    │  • Flask :5000      │
│  • React UI         │         │  • Socket.IO        │
│  • Browser          │         │  • Arduino USB      │
│  192.168.1.10       │         │  192.168.1.100      │
└─────────────────────┘         └─────────────────────┘
```

## 📍 Étape 1: Identifier les adresses IP

### Windows (Frontend)
```bash
# PowerShell
ipconfig
# Chercher "Adresse IPv4" de votre connexion WiFi
# Exemple: 192.168.1.10
```

### Raspberry Pi (Backend)  
```bash
# Terminal
hostname -I
# Exemple: 192.168.1.100
```

## ⚙️ Étape 2: Configuration Frontend (Windows)

### Créer le fichier de configuration

```bash
# Dans frontend/.env.local
NEXT_PUBLIC_SOCKET_URL=http://192.168.1.100:5000
```

### Redémarrer Next.js
```bash
cd frontend
npm run dev
```

### Vérification
Dans la console du navigateur, vous devriez voir :
```
🔌 Using custom Socket.IO server URL: http://192.168.1.100:5000
✅ Connected to Flask Socket.IO server at http://192.168.1.100:5000
```

## 🐍 Étape 3: Configuration Backend (Raspberry Pi)

### Méthode A: Variable d'environnement
```bash
# Terminal Raspberry Pi
export NEXTJS_API_URL=http://192.168.1.10:3000
cd app
python3 app.py
```

### Méthode B: Fichier .env (recommandé)
```bash
# Créer app/.env
echo "NEXTJS_API_URL=http://192.168.1.10:3000" > app/.env

# Installer python-dotenv (optionnel)
pip install python-dotenv

# Modifier app.py (ajouter au début)
from dotenv import load_dotenv
load_dotenv()
```

### Redémarrer Flask
```bash
cd app
python3 app.py --fake  # Mode simulation sans Arduino
```

### Vérification
Dans les logs Flask, vous devriez voir :
```
🔌 Using custom Next.js API URL: http://192.168.1.10:3000/api
🌐 Appel API Next.js: http://192.168.1.10:3000/api/auth/get-user-by-email
```

## 🧪 Étape 4: Test de bout en bout

### 1. Tester la connexion réseau
```bash
# Depuis Windows vers Raspberry Pi
curl http://192.168.1.100:5000

# Depuis Raspberry Pi vers Windows  
curl http://192.168.1.10:3000/api/auth/get-user-by-email?email=test@test.com
```

### 2. Tester l'interface
1. **Ouvrir** `http://localhost:3000` sur Windows
2. **Se connecter** avec un compte test (ex: messi@epsi.fr / test123)
3. **Vérifier** que les données utilisateur se chargent (appel API vers Raspberry Pi)
4. **Créer une partie** et vérifier la connexion Socket.IO temps réel

## 📋 Configuration complète

### Frontend (Windows) - `frontend/.env.local`
```bash
# Socket.IO vers Raspberry Pi
NEXT_PUBLIC_SOCKET_URL=http://192.168.1.100:5000
```

### Backend (Raspberry Pi) - `app/.env`
```bash
# API Next.js vers Windows
NEXTJS_API_URL=http://192.168.1.10:3000
```

## 🚨 Troubleshooting

### Problème : Connexion Socket refusée
- ✅ Vérifier que Flask tourne sur le Raspberry Pi
- ✅ Tester `curl http://192.168.1.100:5000` depuis Windows
- ✅ Vérifier le firewall du Raspberry Pi (port 5000)

### Problème : API Next.js inaccessible
- ✅ Vérifier que Next.js tourne sur Windows
- ✅ Tester `curl http://192.168.1.10:3000` depuis Raspberry Pi  
- ✅ Vérifier le firewall Windows (port 3000)
- ✅ Vérifier que Next.js écoute sur toutes les interfaces : `next dev -H 0.0.0.0`

### Problème : Base de données non trouvée
- ✅ Vérifier que Prisma est configuré sur Windows
- ✅ Lancer `npm run setup-db` dans frontend/
- ✅ Vérifier le fichier `frontend/prisma/dev.db`

## 🔧 Configuration avancée

### Pour plusieurs réseaux
```bash
# Frontend - multiple fallbacks
NEXT_PUBLIC_SOCKET_URL=http://babylink-backend.local:5000

# Backend - hostname statique
NEXTJS_API_URL=http://babylink-frontend.local:3000
```

### Pour Docker/containers
```bash
# Utiliser les noms de containers
NEXT_PUBLIC_SOCKET_URL=http://babylink-backend:5000
NEXTJS_API_URL=http://babylink-frontend:3000
```

## ✅ Checklist finale

- [ ] IPs identifiées pour Windows et Raspberry Pi
- [ ] `frontend/.env.local` créé avec SOCKET_URL  
- [ ] `app/.env` créé avec NEXTJS_API_URL
- [ ] Next.js redémarré sur Windows
- [ ] Flask redémarré sur Raspberry Pi
- [ ] Test de connexion réseau réussi
- [ ] Interface accessible et fonctionnelle
- [ ] Socket.IO temps réel opérationnel

---

**🎮 Une fois configuré, vous avez une architecture professionnelle avec frontend moderne et backend IoT séparés !** 