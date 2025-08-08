// Test standalone de l'agent IA
require('dotenv').config();
const { aiWeatherAgent } = require('./ai-agent');

async function testAgent() {
    const questions = [
        "Il fait combien à Marseille ?",
        "Quel temps fait-il à Paris ?",
        "Est-ce qu'il pleut à Lyon ?",
        "Comment est la météo à Tokyo aujourd'hui ?"
    ];

    console.log("🧪 Test de l'Agent IA Météo\n");

    for (const question of questions) {
        console.log(`❓ Question: ${question}`);
        try {
            const response = await aiWeatherAgent(question);
            console.log(`🤖 Réponse: ${response}\n`);
        } catch (error) {
            console.log(`❌ Erreur: ${error.message}\n`);
        }
    }
}

// Exécuter les tests
if (require.main === module) {
    testAgent();
}
