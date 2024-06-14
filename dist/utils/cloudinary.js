"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const constant_1 = require("./constant");
cloudinary_1.v2.config({
    cloud_name: constant_1.CLOUDINARY_NAME,
    api_key: constant_1.CLOUDINARY_API,
    api_secret: constant_1.CLOUDINARY_SECRET,
});
exports.default = cloudinary_1.v2;
