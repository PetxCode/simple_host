import { Document } from "mongoose";
import { HTTP } from "./enums";

export interface iAgent {
  fullName: string;
  email: string;
  password: string;
  compnayName: string;
  verify: boolean;
  phone: string;
  role: string;
  companyAddress: string;
  accountNumber: string;
  avatar: string;
  service: Array<{}>;
  images: Array<{}>;
}

export interface iAgentData extends iAgent, Document {}

export interface iError {
  name: string;
  message: string;
  status: HTTP;
  success: boolean;
}
