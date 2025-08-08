# 🤖 MISSION : Chatbot Météo Telegram

## 🎯 OBJECTIF DE LA MISSION
Développement d'un chatbot capable de répondre à des demandes météo via Telegram, en utilisant Node.js et l'API OpenWeatherMap.

## 🔗 ACCÈS AU CHATBOT
**Plateforme :** Telegram  
**Déploiement :** Render (cloud)  
**Statut :** ✅ Opérationnel 24/7

### Comment tester le bot :
1. Ouvrir Telegram
2. Chercher le bot déployé @chatlumibot
3. Envoyer `/start` pour commencer
4. Taper "météo à [ville]" pour obtenir la météo

## IMPORTANTS 
→ Le bot va se mettre en "veille" après ~15 minutes sans activité et redémarrer quand quelqu'un l'utilise (délai de ~30 secondes) (cause: la fonctionalité gratuite de render)


## 🛠️ CHOIX TECHNIQUE : Node.js

### Stack utilisée :
- **Node.js** - Runtime JavaScript (choix pour la rapidité de développement)
- **node-telegram-bot-api** - SDK officiel Telegram
- **axios** - Client HTTP pour les appels API
- **Express.js** - Serveur web pour health checks
- **OpenWeatherMap API** - API météo gratuite et fiable
- **Render** - Plateforme de déploiement cloud gratuite

### Pourquoi Node.js ?
- Développement rapide et efficace
- Écosystème riche (npm)
- Gestion native des API REST
- Déploiement simple sur le cloud

## ⚡ FONCTIONNALITÉS RÉALISÉES

✅ **Extraction intelligente de ville** - Parse automatiquement les questions :
- "Quelle est la météo à Paris ?" 
- "météo à Lyon"
- "temps pour Tokyo"

✅ **Appel API météo en temps réel** - OpenWeatherMap API
- Température actuelle
- Conditions météorologiques
- Humidité et vitesse du vent

✅ **Réponses formatées** - Messages clairs avec emojis :
> ☀️ **Météo à Paris**  
> 🌡️ **Température :** 26°C  
> ☁️ **Conditions :** ciel dégagé  
> 💧 **Humidité :** 45%  
> 💨 **Vent :** 3.2 m/s

✅ **Gestion d'erreurs** - Messages explicites pour villes inexistantes

✅ **Interface utilisateur** - Commande `/start` avec instructions complètes

## 📁 CODE SOURCE

### Lien github:https://github.com/Timo91080/chatbot

### Structure du projet :
```
chatbot/
├── index.js              # Point d'entrée principal
├── package.json          # Dépendances et scripts
├── .env                  # Variables d'environnement
├── .env.example          # Template de configuration
├── .gitignore           # Fichiers ignorés par Git
└── README.md            # Documentation
```

### Logique principale (`index.js`) :

1. **Initialisation** - Configuration du bot Telegram et Express
2. **Extraction de ville** - Regex pour parser les questions utilisateur
3. **Appel API météo** - Requête vers OpenWeatherMap
4. **Formatage réponse** - Génération du message avec emojis
5. **Gestion erreurs** - Messages d'aide en cas d'échec


## ⏱️ TEMPS PASSÉ ESTIMÉ

**Total : ~1h35 heures**
- Setup environnement & API : 10min
- Développement du bot : 40min
- Tests et debug : 30min
- Déploiement et documentation : 15min

## ✅ CRITÈRES DE RÉUSSITE VALIDÉS

✅ **Réponses correctes** - Le bot répond pour toutes les villes testées  
✅ **Extraction automatique** - Parse correctement les questions variées  
✅ **Déploiement fonctionnel** - Accessible 24/7 via Render  
✅ **Interface intuitive** - Commandes simples et aide intégrée  
✅ **API documentée** - OpenWeatherMap bien intégrée

## 🧪 EXEMPLES DE TESTS

### Conversations de test validées :

```
  Utilisateur : /start
🤖 Bot : 🌤️ Bienvenue sur WeatherBot ! [Instructions complètes]

👤 Utilisateur : météo à Paris
🤖 Bot : ☀️ Météo à Paris
        🌡️ Température : 22°C
        ☁️ Conditions : ciel dégagé
        💧 Humidité : 58%
        💨 Vent : 2.1 m/s

👤 Utilisateur : quelle est la météo à Tokyo ?
🤖 Bot : 🌧️ Météo à Tokyo
        🌡️ Température : 18°C
        ☁️ Conditions : pluie légère
        💧 Humidité : 78%
        💨 Vent : 4.3 m/s

👤 Utilisateur : temps à VilleInexistante
🤖 Bot : ❌ La ville "VilleInexistante" n'a pas été trouvée.
        Vérifiez l'orthographe ou essayez avec une autre ville.
```



## 👨‍💻 AUTEUR

**Timothée Dikete**  
Développeur Full Stack  
Mission réalisée avec Node.js

---

⭐ **Mission accomplie** - Chatbot météo Telegram opérationnel !
