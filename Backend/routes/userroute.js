import express from 'express';
import {register,login,logout, updateProfile,updateProfileImages} from '../Controllers/user_controller.js'
import isAuthentificated from '../middlewares/middleware.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();

router.route("/register").post(register);
router.route('/login').post(login);
router.route('/profile/update').post(isAuthentificated,updateProfile);
router.route('/profile/update/image').post(isAuthentificated,upload,updateProfileImages);
router.route('/logout').get(logout);

export default router;