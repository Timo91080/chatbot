require('dotenv').config();
const OpenAI = require('openai');
const axios = require('axios');

// Configuration OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

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

// Fonction outil pour l'agent IA
const weatherTool = {
    type: "function",
    function: {
        name: "get_weather",
        description: "Obtient les informations météorologiques actuelles pour une ville donnée",
        parameters: {
            type: "object",
            properties: {
                city: {
                    type: "string",
                    description: "Le nom de la ville pour laquelle obtenir la météo"
                }
            },
            required: ["city"]
        }
    }
};

// Agent IA principal
async function aiWeatherAgent(userInput) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `Tu es un assistant météo intelligent. Tu peux répondre aux questions sur la météo en utilisant l'outil get_weather.
                    
Réponds de manière naturelle et conversationnelle. Si l'utilisateur demande la météo, utilise l'outil pour obtenir les informations puis réponds de façon claire et amicale.

Exemples de réponses :
- "Il fait 25°C à Paris avec un ciel dégagé"
- "À Lyon, la température est de 18°C avec de la pluie"
- "Il fait actuellement 22°C à Marseille avec quelques nuages"`
                },
                {
                    role: "user",
                    content: userInput
                }
            ],
            tools: [weatherTool],
            tool_choice: "auto"
        });

        const message = completion.choices[0].message;

        // Si l'IA veut utiliser un outil
        if (message.tool_calls) {
            const toolCall = message.tool_calls[0];
            
            if (toolCall.function.name === "get_weather") {
                const args = JSON.parse(toolCall.function.arguments);
                const weatherData = await getWeather(args.city);
                
                // Deuxième appel pour générer la réponse finale
                const finalCompletion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "Tu es un assistant météo. Réponds de manière naturelle et conversationnelle aux questions météo."
                        },
                        {
                            role: "user",
                            content: userInput
                        },
                        {
                            role: "assistant",
                            content: null,
                            tool_calls: [toolCall]
                        },
                        {
                            role: "tool",
                            tool_call_id: toolCall.id,
                            content: JSON.stringify({
                                city: weatherData.name,
                                temperature: Math.round(weatherData.main.temp),
                                description: weatherData.weather[0].description,
                                humidity: weatherData.main.humidity,
                                windSpeed: weatherData.wind.speed
                            })
                        }
                    ]
                });

                return finalCompletion.choices[0].message.content;
            }
        }

        // Si pas d'outil nécessaire, retourner la réponse directe
        return message.content;

    } catch (error) {
        console.error('Erreur Agent IA:', error);
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
