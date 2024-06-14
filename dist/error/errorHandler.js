"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const enums_1 = require("../utils/enums");
const handerBuilder = (err, res) => {
    return res.status(enums_1.HTTP.BAD_RESPONSE).json({
        name: err.name,
        message: err.message,
        status: err.status,
        success: err.success,
    });
};
const errorHandler = (err, req, res, next) => {
    return handerBuilder(err, res);
};
exports.errorHandler = errorHandler;
