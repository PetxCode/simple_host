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
exports.updatedAgentName = exports.uploadAgentAvatar = exports.viewAllAgent = exports.viewSingleAgent = exports.signinAgent = exports.verifyAgent = exports.createAgent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const agentModel_1 = __importDefault(require("../model/agentModel"));
const email_1 = require("../utils/email");
const constant_1 = require("../utils/constant");
const cloudinary_1 = require("cloudinary");
exports.default = cloudinary_1.v2.config({
    cloud_name: constant_1.CLOUDINARY_NAME,
    api_key: constant_1.CLOUDINARY_API,
    api_secret: constant_1.CLOUDINARY_SECRET,
});
const createAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const agent = yield agentModel_1.default.create({
            email,
            password: hashed,
            role: "agent",
        });
        yield (0, email_1.createAgentAccountEmail)(agent);
        return res.status(201).json({
            message: "creating agent",
            data: agent,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating agent",
        });
    }
});
exports.createAgent = createAgent;
const verifyAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { agentID } = req.params;
        const agent = yield agentModel_1.default.findById(agentID);
        if (agent) {
            const agentData = yield agentModel_1.default.findByIdAndUpdate(agentID, {
                verify: true,
            }, { new: true });
            return res.status(201).json({
                message: "agent has been verified",
                data: agentData,
            });
        }
        else {
            return res.status(404).json({
                message: "Error creating agent",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating agent",
        });
    }
});
exports.verifyAgent = verifyAgent;
const signinAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const agent = yield agentModel_1.default.findOne({ email });
        if (agent) {
            const pass = yield bcrypt_1.default.compare(password, agent.password);
            if (pass) {
                if (agent.verify) {
                    const token = jsonwebtoken_1.default.sign({ id: agent._id }, constant_1.JWT_SECRET, {
                        expiresIn: "2d",
                    });
                    return res.status(201).json({
                        message: "welcome back Agent",
                        data: token,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "Please go and verify your account",
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Error reading agent password",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error reading agent email",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating agent",
        });
    }
});
exports.signinAgent = signinAgent;
const viewSingleAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { agentID } = req.params;
        const agent = yield agentModel_1.default.findById(agentID);
        return res.status(200).json({
            message: "reading single agent",
            data: agent,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating agent",
        });
    }
});
exports.viewSingleAgent = viewSingleAgent;
const viewAllAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agent = yield agentModel_1.default.find();
        return res.status(200).json({
            message: "reading all agent",
            data: agent,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating agent",
        });
    }
});
exports.viewAllAgent = viewAllAgent;
const uploadAgentAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { agentID } = req.params;
        const { secure_url } = yield cloudinary_1.v2.uploader.upload(req.file.path);
        const agent = yield agentModel_1.default.findByIdAndUpdate(agentID, {
            avatar: secure_url,
        }, { new: true });
        return res.status(200).json({
            message: "single agent avatar updated",
            data: agent,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating agent",
            data: error.message,
        });
    }
});
exports.uploadAgentAvatar = uploadAgentAvatar;
const updatedAgentName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { agentID } = req.params;
        const { secure_url } = yield cloudinary_1.v2.uploader.upload(req.file.path);
        const agent = yield agentModel_1.default.findByIdAndUpdate(agentID, {
            fullName: secure_url,
        }, { new: true });
        return res.status(200).json({
            message: "single agent avatar updated",
            data: agent,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating agent",
            data: error.message,
        });
    }
});
exports.updatedAgentName = updatedAgentName;
