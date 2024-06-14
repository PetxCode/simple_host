import { Router } from "express";
import {
  createAgent,
  signinAgent,
  uploadAgentAvatar,
  verifyAgent,
  viewAllAgent,
  viewSingleAgent,
} from "../controller/agentController";
import { upload } from "../utils/multer";

const router = Router();

router.route("/all-agent").get(viewAllAgent);
router.route("/agent/:agentID").get(viewSingleAgent);
router.route("/verify-agent/:agentID").get(verifyAgent);

router.route("/create-agent").post(createAgent);
router.route("/signin-agent").post(signinAgent);

router.route("/update-agent-avatar/:agentID").patch(upload, uploadAgentAvatar);

export default router;
