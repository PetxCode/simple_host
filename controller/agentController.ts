import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import agentModel from "../model/agentModel";
import { createAgentAccountEmail } from "../utils/email";
import {
  CLOUDINARY_API,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
  JWT_SECRET,
} from "../utils/constant";
import { v2 as cloudinary } from "cloudinary";

export default cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API,
  api_secret: CLOUDINARY_SECRET,
});

export const createAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const agent = await agentModel.create({
      email,
      password: hashed,
      role: "agent",
    });

    await createAgentAccountEmail(agent);

    return res.status(201).json({
      message: "creating agent",
      data: agent,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating agent",
    });
  }
};

export const verifyAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { agentID } = req.params;

    const agent = await agentModel.findById(agentID);

    if (agent) {
      const agentData = await agentModel.findByIdAndUpdate(
        agentID,
        {
          verify: true,
        },
        { new: true }
      );
      return res.status(201).json({
        message: "agent has been verified",
        data: agentData,
      });
    } else {
      return res.status(404).json({
        message: "Error creating agent",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating agent",
    });
  }
};

export const signinAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const agent = await agentModel.findOne({ email });

    if (agent) {
      const pass = await bcrypt.compare(password, agent.password);
      if (pass) {
        if (agent.verify) {
          const token = jwt.sign({ id: agent._id }, JWT_SECRET, {
            expiresIn: "2d",
          });
          return res.status(201).json({
            message: "welcome back Agent",
            data: token,
          });
        } else {
          return res.status(404).json({
            message: "Please go and verify your account",
          });
        }
      } else {
        return res.status(404).json({
          message: "Error reading agent password",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error reading agent email",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating agent",
    });
  }
};

export const viewSingleAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { agentID } = req.params;

    const agent = await agentModel.findById(agentID);

    return res.status(200).json({
      message: "reading single agent",
      data: agent,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating agent",
    });
  }
};

export const viewAllAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const agent = await agentModel.find();

    return res.status(200).json({
      message: "reading all agent",
      data: agent,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating agent",
    });
  }
};

export const uploadAgentAvatar = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { agentID } = req.params;

    const { secure_url } = await cloudinary.uploader.upload(req.file.path);

    const agent = await agentModel.findByIdAndUpdate(
      agentID,
      {
        avatar: secure_url,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "single agent avatar updated",
      data: agent,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error creating agent",
      data: error.message,
    });
  }
};

export const updatedAgentName = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { agentID } = req.params;

    const { secure_url } = await cloudinary.uploader.upload(req.file.path);

    const agent = await agentModel.findByIdAndUpdate(
      agentID,
      {
        fullName: secure_url,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "single agent avatar updated",
      data: agent,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error creating agent",
      data: error.message,
    });
  }
};
