import React, { useState } from 'react'
import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle,} from '../ui/dialog'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/constants/constant';
import { setUser } from '@/redux/authslice';
import { toast } from 'sonner';

const UpdateProfile = ({open,setOpen}) => {
    const dispatch = useDispatch();

    const [loading , setloading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const [input,setInput] = useState({
        firstname:user?.firstname,
        email:user?.email,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
    });
    

    const handleInput = (e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    };

    const submitHandler = async(e)=>{
        e.preventDefault();
        
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast("Profile updated successfully")
            }
        } catch (error) {
            console.log(error);
        }
        setOpen(!open);
        
    }
  return (
<>
    <Dialog open={open}>
        <DialogContent onInteractOutside={()=>(setOpen(!open))} >
            <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
                <main className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-semibold' htmlFor="Name">Name:</label>
                        <input name='firstname' onChange={handleInput} value={input.firstname} id='Name' type="text" className='p-1 border-gray-400 border-solid border rounded-md outline-0' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg font-semibold' htmlFor="bio">Bio:</label>
                        <input name='bio' onChange={handleInput} value={input.bio} id='bio' type="text" className='p-1 border-gray-400 border-solid border rounded-md outline-0' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg font-semibold' htmlFor="Email">Email:</label>
                        <input name='email' onChange={handleInput} value={input.email} id='Email' type="email" className='p-1 border-gray-400 border-solid border rounded-md outline-0' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg font-semibold' htmlFor="Skills">Skills:</label>
                        <input name='skills' onChange={handleInput} value={input.skills} id='Skills' type="text" className='p-1 border-gray-400 border-solid border rounded-md outline-0' />
                    </div>
                    <DialogFooter>
                        {
                                  loading?<button className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md flex justify-center items-center '> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</button>: <button type='submit' className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md'>Save Changes</button>
                        }
                    </DialogFooter>
                </main>
            </form>
        </DialogContent>
    </Dialog>
</>
  )
}

export default UpdateProfile