# 🤖 MISSION : Chatbot Météo Telegram avec Agent IA

## 🎯 OBJECTIF DE LA MISSION
Développement d'un chatbot intelligent capable de répondre à des demandes météo via Telegram, utilisant un agent IA avec Node.js, OpenAI et l'API OpenWeatherMap.

## 🧠 NOUVELLE FONCTIONNALITÉ : AGENT IA
L'agent IA peut maintenant comprendre et répondre à des questions météo en langage naturel :

**Exemples de questions supportées :**
- "Il fait combien à Marseille ?"
- "Quel temps fait-il à Paris ?"
- "Est-ce qu'il pleut à Lyon ?"
- "Comment est la météo à Tokyo aujourd'hui ?"

**Réponses naturelles :**
- "Il fait 32°C à Marseille avec un ciel dégagé"
- "À Paris, la température est de 22°C avec quelques nuages"

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
- **OpenAI GPT-3.5** - Agent IA pour la compréhension du langage naturel
- **node-telegram-bot-api** - SDK officiel Telegram
- **axios** - Client HTTP pour les appels API
- **Express.js** - Serveur web pour health checks
- **OpenWeatherMap API** - API météo gratuite et fiable
- **Render** - Plateforme de déploiement cloud gratuite

### Pourquoi Node.js + OpenAI ?
- Développement rapide et efficace
- Écosystème riche (npm)
- Gestion native des API REST
- Agent IA pour conversations naturelles
- Déploiement simple sur le cloud

## ⚡ FONCTIONNALITÉS RÉALISÉES

✅ **Agent IA conversationnel** - Comprend le langage naturel :
- "Il fait combien à Marseille ?" 
- "Quel temps fait-il à Paris ?"
- "Est-ce qu'il pleut à Lyon ?"

✅ **Extraction intelligente de ville** - L'IA identifie automatiquement la ville dans la question

✅ **Appel API météo en temps réel** - OpenWeatherMap API
- Température actuelle
- Conditions météorologiques
- Humidité et vitesse du vent

✅ **Réponses naturelles** - L'IA génère des réponses conversationnelles :
> "Il fait 32°C à Marseille avec un ciel dégagé"  
> "À Paris, la température est de 22°C avec quelques nuages"  
> "Il pleut actuellement à Lyon, 18°C"

✅ **Gestion d'erreurs intelligente** - L'IA adapte ses réponses selon le contexte

✅ **Interface utilisateur** - Commande `/start` avec instructions complètes

## 📁 CODE SOURCE

### Lien github:https://github.com/Timo91080/chatbot

### Structure du projet :
```
chatbot/
├── index.js              # Point d'entrée principal
├── ai-agent.js           # Agent IA avec OpenAI
├── package.json          # Dépendances et scripts
├── .env                  # Variables d'environnement
├── .env.example          # Template de configuration
├── .gitignore           # Fichiers ignorés par Git
└── README.md            # Documentation
```

### Logique principale (`index.js`) :

1. **Initialisation** - Configuration du bot Telegram, Express et Agent IA
2. **Réception message** - Écoute des messages utilisateur
3. **Agent IA** - Analyse et traitement avec OpenAI
4. **Appel API météo** - Requête vers OpenWeatherMap si nécessaire
5. **Réponse naturelle** - Génération de réponse conversationnelle

### Agent IA (`ai-agent.js`) :

1. **Analyse NLP** - Compréhension du langage naturel
2. **Function Calling** - Utilisation d'outils (API météo)
3. **Génération réponse** - Création de réponses naturelles


## ⏱️ TEMPS PASSÉ ESTIMÉ

**Total : ~2h30 heures**
- Setup environnement & API : 15min
- Développement du bot initial : 40min
- Intégration Agent IA OpenAI : 45min
- Tests et debug : 35min
- Déploiement et documentation : 15min

## ✅ CRITÈRES DE RÉUSSITE VALIDÉS

✅ **Agent IA fonctionnel** - Comprend et répond en langage naturel  
✅ **Réponses correctes** - Le bot répond pour toutes les villes testées  
✅ **Extraction automatique** - L'IA identifie les villes dans les questions variées  
✅ **Déploiement fonctionnel** - Accessible 24/7 via Render  
✅ **Interface intuitive** - Conversations naturelles  
✅ **API documentée** - OpenWeatherMap et OpenAI bien intégrées

## 🧪 EXEMPLES DE TESTS

### Conversations de test validées avec Agent IA :

```
👤 Utilisateur : /start
🤖 Bot : 🌤️ Bienvenue sur WeatherBot ! [Instructions complètes]

👤 Utilisateur : Il fait combien à Marseille ?
🤖 Bot : Il fait 32°C à Marseille avec un ciel dégagé.

👤 Utilisateur : Quel temps fait-il à Paris ?
🤖 Bot : À Paris, la température est de 22°C avec quelques nuages et une humidité de 58%.

👤 Utilisateur : Est-ce qu'il pleut à Lyon ?
🤖 Bot : Non, il ne pleut pas à Lyon actuellement. Il fait 19°C avec un ciel partiellement nuageux.

👤 Utilisateur : Comment est la météo à Tokyo aujourd'hui ?
🤖 Bot : À Tokyo aujourd'hui, il fait 18°C avec de la pluie légère et un vent de 4.3 m/s.

👤 Utilisateur : VilleInexistante
🤖 Bot : Je n'ai pas pu trouver d'informations météo pour cette ville. Pourriez-vous vérifier l'orthographe ?
```



## 👨‍💻 AUTEUR

**Timothée Dikete**  
Développeur Full Stack  
Mission réalisée avec Node.js

---

⭐ **Mission accomplie** - Chatbot météo Telegram opérationnel !
