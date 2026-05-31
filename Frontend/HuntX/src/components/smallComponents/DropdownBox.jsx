import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useDispatch, useSelector } from 'react-redux'
import { IoPersonSharp } from 'react-icons/io5'
import { TbLogout } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setUser } from '@/redux/authslice'
import axios from 'axios'
import { USER_API_END_POINT } from '@/constants/constant'


const DropdownBox = () => {
    const {user} = useSelector(store=>store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOutHandler = async()=>{
            try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
            if(res.data.success){
                dispatch(setUser(null));
                navigate('');
                toast.success(res.data.message);
            }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message);
                
            }
        }
  return (
    <>
    <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
             <div className='w-10 h-10 overflow-hidden cursor-pointer rounded-full'>
          {
            user?.profile?.profilePhoto ? (
              <img
                src={user.profile.profilePhoto}
                className='w-full h-full object-cover'
                alt=""
              />
            ) : (
              <IoPersonSharp className='text-gray-200 w-full h-full' />
            )
          }
        </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-3 mt-4">
            <DropdownMenuGroup>
                <DropdownMenuLabel>
                    <div className='flex gap-3 items-center'>
                                                <div  className='w-10 h-10 overflow-hidden cursor-pointer rounded-full '>
                                                {
                                                    user?.profile?.profilePhoto? (
                                                        <img src={user.profile.profilePhoto} className='w-full h-full object-cover' alt="" />
                                                    ):(
                                                        <IoPersonSharp className='text-gray-200 object-cover w-full h-full '/>
                                                    )
                                                }
                                                </div>
                                                        <p>{user?.firstname}</p>
                                            </div>
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>{navigate("/profile")}} ><IoPersonSharp/> Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={logOutHandler} ><TbLogout/> logout</DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default DropdownBox