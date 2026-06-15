import React from 'react'
import { LuPencil } from "react-icons/lu";
import banner from '../../public/banner.jpg'
import { useRef } from 'react';
import defaultLogo from "../../public/Defaultuserlogo.png"
import { useState } from 'react';
import AppliedJobTable from '@/components/smallComponents/AppliedJobTable';
import { MdEmail } from "react-icons/md";
import { FiPhone, FiMapPin, FiGithub, FiLinkedin, FiGlobe, FiFileText } from "react-icons/fi";
import { Badge } from '@/components/ui/badge';
import UpdateProfile from '@/components/smallComponents/UpdateProfile';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/constants/constant';
import { setUser } from '@/redux/authslice';
import { toast } from 'sonner';
import axios from 'axios';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import MobAppliedJobs from '../components/sharedComponents/MobAppliedBar'


const profile = () => {
  useGetAppliedJobs();
  const { appliedJobs } = useSelector(store => store.application);
  const [open, setOpen] = useState(false);
  const fileref = useRef(null);
  const userLogo = useRef(null);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    profile: user?.profile?.profilePhoto || "",
    banner: user?.profile?.profileBanner || "",
  });

  const image = input.banner || banner;
  const Logoimage = input.profile || defaultLogo;

  const handleImageChange = async (e) => {
    const name = e.target.name;
    const file = e.target.files?.[0];
    setInput({ ...input, [name]: file });
    try {
      const formData = new FormData();
      formData.append(name, file);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast("Profile updated successfully")
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className='min-h-screen bg-gray-50 flex flex-col max-w-3xl mx-auto gap-4 px-3 sm:px-4 py-6 rounded-md'>

        {/* ── Profile Card ── */}
        <div className='w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden'>

          {/* Banner */}
          <div className='relative h-32 sm:h-44'>
            <img className='w-full h-full object-cover' src={image} alt="Profile banner" />
            {/* banner edit */}
            <button
              onClick={() => fileref.current.click()}
              className='absolute top-2 right-2 bg-white/90 hover:bg-white cursor-pointer w-8 h-8 sm:w-9 sm:h-9 flex justify-center items-center rounded-full shadow transition-colors'
              title="Edit banner"
            >
              <LuPencil className='w-4 h-4 text-blue-500' />
            </button>
            <input type="file" name='banner' onChange={handleImageChange} accept="image/*" ref={fileref} className='hidden' />

            {/* Avatar */}
            <div className='group absolute -bottom-10 sm:-bottom-12 left-4 sm:left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-blue-100'>
              <img src={Logoimage} className='w-full h-full object-cover' alt="Profile photo" />
              <button
                onClick={() => userLogo.current.click()}
                className='absolute inset-0 bg-black/30 hidden group-hover:flex justify-center items-center rounded-full cursor-pointer transition-all'
                title="Edit photo"
              >
                <LuPencil className='w-4 h-4 text-white' />
              </button>
              <input type="file" name='profile' onChange={handleImageChange} accept="image/*" ref={userLogo} className='hidden' />
            </div>
          </div>

          {/* Name row — offset for avatar */}
          <div className='pt-12 sm:pt-14 px-4 sm:px-6 pb-4 sm:pb-5'>
            <div className='flex items-start justify-between gap-2'>
              <div>
                <h1 className='text-lg sm:text-xl font-bold text-gray-900 leading-tight'>{user?.firstname}</h1>
                {user?.profile?.bio && (
                  <p className='text-sm text-gray-500 mt-0.5 max-w-md'>{user.profile.bio}</p>
                )}
                <div className='flex items-center gap-1.5 mt-1.5 text-gray-500'>
                  <MdEmail className='w-4 h-4 text-blue-500 shrink-0' />
                  <span className='text-xs sm:text-sm break-all'>{user?.email}</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(!open)}
                className='shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 text-gray-600 hover:text-blue-600 text-xs font-medium transition-colors cursor-pointer'
              >
                <LuPencil className='w-3.5 h-3.5' />
                <span className='hidden sm:inline'>Edit</span>
              </button>
            </div>

            {/* Divider */}
            <div className='border-t border-gray-100 my-4' />

            {/* Info grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4'>

              {/* Skills */}
              {user?.profile?.skills?.length > 0 && (
                <div className='sm:col-span-2'>
                  <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'>Skills</h3>
                  <div className='flex flex-wrap gap-1.5'>
                    {user.profile.skills.map((item, index) => (
                      <Badge key={index} className="bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              <div>
                <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'>Contact</h3>
                <div className='flex flex-col gap-1.5'>
                  {user?.profile?.phone && (
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <FiPhone className='w-3.5 h-3.5 text-gray-400 shrink-0' />
                      <span>{user.profile.phone}</span>
                    </div>
                  )}
                  {user?.profile?.location && (
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <FiMapPin className='w-3.5 h-3.5 text-gray-400 shrink-0' />
                      <span>{user.profile.location}</span>
                    </div>
                  )}
                  {!user?.profile?.phone && !user?.profile?.location && (
                    <span className='text-sm text-gray-400'>No contact info added</span>
                  )}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'>Links</h3>
                <div className='flex flex-col gap-1.5'>
                  {user?.profile?.resume && (
                    <a href={user.profile.resume} target="_blank" rel="noreferrer" className='flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'>
                      <FiFileText className='w-3.5 h-3.5 shrink-0' />
                      <span className='truncate'>{user.profile.resumeOriginalname || "View Resume"}</span>
                    </a>
                  )}
                  {user?.profile?.github && (
                    <a href={user.profile.github} target="_blank" rel="noreferrer" className='flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'>
                      <FiGithub className='w-3.5 h-3.5 shrink-0' />
                      <span>GitHub</span>
                    </a>
                  )}
                  {user?.profile?.linkedin && (
                    <a href={user.profile.linkedin} target="_blank" rel="noreferrer" className='flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'>
                      <FiLinkedin className='w-3.5 h-3.5 shrink-0' />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {user?.profile?.portfolio && (
                    <a href={user.profile.portfolio} target="_blank" rel="noreferrer" className='flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 hover:underline'>
                      <FiGlobe className='w-3.5 h-3.5 shrink-0' />
                      <span>Portfolio</span>
                    </a>
                  )}
                  {!user?.profile?.resume && !user?.profile?.github && !user?.profile?.linkedin && !user?.profile?.portfolio && (
                    <span className='text-sm text-gray-400'>No links added</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Education ── */}
        {user?.profile?.education?.length > 0 && (
          <div className='w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5'>
            <h2 className='text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3'>Education</h2>
            <div className='flex flex-col divide-y divide-gray-100'>
              {user.profile.education.map((edu, index) => (
                <div key={index} className='py-3 first:pt-0 last:pb-0'>
                  <h3 className='font-semibold text-gray-900 text-sm sm:text-base'>{edu.degree}</h3>
                  <p className='text-sm text-gray-700 mt-0.5'>{edu.college}</p>
                  <p className='text-sm text-gray-500'>{edu.field}</p>
                  <p className='text-xs text-gray-400 mt-1'>{edu.startYear} – {edu.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Experience ── */}
        {user?.profile?.experience?.length > 0 && (
          <div className='w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5'>
            <h2 className='text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3'>Experience</h2>
            <div className='flex flex-col divide-y divide-gray-100'>
              {user.profile.experience.map((exp, index) => (
                <div key={index} className='py-3 first:pt-0 last:pb-0'>
                  <h3 className='font-semibold text-gray-900 text-sm sm:text-base'>{exp.position}</h3>
                  <p className='text-sm text-gray-700 mt-0.5'>{exp.company}</p>
                  <p className='text-xs text-gray-400 mt-1'>
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {" – "}
                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Present"}
                  </p>
                  {exp.description && <p className='text-sm text-gray-600 mt-2 leading-relaxed'>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Projects ── */}
        {user?.profile?.projects?.length > 0 && (
          <div className='w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5'>
            <h2 className='text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3'>Projects</h2>
            <div className='flex flex-col divide-y divide-gray-100'>
              {user.profile.projects.map((project, index) => (
                <div key={index} className='py-3 first:pt-0 last:pb-0'>
                  <h3 className='font-semibold text-gray-900 text-sm sm:text-base'>{project.title}</h3>
                  {project.description && <p className='text-sm text-gray-600 mt-1 leading-relaxed'>{project.description}</p>}
                  {project.techStack?.length > 0 && (
                    <div className='flex flex-wrap gap-1.5 mt-2'>
                      {project.techStack.map((tech, i) => (
                        <Badge key={i} className="bg-gray-100 text-gray-600 border-gray-200 text-xs font-medium px-2 py-0.5 rounded-full">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className='flex gap-4 mt-2'>
                    {project.githubLink && (
                      <a href={project.githubLink} target='_blank' rel='noreferrer' className='flex items-center gap-1 text-xs text-blue-500 hover:underline'>
                        <FiGithub className='w-3 h-3' /> GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target='_blank' rel='noreferrer' className='flex items-center gap-1 text-xs text-green-600 hover:underline'>
                        <FiGlobe className='w-3 h-3' /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <MobAppliedJobs appliedJobs={appliedJobs} />
        <UpdateProfile open={open} setOpen={setOpen} />
      </div>
    </>
  )
}

export default profile