const { createClient } = require('redis');

const redisClient = createClient();

redisClient.on('connect', () => {
  console.log('🔌 Redis client connected');
});

redisClient.on('error', (err) => {
  console.error(' Redis connection error:', err);
});

redisClient.connect().catch(console.error);

module.exports = redisClient;

