"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_SECRET = exports.CLOUDINARY_NAME = exports.CLOUDINARY_API = exports.JWT_SECRET = exports.GOOGLE_URL = exports.GOOGLE_REFRESH = exports.GOOGLE_SECRET = exports.GOOGLE_ID = exports.URL_LOCAL = exports.URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = parseInt(process.env.PORT);
exports.URL = process.env.MONGODB;
exports.URL_LOCAL = process.env.MONGODB_LOCAL;
exports.GOOGLE_ID = process.env.GOOGLE_ID_KEY;
exports.GOOGLE_SECRET = process.env.GOOGLE_SECRET_KEY;
exports.GOOGLE_REFRESH = process.env.GOOGLE_REFRESH_TOKEN;
exports.GOOGLE_URL = process.env.GOOGLE_REDIRECT;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.CLOUDINARY_API = process.env.CLOUDINARY_API;
exports.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
exports.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
