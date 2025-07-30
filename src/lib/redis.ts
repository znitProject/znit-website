import { createClient } from 'redis';

// Redis 클라이언트 생성
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    connectTimeout: 10000,
    lazyConnect: true,
  },
});

// Redis 연결 이벤트 핸들러
redisClient.on('error', (err) => {
  console.error('Redis 연결 오류:', err);
});

redisClient.on('connect', () => {
  console.log('Redis 연결 성공');
});

redisClient.on('ready', () => {
  console.log('Redis 준비 완료');
});

// Redis 클라이언트 연결 함수
export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
}

// Redis 클라이언트 연결 해제 함수
export async function disconnectRedis() {
  if (redisClient.isOpen) {
    await redisClient.disconnect();
  }
}

export default redisClient; 