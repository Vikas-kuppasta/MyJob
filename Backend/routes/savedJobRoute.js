import express from "express"
import  { getSavedJobs, savejob } from "./../Controllers/savedJob.js"
import isAuthentificated from "../middlewares/middleware.js";
const router = express.Router();
router.route("/save-job/:jobId").post(isAuthentificated,savejob);
router.route("/saved-jobs").get(isAuthentificated,getSavedJobs);

export default router;