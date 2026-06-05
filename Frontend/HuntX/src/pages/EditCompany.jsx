import { COMPANY_API_END_POINT } from '@/constants/constant';
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const EditCompany = () => {
    const {Companies} = useSelector(store=>store.company);
    const {id} = useParams();
    const company = Companies.find((c)=>(c._id===id));
    const [input,setInput] = useState({
        companyname:company?.name || "",
        industry:company?.industry || "",
        companySize:company?.companySize ||"",
        foundedYear:company?.foundedYear ||"",
        location:company?.location ||"",
        state:company?.state || "",
        website:company?.website ||"",
        email:company?.email ||"",
        description:company?.description ||"",
        companyLogo:company?.companyProfile?.CompanyLogo||"",
        companyBanner:company?.companyProfile?.CompanyBanner||"",
      });
    
      const handleInput = (e)=>{
        setInput({...input,[e.target.name]:e.target.value});
      };
    
      const handleFile = (e)=>{
        setInput({...input,[e.target.name]:e.target.files?.[0]});
      };
    
      const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("companyname",input.companyname);
        formData.append("industry",input.industry);
        formData.append("companySize",input.companySize);
        formData.append("foundedYear",input.foundedYear);
        formData.append("location",input.location);
        formData.append("state",input.state);
        formData.append("website",input.website);
        formData.append("email",input.email);
        formData.append("description",input.description);
        if(input.companyLogo || input.companyBanner){
          formData.append("companyLogo",input.companyLogo);
          formData.append("companyBanner",input.companyBanner);
        }
    
        try {
          const res = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`,formData,{
            headers:{'Content-Type':"multipart/form-data"},
            withCredentials:true,
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
<>
    <div className="w-full  max-w-5xl bg-white p-8 rounded-2xl shadow-lg h-fit mx-auto my-auto">
        
        {/* Title */}
        <h1 className="text-2xl  font-bold  mb-8">
          Company Details
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Grid cols-2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Company Name */}
            <div>
              <label className="block  mb-2">
                Company Name *
              </label>
              <input
                onChange={handleInput}
                name="companyname"
                value={input.companyname}
                required
                type="text"
                placeholder="Enter company name"
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block  mb-2">
                Industry *
              </label>
              <input
                onChange={handleInput}
                name="industry"
                value={input.industry}
                required
                type="text"
                placeholder="Enter industry"
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Company Size */}
            <div>
              <label className="block  mb-2">
                Company Size
              </label>
              <input
                onChange={handleInput}
                name="companySize"
                value={input.companySize}
                type="text"
                placeholder="Enter company size"
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Founded Year */}
            <div>
              <label className="block  mb-2">
                Founded Year
              </label>
              <input
                onChange={handleInput}
                name="foundedYear"
                value={input.foundedYear}
                type="text"
                placeholder="Enter founded year"
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="block  mb-2">
                City *
              </label>
              <input
                onChange={handleInput}
                name="location"
                value={input.location}
                required
                type="text"
                placeholder="Enter city"
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* State */}
            <div>
              <label className="block  mb-2">
                State *
              </label>
              <input
                onChange={handleInput}
                name="state"
                value={input.state}
                required
                type="text"
                placeholder="Enter state"
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block  mb-2">
                Website
              </label>
              <input
                onChange={handleInput}
                name="website"
                value={input.website}
                type="text"
                placeholder="Enter website URL"
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block  mb-2">
                Email (contact) *
              </label>
              <input
                onChange={handleInput}
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

            {/* Company Description */}
            <div>
              <label className="block  mb-2">
                Company Description *
              </label>
              <textarea value={input.description} name='description' onChange={handleInput}
                rows="5"
                placeholder="Enter company description"
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            {/* Company Logo  */}
            <div>
              <label className="block  mb-2">
                Company Logo 
              </label>
              <input
                onChange={handleInput}
                name="companyLogo"
                value={input.companyLogo}
                type="file"
                accept='image/*'
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Company Banner  */}
            <div>
              <label className="block  mb-2">
                Company Banner
              </label>
              <input
                onChange={handleInput}
                name="companyBanner"
                type="file"
                accept='image/*'
                className="w-full p-2 rounded-lg placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" bg-blue-600 text-sm hover:bg-blue-700 transition-all text-white py-3 px-5 rounded-lg font-semibold"
          >
            Save
          </button>
        </form>
      </div>
</>
  )
}

export default EditCompany