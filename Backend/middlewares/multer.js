import multer from 'multer';
const storage =multer.memoryStorage();
export const upload = multer({storage}).fields([
    {name:"profile",maxCount:1},
    {name:"banner",maxCount:1},
    {name:"companyLogo",maxCount:1},
    {name:"companyBanner",maxCount:1},
]);