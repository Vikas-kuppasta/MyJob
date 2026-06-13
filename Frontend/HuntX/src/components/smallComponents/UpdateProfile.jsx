// import React, { useState } from 'react'
// import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle,} from '../ui/dialog'
// import { Loader2 } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { USER_API_END_POINT } from '@/constants/constant';
// import { setUser } from '@/redux/authslice';
// import { toast } from 'sonner';

// const UpdateProfile = ({open,setOpen}) => {
//     const dispatch = useDispatch();

//     const [loading , setloading] = useState(false);
//     const {user} = useSelector(store=>store.auth);
//     const [input,setInput] = useState({
//         firstname:user?.firstname,
//         email:user?.email,
//         bio:user?.profile?.bio,
//         skills:user?.profile?.skills?.join(", ") || ""
//     });
    

//     const handleInput = (e)=>{
//         setInput({...input,[e.target.name]:e.target.value})
//     };

//     const submitHandler = async(e)=>{
//         e.preventDefault();
        
//         try {
//             const res = await axios.post(`${USER_API_END_POINT}/profile/update`,input,{
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             });
//             if(res.data.success){
//                 dispatch(setUser(res.data.user));
//                 toast("Profile updated successfully")
//             }
//         } catch (error) {
//             console.log(error);
//         }
//         setOpen(!open);
        
//     }
//   return (
// <>
//     <Dialog open={open}>
//         <DialogContent onInteractOutside={()=>(setOpen(!open))} >
//             <DialogHeader>
//                 <DialogTitle>Update Profile</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={submitHandler}>
//                 <main className='flex flex-col gap-3'>
//                     <div className='flex flex-col'>
//                         <label className='text-lg font-semibold' htmlFor="Name">Name:</label>
//                         <input name='firstname' onChange={handleInput} value={input.firstname} id='Name' type="text" className='p-1 border-gray-400 border-solid border rounded-md outline-0' />
//                     </div>
//                     <div className='flex flex-col'>
//                         <label className='text-lg font-semibold' htmlFor="bio">Bio:</label>
//                         <input name='bio' onChange={handleInput} value={input.bio} id='bio' type="text" className='p-1 border-gray-400 border-solid border rounded-md outline-0' />
//                     </div>
//                     <div className='flex flex-col'>
//                         <label className='text-lg font-semibold' htmlFor="Email">Email:</label>
//                         <input name='email' onChange={handleInput} value={input.email} id='Email' type="email" className='p-1 border-gray-400 border-solid border rounded-md outline-0' />
//                     </div>
//                     <div className='flex flex-col'>
//                         <label className='text-lg font-semibold' htmlFor="Skills">Skills:</label>
//                         <input name='skills' onChange={handleInput} value={input.skills} id='Skills' type="text" className='p-1 border-gray-400 border-solid border rounded-md outline-0' />
//                     </div>
//                     <DialogFooter>
//                         {
//                                   loading?<button className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md flex justify-center items-center '> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</button>: <button type='submit' className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md'>Save Changes</button>
//                         }
//                     </DialogFooter>
//                 </main>
//             </form>
//         </DialogContent>
//     </Dialog>
// </>
//   )
// }

// export default UpdateProfile

import React, { useState } from 'react'
import {
    Dialog, DialogContent, DialogFooter,
    DialogHeader, DialogTitle,
} from '../ui/dialog'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/constants/constant'
import { setUser } from '@/redux/authslice'
import { toast } from 'sonner'

const TABS = ['Basic', 'Social', 'Education', 'Experience', 'Projects']

const emptyEducation = { college: '', degree: '', field: '', startYear: '', endYear: '' }
const emptyExperience = { company: '', position: '', startDate: '', endDate: '', description: '' }
const emptyProject = { title: '', description: '', techStack: '', githubLink: '', liveLink: '' }

const UpdateProfile = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('Basic')
    const { user } = useSelector(store => store.auth)

    const [input, setInput] = useState({
        firstname: user?.firstname || '',
        email: user?.email || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        phone: user?.profile?.phone || '',
        location: user?.profile?.location || '',
        github: user?.profile?.github || '',
        linkedin: user?.profile?.linkedin || '',
        portfolio: user?.profile?.portfolio || '',
    })

    const [education, setEducation] = useState(
        user?.profile?.education?.length
            ? user.profile.education.map(e => ({ ...e }))
            : [{ ...emptyEducation }]
    )

    const [experience, setExperience] = useState(
        user?.profile?.experience?.length
            ? user.profile.experience.map(e => ({
                ...e,
                startDate: e.startDate ? e.startDate.slice(0, 10) : '',
                endDate: e.endDate ? e.endDate.slice(0, 10) : '',
            }))
            : [{ ...emptyExperience }]
    )

    const [projects, setProjects] = useState(
        user?.profile?.projects?.length
            ? user.profile.projects.map(p => ({
                ...p,
                techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : '',
            }))
            : [{ ...emptyProject }]
    )

    const [resumeFile, setResumeFile] = useState(null)

    const handleInput = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const handleListChange = (setter, list, index, field, value) => {
        const updated = list.map((item, i) => i === index ? { ...item, [field]: value } : item)
        setter(updated)
    }

    const addItem = (setter, empty) => setter(prev => [...prev, { ...empty }])
    const removeItem = (setter, list, index) => setter(list.filter((_, i) => i !== index))

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()

            Object.entries(input).forEach(([k, v]) => formData.append(k, v))

            if (resumeFile) formData.append('resume', resumeFile)

            formData.append('education', JSON.stringify(education))
            formData.append('experience', JSON.stringify(experience))
            formData.append('projects', JSON.stringify(
                projects.map(p => ({
                    ...p,
                    techStack: p.techStack.split(',').map(s => s.trim()).filter(Boolean),
                }))
            ))

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
            )
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success('Profile updated successfully')
                setOpen(false)
            }
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const inputCls = 'w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-sm'
    const labelCls = 'text-sm font-medium text-gray-700 mb-1 block'
    const fieldCls = 'flex flex-col gap-1'

    return (
        <Dialog open={open}>
            <DialogContent
                className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0"
                onInteractOutside={() => setOpen(false)}
            >
                <DialogHeader className="px-6 pt-6 pb-0">
                    <DialogTitle className="text-xl font-semibold">Update Profile</DialogTitle>
                </DialogHeader>

                {/* Tab Bar */}
                <div className="flex border-b border-gray-200 px-6 mt-4 gap-1 overflow-x-auto">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-md transition-colors
                                ${activeTab === tab
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <form onSubmit={submitHandler}>
                    <div className="px-6 py-5 flex flex-col gap-5">

                        {/* ── BASIC ── */}
                        {activeTab === 'Basic' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className={fieldCls}>
                                        <label className={labelCls}>Full Name</label>
                                        <input name="firstname" value={input.firstname} onChange={handleInput} className={inputCls} placeholder="John Doe" />
                                    </div>
                                    <div className={fieldCls}>
                                        <label className={labelCls}>Email</label>
                                        <input name="email" type="email" value={input.email} onChange={handleInput} className={inputCls} placeholder="john@example.com" />
                                    </div>
                                    <div className={fieldCls}>
                                        <label className={labelCls}>Phone</label>
                                        <input name="phone" value={input.phone} onChange={handleInput} className={inputCls} placeholder="+91 98765 43210" />
                                    </div>
                                    <div className={fieldCls}>
                                        <label className={labelCls}>Location</label>
                                        <input name="location" value={input.location} onChange={handleInput} className={inputCls} placeholder="Mumbai, India" />
                                    </div>
                                </div>

                                <div className={fieldCls}>
                                    <label className={labelCls}>Bio</label>
                                    <textarea name="bio" value={input.bio} onChange={handleInput} rows={3} className={inputCls} placeholder="A short description about yourself..." />
                                </div>

                                <div className={fieldCls}>
                                    <label className={labelCls}>Skills <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                                    <input name="skills" value={input.skills} onChange={handleInput} className={inputCls} placeholder="React, Node.js, MongoDB..." />
                                </div>

                                <div className={fieldCls}>
                                    <label className={labelCls}>Resume <span className="text-gray-400 font-normal">(PDF)</span></label>
                                    <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResumeFile(e.target.files[0])} className="text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-gray-300 file:text-sm file:bg-gray-50 file:cursor-pointer" />
                                    {user?.profile?.resume && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            Current: <a href={user.profile.resume} target="_blank" rel="noreferrer" className="text-blue-500 underline">{user.profile.resumeOriginalname || 'View resume'}</a>
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* ── SOCIAL ── */}
                        {activeTab === 'Social' && (
                            <div className="flex flex-col gap-4">
                                <div className={fieldCls}>
                                    <label className={labelCls}>GitHub URL</label>
                                    <input name="github" value={input.github} onChange={handleInput} className={inputCls} placeholder="https://github.com/username" />
                                </div>
                                <div className={fieldCls}>
                                    <label className={labelCls}>LinkedIn URL</label>
                                    <input name="linkedin" value={input.linkedin} onChange={handleInput} className={inputCls} placeholder="https://linkedin.com/in/username" />
                                </div>
                                <div className={fieldCls}>
                                    <label className={labelCls}>Portfolio URL</label>
                                    <input name="portfolio" value={input.portfolio} onChange={handleInput} className={inputCls} placeholder="https://yourportfolio.com" />
                                </div>
                            </div>
                        )}

                        {/* ── EDUCATION ── */}
                        {activeTab === 'Education' && (
                            <div className="flex flex-col gap-5">
                                {education.map((edu, i) => (
                                    <div key={i} className="border border-gray-200 rounded-lg p-4 relative flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">Education #{i + 1}</span>
                                            {education.length > 1 && (
                                                <button type="button" onClick={() => removeItem(setEducation, education, i)} className="text-red-400 hover:text-red-600">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className={`${fieldCls} col-span-2`}>
                                                <label className={labelCls}>College / University</label>
                                                <input value={edu.college} onChange={e => handleListChange(setEducation, education, i, 'college', e.target.value)} className={inputCls} placeholder="MIT" />
                                            </div>
                                            <div className={fieldCls}>
                                                <label className={labelCls}>Degree</label>
                                                <input value={edu.degree} onChange={e => handleListChange(setEducation, education, i, 'degree', e.target.value)} className={inputCls} placeholder="B.Tech" />
                                            </div>
                                            <div className={fieldCls}>
                                                <label className={labelCls}>Field of Study</label>
                                                <input value={edu.field} onChange={e => handleListChange(setEducation, education, i, 'field', e.target.value)} className={inputCls} placeholder="Computer Science" />
                                            </div>
                                            <div className={fieldCls}>
                                                <label className={labelCls}>Start Year</label>
                                                <input type="number" value={edu.startYear} onChange={e => handleListChange(setEducation, education, i, 'startYear', e.target.value)} className={inputCls} placeholder="2020" min="1950" max="2030" />
                                            </div>
                                            <div className={fieldCls}>
                                                <label className={labelCls}>End Year</label>
                                                <input type="number" value={edu.endYear} onChange={e => handleListChange(setEducation, education, i, 'endYear', e.target.value)} className={inputCls} placeholder="2024" min="1950" max="2030" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addItem(setEducation, emptyEducation)} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium self-start">
                                    <Plus size={16} /> Add Education
                                </button>
                            </div>
                        )}

                        {/* ── EXPERIENCE ── */}
                        {activeTab === 'Experience' && (
                            <div className="flex flex-col gap-5">
                                {experience.map((exp, i) => (
                                    <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">Experience #{i + 1}</span>
                                            {experience.length > 1 && (
                                                <button type="button" onClick={() => removeItem(setExperience, experience, i)} className="text-red-400 hover:text-red-600">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className={fieldCls}>
                                                <label className={labelCls}>Company</label>
                                                <input value={exp.company} onChange={e => handleListChange(setExperience, experience, i, 'company', e.target.value)} className={inputCls} placeholder="Google" />
                                            </div>
                                            <div className={fieldCls}>
                                                <label className={labelCls}>Position</label>
                                                <input value={exp.position} onChange={e => handleListChange(setExperience, experience, i, 'position', e.target.value)} className={inputCls} placeholder="Software Engineer" />
                                            </div>
                                            <div className={fieldCls}>
                                                <label className={labelCls}>Start Date</label>
                                                <input type="date" value={exp.startDate} onChange={e => handleListChange(setExperience, experience, i, 'startDate', e.target.value)} className={inputCls} />
                                            </div>
                                            <div className={fieldCls}>
                                                <label className={labelCls}>End Date <span className="text-gray-400 font-normal">(leave blank if current)</span></label>
                                                <input type="date" value={exp.endDate} onChange={e => handleListChange(setExperience, experience, i, 'endDate', e.target.value)} className={inputCls} />
                                            </div>
                                            <div className={`${fieldCls} col-span-2`}>
                                                <label className={labelCls}>Description</label>
                                                <textarea rows={3} value={exp.description} onChange={e => handleListChange(setExperience, experience, i, 'description', e.target.value)} className={inputCls} placeholder="Describe your role and achievements..." />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addItem(setExperience, emptyExperience)} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium self-start">
                                    <Plus size={16} /> Add Experience
                                </button>
                            </div>
                        )}

                        {/* ── PROJECTS ── */}
                        {activeTab === 'Projects' && (
                            <div className="flex flex-col gap-5">
                                {projects.map((proj, i) => (
                                    <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">Project #{i + 1}</span>
                                            {projects.length > 1 && (
                                                <button type="button" onClick={() => removeItem(setProjects, projects, i)} className="text-red-400 hover:text-red-600">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className={fieldCls}>
                                                <label className={labelCls}>Project Title</label>
                                                <input value={proj.title} onChange={e => handleListChange(setProjects, projects, i, 'title', e.target.value)} className={inputCls} placeholder="Job Portal App" />
                                            </div>
                                            <div className={fieldCls}>
                                                <label className={labelCls}>Description</label>
                                                <textarea rows={3} value={proj.description} onChange={e => handleListChange(setProjects, projects, i, 'description', e.target.value)} className={inputCls} placeholder="What does this project do?" />
                                            </div>
                                            <div className={fieldCls}>
                                                <label className={labelCls}>Tech Stack <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                                                <input value={proj.techStack} onChange={e => handleListChange(setProjects, projects, i, 'techStack', e.target.value)} className={inputCls} placeholder="React, Node.js, MongoDB" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className={fieldCls}>
                                                    <label className={labelCls}>GitHub Link</label>
                                                    <input value={proj.githubLink} onChange={e => handleListChange(setProjects, projects, i, 'githubLink', e.target.value)} className={inputCls} placeholder="https://github.com/..." />
                                                </div>
                                                <div className={fieldCls}>
                                                    <label className={labelCls}>Live Link</label>
                                                    <input value={proj.liveLink} onChange={e => handleListChange(setProjects, projects, i, 'liveLink', e.target.value)} className={inputCls} placeholder="https://myproject.com" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addItem(setProjects, emptyProject)} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium self-start">
                                    <Plus size={16} /> Add Project
                                </button>
                            </div>
                        )}

                    </div>

                    <DialogFooter className="px-6 pb-6">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-6 py-2 cursor-pointer text-white text-sm rounded-md flex items-center gap-2"
                        >
                            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfile