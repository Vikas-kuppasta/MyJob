import express  from 'express';
import isAuthentificated from '../middlewares/middleware.js';
import { applyjob, getApplicants, getAppliedJob, getProfileById, updateStatus } from '../Controllers/application.js';

const router = express.Router();

router.route("/apply/:id").get(isAuthentificated,applyjob);
router.route("/get").get(isAuthentificated,getAppliedJob);
router.route("/:id/applicants").get(isAuthentificated,getApplicants);
router.route("/:id/profile").get(isAuthentificated,getProfileById);
router.route("/status/:id/update").post(isAuthentificated,updateStatus);

export default router;