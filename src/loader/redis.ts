import Redis from "ioredis"  
import { REDIS_URL } from "../const";

export const redisBlackList = new Redis(REDIS_URL)
export const loadRedis=()=>{
redisBlackList.on('connect',()=>{
console.log('Redis client connected')
});
redisBlackList.on('error', (error)=>{
console.log('Redis not connected', error)
})
}