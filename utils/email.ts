import { google } from "googleapis";
import nodemailer from "nodemailer";
import {
  GOOGLE_ID,
  GOOGLE_REFRESH,
  GOOGLE_SECRET,
  GOOGLE_URL,
} from "./constant";
import { iAgentData } from "./types";

const MY_GOOGLE_ID = GOOGLE_ID;
const MY_GOOGLE_SECRET = GOOGLE_SECRET;
const MY_GOOGLE_URL = GOOGLE_URL;
const MY_GOOGLE_TOKEN = GOOGLE_REFRESH;

const oAuth = new google.auth.OAuth2(
  MY_GOOGLE_ID,
  MY_GOOGLE_SECRET,
  MY_GOOGLE_URL
);

oAuth.setCredentials({ refresh_token: MY_GOOGLE_TOKEN });

export const createAgentAccountEmail = async (agent: iAgentData) => {
  try {
    const token: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
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

    const url: string = `http://localhost:5577/api/v1/verify-agent/${agent._id}`;

    const mailer = {
      to: agent?.email,
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
  } catch (error) {
    console.error(error);
  }
};
