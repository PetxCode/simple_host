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
exports.createAgentAccountEmail = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const constant_1 = require("./constant");
const MY_GOOGLE_ID = constant_1.GOOGLE_ID;
const MY_GOOGLE_SECRET = constant_1.GOOGLE_SECRET;
const MY_GOOGLE_URL = constant_1.GOOGLE_URL;
const MY_GOOGLE_TOKEN = constant_1.GOOGLE_REFRESH;
const oAuth = new googleapis_1.google.auth.OAuth2(MY_GOOGLE_ID, MY_GOOGLE_SECRET, MY_GOOGLE_URL);
oAuth.setCredentials({ refresh_token: MY_GOOGLE_TOKEN });
const createAgentAccountEmail = (agent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "codelabbest@gmail.com",
                clientId: MY_GOOGLE_ID,
                clientSecret: MY_GOOGLE_SECRET,
                refreshToken: MY_GOOGLE_TOKEN,
                accessToken: token,
            },
        });
        const url = `http://localhost:5577/api/v1/verify-agent/${agent._id}`;
        const mailer = {
            to: agent === null || agent === void 0 ? void 0 : agent.email,
            from: "codelabbest@gmail.com",
            subject: "Say Hi",
            html: `<p>
       <br/>
      This is just a simple sign up form!
      <br/>
      <br/>
      <br/>
      <a href=${url}>Verify your Account</a>

      </p>`,
        };
        transport.sendMail(mailer).then(() => {
            console.log("mail sent successfully");
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createAgentAccountEmail = createAgentAccountEmail;
