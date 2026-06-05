import express from 'express';
import { deleteCompany, getCompany, getCompanyId, JobsByCompany, registerCompany, updateCompany } from '../Controllers/Company_Controller.js';
import { upload } from '../middlewares/multer.js';
import isAuthentificated from '../middlewares/middleware.js';

const router = express.Router();

router.route("/register").post(isAuthentificated,upload,registerCompany);
router.route('/get').get(isAuthentificated,getCompany);
router.route('/getjobsbycompany/:id').get(isAuthentificated,JobsByCompany);
router.route('/get/:id').get(isAuthentificated,getCompanyId);
router.route('/update/:id').put(isAuthentificated,upload,updateCompany);
router.route('/delete/:id').post(isAuthentificated,deleteCompany);

export default router;