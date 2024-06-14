import env from "dotenv";
env.config();

export const PORT = parseInt(process.env.PORT!);

export const URL = process.env.MONGODB!;

export const URL_LOCAL = process.env.MONGODB_LOCAL!;

export const GOOGLE_ID = process.env.GOOGLE_ID_KEY!;

export const GOOGLE_SECRET = process.env.GOOGLE_SECRET_KEY!;

export const GOOGLE_REFRESH = process.env.GOOGLE_REFRESH_TOKEN!;

export const GOOGLE_URL = process.env.GOOGLE_REDIRECT!;
export const JWT_SECRET = process.env.JWT_SECRET!;

export const CLOUDINARY_API = process.env.CLOUDINARY_API!;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME!;
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET!;
