import React from 'react'
import { 
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenu,
    SidebarMenuItem,
    

 } from '../ui/sidebar'
import { BiBuilding, BiHome, BiPlus, BiSolidDashboard } from 'react-icons/bi'
import { BiBriefcase } from 'react-icons/bi'
import { BiUser } from 'react-icons/bi'
import logo from '../../assets/logo1.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { LogOut, LogOutIcon } from 'lucide-react'
import { USER_API_END_POINT } from '@/constants/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authslice'
import { toast } from 'sonner'




const AppSidebar = () => {
  const {user} = useSelector(store=>store.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async()=>{
          try {
          const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
          if(res.data.success){
              dispatch(setUser(null));
              navigate('/');
              toast.success(res.data.message);
          }
          } catch (error) {
              console.error(error);
              toast.error(error.response?.data?.message);
              
          }
      };
  return (
   <Sidebar>
      <main className='bg-white h-full'>
        <SidebarHeader className={`border-b`}>
         <Link to='/' > <img src={logo} className='max-sm:w-25 w-30' alt="" /> </Link>
        </SidebarHeader>

      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel >Overview</SidebarGroupLabel>

          <SidebarMenu  >

            <SidebarMenuItem>
              <Link to="/adminDashboard">
              <SidebarMenuButton className={`${location.pathname ==="/adminDashboard" ? "bg-blue-100 text-blue-500  " : "text-gray-500" } text-md  hover:bg-blue-100 hover:text-blue-600 hover:font-semibold`}>
                <BiSolidDashboard className="mr-2 h-4 w-4" />
                  Dashboard
              </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

          </SidebarMenu>

        </SidebarGroup>

        <SidebarGroup >
          <SidebarGroupLabel >COMPANIES</SidebarGroupLabel>

          <SidebarMenu  >

            <SidebarMenuItem>
              <Link to="mycompanies">
              <SidebarMenuButton className={`${location.pathname ==="/adminDashboard/mycompanies" ? "bg-blue-100 text-blue-500  " : "text-gray-500" } text-md  hover:bg-blue-100 hover:text-blue-600 hover:font-semibold`}>
                <BiBuilding className="mr-2 h-4 w-4" />
                My Companies
              </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to="postcompany" >
              <SidebarMenuButton className={`${location.pathname ==="/adminDashboard/postcompany" ? "bg-blue-100 text-blue-500  " : "text-gray-500" } text-md  hover:bg-blue-100 hover:text-blue-600 hover:font-semibold`}>
                <BiPlus className="mr-2 h-4 w-4" />
                Post New Company
              </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

          </SidebarMenu>

        </SidebarGroup>

        <SidebarGroup >
          <SidebarGroupLabel >JOBS</SidebarGroupLabel>

          <SidebarMenu  >

            <SidebarMenuItem>
              <Link to='myjobs'>
              <SidebarMenuButton className={`${location.pathname ==="/adminDashboard/myjobs" ? "bg-blue-100 text-blue-500  " : "text-gray-500" } text-md  hover:bg-blue-100 hover:text-blue-600 hover:font-semibold`}>
                <BiBriefcase className="mr-2 h-4 w-4" />
                My Job Postings
              </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to="postjob">
              <SidebarMenuButton className={`${location.pathname ==="/adminDashboard/postjob" ? "bg-blue-100 text-blue-500  " : "text-gray-500" } text-md  hover:bg-blue-100 hover:text-blue-600 hover:font-semibold`}>
                <BiPlus className="mr-2 h-4 w-4" />
                Post New Job
              </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

          </SidebarMenu>

        </SidebarGroup>

      </SidebarContent>

      </main>
      <SidebarFooter className="bg-white">
        <button onClick={logOutHandler} className='flex text-sm py-3 cursor-pointer text-red-500 font-medium items-center'>
          <LogOut className='mr-2'/>
          Logout
        </button>
      </SidebarFooter>
       

      
    </Sidebar>
  )
}

export default AppSidebar