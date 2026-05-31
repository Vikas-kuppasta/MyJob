import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ALLJOB_API_END_POINT } from '@/constants/constant'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const Postjobs = () => {
  const {Companies} = useSelector(store=>store.company);
  console.log(Companies)
  const [input,setInput]  = useState({
    title:"",
    description:"",
    requirements:"",
    salary:"",
    location:"",
    jobtype:"",
    experience:"",
    workmode:"",
    email:"",
    companyId:""
  });
  console.log(input);

  const handler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${ALLJOB_API_END_POINT}/post`,input,{
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <main className='p-4 bg-blue-100/30 h-300 overflow-scroll'>
            <div className='flex  mb-3 '>
              <SidebarTrigger className="mr-2"/>
              <div>
                <h3 className='font-semibold text-xl '>Post New Job</h3>
                <p className='text-gray-400 text-[12px]'>Fill in the details to publish a new job opening</p>
              </div>
            </div>
    
            {/* ///////// */}
    
            
          <div className="w-full  max-w-5xl bg-white p-8 rounded-2xl shadow-lg h-fit mx-auto my-auto">
            
            {/* Title */}
            <h1 className="text-2xl  font-bold  mb-8">
              Job Information
            </h1>
    
            {/* Form */}
            <form onSubmit={submitHandler} className="space-y-6">
    
              {/* Grid cols-2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
                {/* Job Name */}
                <div>
                  <label className="block  mb-2">
                   Job Title *
                  </label>
                  <input
                    onChange={handler}
                    name='title'
                    type="text"
                    placeholder="Enter job title"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
    
                {/* Company */}
                <div>
                  <label className="block  mb-2">
                    Company *
                  </label>
                

                  <Select  onValueChange={(value)=>{
                    const company = Companies.find((c)=>(c._id===value));
                    setInput((prev) => ({
                    ...prev,
                    companyId: value,
                    location: company?.location || "",
                    email: company?.email || "",
                    jobtype:company?.industry || "",
                    description: company?.description || "",
                  }));
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>

                    <SelectContent>
                      {
                        Companies.map((company,index)=>(
                          <SelectItem key={index} value={company._id} >{company.name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                
                  {/* <input
                    type="text"
                    placeholder="Enter industry"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  /> */}
                </div>
    
                {/* Job Type */}
                <div>
                  <label className="block  mb-2">
                    Job Type
                  </label>
                  <input
                    onChange={handler}
                    name="jobtype"
                    value={input.jobtype}
                    type="text"
                    placeholder="Enter job type"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
    
                {/* Work Mode */}
                <div>
                  <label className="block  mb-2">
                    Work Mode
                  </label>
                  <input
                    onChange={handler}
                    name="workmode"
                    value={input.workmode}
                    type="text"
                    placeholder="Enter work mode"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
    
                {/*  Location*/}
                <div>
                  <label className="block  mb-2">
                 Location *
                  </label>
                  <input
                    onChange={handler}
                    name="location"
                    value={input.location}
                    type="text"
                    placeholder="Enter city"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
    
                {/* Experience Required */}
                <div>
                  <label className="block  mb-2">
                    Experience Year Required *
                  </label>
                  <input
                    onChange={handler}
                    name="experience"
                    value={input.experience}
                    type="number"
                    placeholder="Enter experience required"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
    
                {/* Salary */}
                <div>
                  <label className="block  mb-2">
                    Salary
                  </label>
                  <input
                    onChange={handler}
                    name="salary"
                    value={input.salary}
                    type="number"
                    placeholder="Enter salary"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
    
                {/* Email */}
                <div>
                  <label className="block  mb-2">
                    Email (contact) *
                  </label>
                  <input
                    onChange={handler}
                    name="email"
                    value={input.email}
                    type="email"
                    placeholder="Enter contact email"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
    
              {/* Grid cols-1 */}
              <div className="grid grid-cols-1 gap-6">
    
                {/* Job Description */}
                <div>
                  <label className="block  mb-2">
                    Job Description *
                  </label>
                  <textarea
                    onChange={handler}
                    name="description"
                    value={input.description }
                    rows="5"
                    placeholder="Enter company description"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>
    
                {/* Requirements */}
                <div>
                  <label className="block  mb-2">
                    Requirements
                  </label>
                  <input
                    onChange={handler}
                    name="requirements"
                    type="text"
                    placeholder="Enter requirements"
                    className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                className=" bg-blue-600 text-sm hover:bg-blue-700 transition-all text-white py-3 px-5 rounded-lg font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        
            
        </main>
  )
}

export default Postjobs