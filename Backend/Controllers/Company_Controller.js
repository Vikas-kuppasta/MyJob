import { Company } from '../models/Company_model.js';
import mongoose from 'mongoose';
import { uploadToCloudinary } from '../utils/helper.js';
import { Job } from './../models/jobmodel.js'
import cloudinary from '../utils/cloudinary.js';
export const registerCompany = async (req, res) => {
    try {
        const { companyname, description, website, location, city, state, foundedYear, industry, email, companySize } = req.body;
        const companyLogo = req.files?.companyLogo?.[0];
        const companyBanner = req.files?.companyBanner?.[0];
        if (!companyname || !description || !location || !state || !industry) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let companyLogoUrl = "";
        let companyBannerUrl = "";

        if (companyLogo) {
            const result = await uploadToCloudinary(companyLogo.buffer, "CompanyLogo-images");
            companyLogoUrl = result.secure_url;
        };
        if (companyBanner) {
            const result = await uploadToCloudinary(companyBanner.buffer, "CompanyBanner-images");
            companyBannerUrl = result.secure_url;
        };

        let company = await Company.findOne({ name: companyname });
        if (company) {
            return res.status(400).json({
                message: "you can't register with same name",
                success: false
            })
        };

        company = await Company.create({
            name: companyname,
            description: description,
            website: website,
            location: location,
            companyProfile: {
                companyLogo: companyLogoUrl,
                companyBanner: companyBannerUrl
            },
            industry: industry,
            state: state,
            foundedYear: foundedYear,
            companySize: companySize,
            email: email,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
};

export const getCompany = async (req, res) => {
    try {

        const userId = req.id;

        const companies = await Company.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            },

            {
                $lookup: {
                    from: "jobs",
                    localField: "_id",
                    foreignField: "company",
                    as: "jobs"
                }
            },

            {
                $addFields: {
                    jobsCount: { $size: "$jobs" }
                }
            },

            {
                $project: {
                    jobs: 0
                }
            }
        ]);

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }


};

export const getCompanyId = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        };

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
};

export const updateCompany = async (req, res) => {
    try {
        const { companyname, description, website, location, city, state, foundedYear, industry, email, companySize } = req.body;
        const companyLogo = req.files?.companyLogo?.[0];
        const companyBanner = req.files?.companyBanner?.[0];
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        };
        let companyLogoUrl = "";
        let companyBannerUrl = "";

        let companyLogoPublicId = company.companyProfile?.companyLogoPublicId;

        if (companyLogo) {

            if (company.companyProfile?.companyLogoPublicId) {
                await cloudinary.uploader.destroy(
                    company.companyProfile.companyLogoPublicId
                );
            }

            const result = await uploadToCloudinary(
                companyLogo.buffer,
                "CompanyLogo-images"
            );

            companyLogoUrl = result.secure_url;
            companyLogoPublicId = result.public_id;
        }
        let companyBannerPublicId = company.companyProfile?.companyBannerPublicId;

        if (companyBanner) {

            if (company.companyProfile?.companyBannerPublicId) {
                await cloudinary.uploader.destroy(
                    company.companyProfile.companyBannerPublicId
                );
            }

            const result = await uploadToCloudinary(
                companyBanner.buffer,
                "CompanyBanner-images"
            );

            companyBannerUrl = result.secure_url;
            companyBannerPublicId = result.public_id;
        }

        const updateData = {
            name: companyname, description, website, location, city, state, foundedYear, industry, email, companySize, companyProfile: {
                companyLogo:
                    companyLogoUrl || company.companyProfile.companyLogo,

                companyLogoPublicId:
                    companyLogoPublicId || company.companyProfile.companyLogoPublicId,

                companyBanner:
                    companyBannerUrl || company.companyProfile.companyBanner,

                companyBannerPublicId:
                    companyBannerPublicId || company.companyProfile.companyBannerPublicId,
            },
        };
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        };

        return res.status(200).json({
            message: "Company information updated",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
};

export const deleteCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companyId = req.params.id;

        if (!userId || !companyId) {
            return res.status(404).json({
                message: "Something went wrong",
                success: false
            });
        };
        const deletedCompany = await Company.findOneAndDelete({
            _id: companyId,
            userId: userId,
        });

        if (!deletedCompany) {
            return res.status(404).json({
                message: "Company not found or unauthorized",
                success: false
            })
        };

        return res.status(200).json({
            message: "Company deleted successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    };
};

export const JobsByCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        if (!companyId) {
            return res.status(400).json({
                message: "Something went wrong",
                success: false,
            })
        };

        const jobs = await Job.find({ company: companyId }).populate("company");
        if (!jobs) {
            return res.status(400).json({
                message: "Something went wrong",
                success: false,
            })
        };

        return res.status(200).json({
            success: true,
            jobs,
        })
    } catch (error) {
        console.log(error);
    };
};