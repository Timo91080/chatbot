# 🤖 Telegram Weather Chatbot

Un chatbot Telegram professionnel qui fournit des informations météorologiques en temps réel en utilisant l'API OpenWeatherMap.

## ✨ Fonctionnalités

- 🌤️ **Météo en temps réel** - Température, conditions, humidité, vent
- 🤖 **Interface Telegram intuitive** - Commandes simples et réponses formatées
- 🌍 **Support international** - Fonctionne pour toutes les villes du monde
- 📱 **Réponses intelligentes** - Extraction automatique des noms de villes
- 🚀 **Déployement cloud** - Prêt pour la production
- ⚡ **Health check** - Monitoring et vérification du statut

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **node-telegram-bot-api** - Intégration Telegram
- **axios** - Requêtes HTTP
- **Express.js** - Serveur web pour health checks
- **OpenWeatherMap API** - Données météorologiques

## 🚀 Installation rapide

### 1. Cloner le projet
```bash
git clone <your-repo-url>
cd telegram-weather-chatbot
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration
Copier le fichier d'exemple et configurer vos clés API :
```bash
cp .env.example .env
```

Éditer le fichier `.env` :
```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
PORT=3000
```

### 4. Lancer le bot
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## 🔑 Configuration des API

### Telegram Bot Token
1. Ouvrir Telegram et chercher `@BotFather`
2. Envoyer `/newbot`
3. Suivre les instructions pour créer votre bot
4. Copier le token fourni dans `.env`

### OpenWeatherMap API Key
1. Créer un compte sur [OpenWeatherMap](https://openweathermap.org/api)
2. Aller dans "API Keys"
3. Copier votre clé API dans `.env`

## 📱 Utilisation

### Commandes disponibles
- `/start` - Message de bienvenue et instructions
- `météo à [ville]` - Obtenir la météo d'une ville
- `temps à [ville]` - Alternative pour demander la météo

### Exemples de requêtes
```
✅ "météo à Paris"
✅ "temps à Lyon"
✅ "quelle est la météo à Tokyo ?"
✅ "météo pour New York"
```

## 🌐 Déploiement

### Railway (Recommandé)
1. Fork ce repository
2. Créer un compte sur [Railway](https://railway.app)
3. "New Project" → "Deploy from GitHub repo"
4. Ajouter les variables d'environnement
5. Déployer !

### Render
1. Fork ce repository
2. Créer un compte sur [Render](https://render.com)
3. "New Web Service" → Connecter GitHub
4. Configurer les variables d'environnement
5. Déployer !

### Variables d'environnement à configurer
```
TELEGRAM_BOT_TOKEN=votre_token_telegram
OPENWEATHER_API_KEY=votre_cle_openweather
PORT=3000
```

## 📊 Monitoring

Le bot inclut des endpoints de monitoring :

- `GET /` - Statut général du bot
- `GET /health` - Health check simple

Réponse exemple :
```json
{
  "status": "online",
  "bot": "Telegram Weather Bot",
  "uptime": 3600,
  "timestamp": "2025-01-08T19:00:00.000Z"
}
```

## 🔧 Développement

### Structure du projet
```
telegram-weather-chatbot/
├── index.js              # Point d'entrée principal
├── package.json          # Dépendances et scripts
├── .env.example          # Modèle de configuration
├── .gitignore           # Fichiers à ignorer
├── README.md            # Documentation
└── .github/
    └── copilot-instructions.md
```

### Scripts disponibles
```bash
npm start       # Lancer en production
npm run dev     # Lancer en développement avec auto-reload
npm test        # Lancer les tests (à implémenter)
```

## ⚡ Fonctionnalités avancées

- **Extraction intelligente de ville** - Reconnaissance de multiples formats
- **Gestion d'erreurs robuste** - Messages d'erreur explicites
- **Emojis contextuels** - Icônes météo appropriées
- **Support multilingue** - Réponses en français
- **Rate limiting** - Protection contre le spam
- **Logging** - Suivi des requêtes et erreurs

## 🆘 Dépannage

### Le bot ne répond pas
1. Vérifier que le token Telegram est correct
2. S'assurer que le bot est bien démarré (`npm start`)
3. Vérifier les logs pour d'éventuelles erreurs

### Erreurs API météo
1. Vérifier la clé OpenWeatherMap
2. S'assurer que la ville existe dans l'API
3. Vérifier la limite de requêtes (gratuit = 1000/jour)

### Problèmes de déploiement
1. Vérifier que toutes les variables d'environnement sont configurées
2. S'assurer que le port est correctement configuré
3. Vérifier les logs de déploiement

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir une issue pour signaler un bug
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 👨‍💻 Auteur

**Timothée Dikete**
- Développeur Full Stack
- Spécialisé en applications Node.js et chatbots

---

⭐ **N'oubliez pas de star le repo si ce projet vous a aidé !**
