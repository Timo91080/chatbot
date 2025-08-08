require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

// Configuration Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Fonction pour obtenir la météo (même que dans index.js)
async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=fr`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erreur API météo:', error.response?.data || error.message);
        throw error;
    }
}

// Agent IA principal avec Gemini
async function aiWeatherAgent(userInput) {
    try {
        // D'abord, analyser si c'est une question météo et extraire la ville
        const extractPrompt = `Analyse ce message et extrait le nom de la ville si c'est une question météo.
        
Message: "${userInput}"

Si c'est une question météo, réponds SEULEMENT avec le nom de la ville.
Si ce n'est pas une question météo, réponds "NON_METEO".

Exemples:
- "Il fait combien à Paris ?" → Paris
- "Quel temps à Lyon ?" → Lyon  
- "Bonjour comment ça va ?" → NON_METEO`;

        const extractResult = await model.generateContent(extractPrompt);
        const cityExtracted = extractResult.response.text().trim();

        if (cityExtracted === "NON_METEO") {
            return "Je suis un assistant météo. Posez-moi une question sur la météo d'une ville ! Exemple : 'Il fait combien à Paris ?'";
        }

        // Obtenir les données météo
        const weatherData = await getWeather(cityExtracted);
        
        // Générer une réponse naturelle avec les données météo
        const responsePrompt = `Tu es un assistant météo sympathique. Réponds de manière naturelle et conversationnelle à cette question météo.

Question originale: "${userInput}"
Ville: ${weatherData.name}
Température: ${Math.round(weatherData.main.temp)}°C
Conditions: ${weatherData.weather[0].description}
Humidité: ${weatherData.main.humidity}%
Vent: ${weatherData.wind.speed} m/s

Génère une réponse naturelle et amicale. Garde ça court et clair.

Exemples de style:
- "Il fait 25°C à Paris avec un ciel dégagé"
- "À Lyon, la température est de 18°C avec de la pluie"`;

        const finalResult = await model.generateContent(responsePrompt);
        return finalResult.response.text().trim();

    } catch (error) {
        console.error('Erreur Agent IA Gemini:', error);
        return "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.";
    }
}

module.exports = { aiWeatherAgent };

// Test en standalone
if (require.main === module) {
    (async () => {
        const test = "Il fait combien à Marseille ?";
        console.log("Question:", test);
        const response = await aiWeatherAgent(test);
        console.log("Réponse:", response);
    })();
}
