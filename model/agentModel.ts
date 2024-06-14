import { Schema, Types, model } from "mongoose";
import { iAgentData } from "../utils/types";

const agentModel = new Schema<iAgentData>(
  {
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
        type: Types.ObjectId,
        ref: "services",
      },
    ],
    images: [
      {
        type: Types.ObjectId,
        ref: "images",
      },
    ],
  },
  { timestamps: true }
);

export default model("agents", agentModel);
