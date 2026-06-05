import express from 'express';
import {postjob,getAlljobs,getjobById,getJobsAdmin, deleteJob, updateJob} from '../Controllers/job_Controller.js';
import isAuthentificated from '../middlewares/middleware.js';
import { upload } from '../middlewares/multer.js';

const router =  express.Router();

router.route("/post").post(isAuthentificated,postjob);
router.route("/get").get(isAuthentificated,getAlljobs);
router.route("/get/:id").get(isAuthentificated,getjobById);
router.route("/getadminjobs").get(isAuthentificated,getJobsAdmin);
router.route("/delete/:id").post(isAuthentificated,deleteJob);
router.route("/update/:id").put(isAuthentificated,updateJob);

export default router;