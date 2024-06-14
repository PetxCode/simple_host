"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const agentRouter_1 = __importDefault(require("./router/agentRouter"));
const mainError_1 = require("./error/mainError");
const enums_1 = require("./utils/enums");
const errorHandler_1 = require("./error/errorHandler");
const mainApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    //   Agent routes
    app.use("/api/v1", agentRouter_1.default);
    //   default API route
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Welcome to Cleaning API server",
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "Error loading",
            });
        }
    });
    app.all("*", (req, res, next) => {
        next(new mainError_1.mainError({
            name: "Route Error",
            message: `This: "${req.originalUrl}" is not a valid route`,
            status: enums_1.HTTP.BAD_RESPONSE,
            success: false,
        }));
    });
    app.use(errorHandler_1.errorHandler);
});
exports.mainApp = mainApp;
