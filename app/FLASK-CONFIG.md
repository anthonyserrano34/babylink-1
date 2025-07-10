# 🐍 Configuration Flask Backend

Guide pour configurer la connexion du backend Flask au serveur Next.js.

## Configuration par défaut

Par défaut, Flask se connecte au frontend Next.js sur :
- **URL par défaut** : `http://localhost:3000/api`

## Configuration serveur distant

Pour connecter le backend Flask (Raspberry Pi) au frontend Next.js (Windows), utilisez des variables d'environnement.

### Méthode 1: Fichier .env

Créez un fichier `.env` dans le dossier `app/` :

```bash
# app/.env
NEXTJS_API_URL=http://192.168.1.10:3000
```

### Méthode 2: Variables d'environnement système

```bash
# Linux/Raspberry Pi
export NEXTJS_API_URL=http://192.168.1.10:3000
python3 app.py

# Windows PowerShell  
$env:NEXTJS_API_URL="http://192.168.1.10:3000"
python app.py
```

## Exemples de configuration

```bash
# Frontend local forcé
NEXTJS_API_URL=http://localhost:3000

# Frontend sur Windows (IP locale)
NEXTJS_API_URL=http://192.168.1.10:3000

# Frontend avec hostname
NEXTJS_API_URL=http://windows-pc.local:3000

# Port personnalisé
NEXTJS_API_URL=http://192.168.1.50:4000
```

## Vérification

1. **Configurez** la variable d'environnement
2. **Redémarrez** Flask : `python3 app.py`
3. **Vérifiez** dans les logs Flask :
   ```
   🔌 Using custom Next.js API URL: http://192.168.1.10:3000/api
   🌐 Appel API Next.js: http://192.168.1.10:3000/api/auth/get-user-by-email?email=...
   ```

## Architecture type

```
┌─────────────────┐    ┌─────────────────┐
│   BACKEND       │    │   FRONTEND      │
│   Raspberry Pi  │◄──►│   Windows PC    │
│   Flask :5000   │    │   Next.js :3000 │
│   192.168.1.100 │    │   192.168.1.10  │
└─────────────────┘    └─────────────────┘
```

Configuration sur le Raspberry Pi :
```bash
# app/.env
NEXTJS_API_URL=http://192.168.1.10:3000
```

## Utilisation avec python-dotenv (optionnel)

Pour charger automatiquement les fichiers `.env` :

```bash
# Installation
pip install python-dotenv

# Dans app.py (au début)
from dotenv import load_dotenv
load_dotenv()
```

## Notes importantes

- 🔄 **Redémarrage requis** : Toute modification nécessite un redémarrage de Flask
- 🌐 **URL complète** : Utilisez `http://` et le port complet
- 🔗 **API automatique** : `/api` est ajouté automatiquement à l'URL
- 🔥 **Firewall** : Le port 3000 doit être accessible depuis le Raspberry Pi
- 📡 **Réseau** : Les deux machines doivent être sur le même réseau

## Test de configuration

Pour tester la connexion à l'API Next.js :

```bash
# Depuis le Raspberry Pi
curl http://192.168.1.10:3000/api/auth/get-user-by-email?email=test@example.com
``` 