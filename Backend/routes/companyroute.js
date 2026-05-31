import express from 'express';
import { getCompany, getCompanyId, registerCompany, updateCompany } from '../Controllers/Company_Controller.js';
import { upload } from '../middlewares/multer.js';
import isAuthentificated from '../middlewares/middleware.js';

const router = express.Router();

router.route("/register").post(isAuthentificated,upload,registerCompany);
router.route('/get').get(isAuthentificated,getCompany);
router.route('/get/:id').get(isAuthentificated,getCompanyId);
router.route('/update/:id').put(isAuthentificated,updateCompany);

export default router;