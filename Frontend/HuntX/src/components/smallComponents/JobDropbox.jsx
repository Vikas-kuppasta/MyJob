import React from 'react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,  DropdownMenuTrigger } from '../ui/dropdown-menu';
import {  BsThreeDotsVertical } from 'react-icons/bs';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ALLJOB_API_END_POINT } from '@/constants/constant';
import { toast } from 'sonner';

const JobDropbox = ({id}) => {
    const navigate =  useNavigate();
    const deleteHandler = async(id)=>{
        try {
            const res = await axios.post(`${ALLJOB_API_END_POINT}/delete/${id}`,{},
                {withCredentials:true,});
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
  return (
<>
     <DropdownMenu >
            <DropdownMenuTrigger className="outline-none">
                 <BsThreeDotsVertical className='cursor-pointer'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 mt-4">
                <DropdownMenuGroup>
                    
                    <DropdownMenuItem onClick={()=>{navigate(`${id}`)}}  >Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{navigate(`applicants/${id}`)}}  >View Applicants</DropdownMenuItem>
                    
                    <DropdownMenuItem className="bg-red-100 text-red-600 justify-center" onClick={()=>{deleteHandler(id)}} >delete</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
</>
  )
}

export default JobDropbox