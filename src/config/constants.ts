import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'GYMDB';
export const PORT = process.env.PORT || 3003;
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '1h';
export const URL_user_management_service = 'http://user-management-service:3002';
