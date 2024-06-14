"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const agentModel = new mongoose_1.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    compnayName: {
        type: String,
    },
    companyAddress: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
    },
    avatar: {
        type: String,
    },
    service: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "services",
        },
    ],
    images: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "images",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("agents", agentModel);
