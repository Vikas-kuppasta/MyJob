import express from 'express';
import {postjob,getAlljobs,getjobById,getJobsAdmin} from '../Controllers/job_Controller.js';
import isAuthentificated from '../middlewares/middleware.js';

const router =  express.Router();

router.route("/post").post(isAuthentificated,postjob);
router.route("/get").get(isAuthentificated,getAlljobs);
router.route("/get/:id").get(isAuthentificated,getjobById);
router.route("/getadminjobs").get(isAuthentificated,getJobsAdmin);

export default router;