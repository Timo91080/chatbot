require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const express = require('express');
const { aiWeatherAgent } = require('./ai-agent');

// Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const PORT = process.env.PORT || 3000;

// Vérification des variables d'environnement
if (!TELEGRAM_BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN is required');
    process.exit(1);
}

if (!OPENWEATHER_API_KEY) {
    console.error('❌ OPENWEATHER_API_KEY is required');
    process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is required for AI agent');
    process.exit(1);
}

// Initialisation du bot Telegram
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Serveur Express pour le health check
const app = express();

app.get('/', (req, res) => {
    res.json({
        status: 'online',
        bot: 'Telegram Weather Bot',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Fonction pour extraire la ville depuis le message
function extractCityFromMessage(text) {
    // Patterns pour capturer différents formats de questions
    const patterns = [
        /(?:météo|meteo|temps|weather)\s+(?:à|a|pour|de|sur)\s+([a-zA-ZÀ-ÿ\-\s]+)/i,
        /(?:à|a|pour|de|sur)\s+([a-zA-ZÀ-ÿ\-\s]+)(?:\s+météo|\s+temps)?/i,
        /^([a-zA-ZÀ-ÿ\-\s]+)$/i // Juste le nom de ville
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            return match[1].trim();
        }
    }
    
    return null;
}

// Fonction pour obtenir la météo
async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erreur API météo:', error.response?.data || error.message);
        throw error;
    }
}

// Fonction pour formater la réponse météo
function formatWeatherResponse(weatherData) {
    const temp = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    const city = weatherData.name;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;

    // Emojis en fonction des conditions
    const weatherEmojis = {
        'clear sky': '☀️',
        'few clouds': '⛅',
        'scattered clouds': '☁️',
        'broken clouds': '☁️',
        'shower rain': '🌦️',
        'rain': '🌧️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️'
    };

    const emoji = weatherEmojis[weatherData.weather[0].description] || '🌤️';

    return `${emoji} **Météo à ${city}**

🌡️ **Température :** ${temp}°C
☁️ **Conditions :** ${description}
💧 **Humidité :** ${humidity}%
💨 **Vent :** ${windSpeed} m/s`;
}

// Gestionnaire pour la commande /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || 'utilisateur';
    
    const welcomeMessage = `🌤️ **Bienvenue sur WeatherBot !**

Salut ${firstName} ! 👋 Je suis ton assistant météo personnel.

🔍 **Comment m'utiliser :**
• Envoie-moi : "météo à [ville]"
• Exemples : 
  - "météo à Paris"
  - "temps à Lyon"
  - "quelle est la météo à Tokyo ?"

⚡ **Je peux te donner :**
• Température actuelle
• Conditions météo
• Humidité et vent

🚀 **Essaie maintenant !**
Demande-moi la météo de ta ville préférée !`;

    bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// Gestionnaire pour tous les autres messages
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Ignorer les commandes /start
    if (text && text.startsWith('/start')) {
        return;
    }

    try {
        // Envoyer un message "typing..." 
        bot.sendChatAction(chatId, 'typing');
        
        // Essayer d'abord l'agent IA, sinon utiliser la méthode classique
        try {
            const response = await aiWeatherAgent(text);
            bot.sendMessage(chatId, response);
            console.log(`✅ Réponse IA envoyée à l'utilisateur ${msg.from.first_name || 'Inconnu'}`);
        } catch (aiError) {
            console.log(`⚠️ Agent IA indisponible, utilisation méthode classique`);
            
            // Fallback vers la méthode classique
            const city = extractCityFromMessage(text);
            
            if (!city) {
                const helpMessage = `❓ **Je n'ai pas compris votre demande**

Essayez plutôt :
• "météo à Paris"
• "temps à Lyon"
• "quelle est la météo à Tokyo ?"

Ou tapez /start pour revoir les instructions.`;

                bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
                return;
            }

            const weatherData = await getWeather(city);
            const response = formatWeatherResponse(weatherData);
            bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
            
            console.log(`✅ Météo envoyée pour ${city} à l'utilisateur ${msg.from.first_name || 'Inconnu'}`);
        }
        
    } catch (error) {
        const errorMessage = `❌ **Erreur lors du traitement de votre demande**

Service temporairement indisponible. Veuillez réessayer dans quelques instants.`;

        bot.sendMessage(chatId, errorMessage, { parse_mode: 'Markdown' });
        console.error(`❌ Erreur:`, error.message);
    }
});

// Gestionnaire d'erreurs pour le bot
bot.on('error', (error) => {
    console.error('❌ Erreur du bot Telegram:', error);
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`🤖 Bot Telegram Weather activé`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
    console.log('🛑 Arrêt du bot...');
    bot.stopPolling();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Arrêt du bot...');
    bot.stopPolling();
    process.exit(0);
});
