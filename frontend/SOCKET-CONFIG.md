# 🔌 Configuration Socket.IO

Guide pour configurer la connexion au serveur Socket.IO distant (ex: Raspberry Pi).

## Configuration par défaut

Par défaut, BabyLink détecte automatiquement l'IP du serveur Socket.IO :
- Si vous êtes en **local** : `http://localhost:5000`
- Si vous accédez depuis une **autre machine** : `http://{IP_DU_FRONTEND}:5000`

## Configuration serveur distant

Pour connecter le frontend Next.js (Windows) au backend Flask (Raspberry Pi), créez un fichier `.env.local` dans le dossier `frontend/` :

```bash
# frontend/.env.local
NEXT_PUBLIC_SOCKET_URL=http://192.168.1.100:5000
```

## Exemples de configuration

```bash
# Local forcé
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Raspberry Pi avec IP locale
NEXT_PUBLIC_SOCKET_URL=http://192.168.1.100:5000

# Serveur avec hostname
NEXT_PUBLIC_SOCKET_URL=http://babylink.local:5000

# Port personnalisé
NEXT_PUBLIC_SOCKET_URL=http://192.168.1.50:3001
```

## Vérification

1. **Créez** le fichier `.env.local` avec votre configuration
2. **Redémarrez** le serveur Next.js : `npm run dev`
3. **Vérifiez** dans la console du navigateur :
   ```
   🔌 Using custom Socket.IO server URL: http://192.168.1.100:5000
   ✅ Connected to Flask Socket.IO server at http://192.168.1.100:5000
   ```

## Architecture type

```
┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │   BACKEND       │
│   Windows PC    │◄──►│   Raspberry Pi  │
│   Next.js :3000 │    │   Flask :5000   │
│   192.168.1.10  │    │   192.168.1.100 │
└─────────────────┘    └─────────────────┘
```

Configuration dans `.env.local` :
```bash
NEXT_PUBLIC_SOCKET_URL=http://192.168.1.100:5000
```

## Notes importantes

- ⚠️ **Redémarrage requis** : Toute modification de `.env.local` nécessite un redémarrage de `npm run dev`
- 🔧 **Variables publiques** : `NEXT_PUBLIC_*` sont visibles côté client (nécessaire pour Socket.IO)
- 🌐 **Réseau local** : Assurez-vous que les deux machines sont sur le même réseau
- 🔥 **Firewall** : Le port 5000 doit être ouvert sur le Raspberry Pi 