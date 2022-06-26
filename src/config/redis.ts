import { createClient } from 'redis';

const redis = createClient({ legacyMode: true });

redis.on('error', err => console.error(err));

export default redis;
