import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uploadToCloudinary } from '../utils/helper.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
    try {
        const { firstname, email, password, role } = req.body;
        if (!firstname || !email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "user already exist",
                success: false,
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        await User.create({
            firstname,
            email,
            password: hashedpassword,
            role,
        })

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        return res.json({ message: error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "something missing",
                success: false,
            })
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "incorrect email or password ",
                success: false,
            })
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "password incorrect ",
                success: false,
            })
        };

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with this role ",
                success: false,
            })
        };

        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true }).json({
            message: `Welcome back ${user.firstname}`,
            user: {
                _id: user._id,
                firstname: user.firstname,
                email: user.email,
                role: user.role,
                profile: user.profile

            },
            success: true
        })
    } catch (error) {
        console.log('Error: ' + error);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {
            firstname,
            email,
            bio,
            skills,
            phone,
            location,
            github,
            linkedin,
            portfolio,
            education,
            experience,
            projects,
        } = req.body;

        const userId = req.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // ── Top-level fields ──
        if (firstname) user.firstname = firstname;
        if (email) user.email = email;

        // ── Ensure profile object exists ──
        if (!user.profile) user.profile = {};

        // ── Basic profile fields ──
        if (bio !== undefined) user.profile.bio = bio;
        if (phone !== undefined) user.profile.phone = phone;
        if (location !== undefined) user.profile.location = location;

        // ── Skills (comma-separated string → array) ──
        if (skills !== undefined) {
            user.profile.skills = skills
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
        }

        // ── Social links ──
        if (github !== undefined) user.profile.github = github;
        if (linkedin !== undefined) user.profile.linkedin = linkedin;
        if (portfolio !== undefined) user.profile.portfolio = portfolio;

        // ── Resume (file upload via multer/cloudinary) ──
        const resume = req.files?.resume?.[0];

        if (resume) {
            if (user.profile.resumePublicId) {
                await cloudinary.uploader.destroy(
                    user.profile.resumePublicId,
                    { resource_type: "raw" }
                );
            }

            const result = await uploadToCloudinary(
                resume.buffer,
                "Resumes",
                { resource_type: "raw" }
            );

            user.profile.resume = result.secure_url;
            user.profile.resumePublicId = result.public_id;
            user.profile.resumeOriginalname = resume.originalname;
        }

        // ── Nested arrays (sent as JSON strings from FormData) ──
        if (education) {
            const parsed = typeof education === 'string' ? JSON.parse(education) : education;
            user.profile.education = parsed.map(e => ({
                college: e.college || '',
                degree: e.degree || '',
                field: e.field || '',
                startYear: e.startYear ? Number(e.startYear) : undefined,
                endYear: e.endYear ? Number(e.endYear) : undefined,
            }));
        }

        if (experience) {
            const parsed = typeof experience === 'string' ? JSON.parse(experience) : experience;
            user.profile.experience = parsed.map(e => ({
                company: e.company || '',
                position: e.position || '',
                startDate: e.startDate ? new Date(e.startDate) : undefined,
                endDate: e.endDate ? new Date(e.endDate) : undefined,
                description: e.description || '',
            }));
        }

        if (projects) {
            const parsed = typeof projects === 'string' ? JSON.parse(projects) : projects;
            user.profile.projects = parsed.map(p => ({
                title: p.title || '',
                description: p.description || '',
                techStack: Array.isArray(p.techStack) ? p.techStack : [],
                githubLink: p.githubLink || '',
                liveLink: p.liveLink || '',
            }));
        }

        await user.save();

        return res.status(200).json({
            message: "Profile successfully updated",
            user: {
                _id: user._id,
                firstname: user.firstname,
                email: user.email,
                role: user.role,
                profile: user.profile,
            },
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
export const updateProfileImages = async (req, res) => {
    try {
        const userId = req.id;
        const profile = req.files?.profile?.[0];
        const banner = req.files?.banner?.[0];

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        let profileUrl = "";
        let bannerUrl = "";

        if (profile) {

            if (user.profile.profilePhotoPublicId) {
                await cloudinary.uploader.destroy(
                    user.profile.profilePhotoPublicId
                );
            }

            const result = await uploadToCloudinary(
                profile.buffer,
                "Profile-images"
            );

            profileUrl = result.secure_url;
            user.profile.profilePhotoPublicId = result.public_id;
        }

        if (banner) {

            if (user.profile.profileBannerPublicId) {
                await cloudinary.uploader.destroy(
                    user.profile.profileBannerPublicId
                );
            }

            const result = await uploadToCloudinary(
                banner.buffer,
                "Banner-images"
            );

            bannerUrl = result.secure_url;
            user.profile.profileBannerPublicId = result.public_id;
        }

        if (profileUrl) {
            user.profile.profilePhoto = profileUrl;
        }
        if (bannerUrl) {
            user.profile.profileBanner = bannerUrl;
        }

        await user.save();

        res.status(200).json({
            message: "Image updated successfully",
            user,
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}
