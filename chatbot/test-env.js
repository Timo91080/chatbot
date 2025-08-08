require('dotenv').config();

console.log('🔍 Variables d\'environnement chargées :');
console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? process.env.TELEGRAM_BOT_TOKEN.substring(0, 10) + '...' : 'NON DÉFINI');
console.log('OPENWEATHER_API_KEY:', process.env.OPENWEATHER_API_KEY ? process.env.OPENWEATHER_API_KEY.substring(0, 10) + '...' : 'NON DÉFINI');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) + '...' : 'NON DÉFINI');
console.log('PORT:', process.env.PORT || 'NON DÉFINI');
