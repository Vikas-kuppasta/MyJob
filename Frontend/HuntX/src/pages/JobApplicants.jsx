import { APPLICATION_API_END_POINT } from '@/constants/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { setApplicantJob } from '@/redux/getApplication';
import { toast } from 'sonner';

const JobApplicants = () => {
    const {jobApplicants} = useSelector(store=>store.application);
    const dispatch = useDispatch();
    
    
    const {id}  = useParams();

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`,{
                    withCredentials:true,
                });
                if(res.data.success){
                    dispatch(setApplicantJob(res.data.job));
                    
                }
            }catch(error){
                console.log(error);
            }
        };
        fetchData();
    },[]);

    
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  let accepted=0;
  let pending=0;
  let rejected=0;
  for (let index = 0; index < jobApplicants?.application?.length; index++) {
        if(jobApplicants.application[index].status === "Accepted"){
            accepted++;
        }else if(jobApplicants.application[index].status === "Pending"){
            pending++
        }else{
            rejected++
        };
    
  };

  const updateStatus = async(applicationId,status)=>{
    try {
        const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`,{status},{
            withCredentials:true,
        });
        if(res.data.success){
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
    }
  }
  
  
  return (
<>
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{jobApplicants.title}</h1>

        <p className="text-muted-foreground mt-2">
          {jobApplicants?.application?.length} Applicants • {jobApplicants.jobtype} • {jobApplicants.location}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-5">
          <p className="text-muted-foreground">Total Applicants</p>
          <h2 className="text-3xl font-bold mt-2">{jobApplicants?.application?.length}</h2>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <p className="text-muted-foreground">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-600 mt-2">{pending}</h2>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <p className="text-muted-foreground">Accepted</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">{accepted}</h2>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <p className="text-muted-foreground">Rejected</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">{rejected}</h2>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search applicants..."
          className="w-full bg-white border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Applicant Cards */}
      <div className="space-y-4">
        {jobApplicants?.application?.map((applicant,index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border p-5 hover:shadow-md transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left */}
              <div className="flex gap-4">
                <img
                  src={applicant?.applicant.profile.profileBanner}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {applicant.applicant.firstname}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    {applicant.applicant.email}
                  </p>

                  <p className="text-sm text-muted-foreground mt-1">
                    Pune
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {applicant?.applicant.profile.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col lg:items-end gap-4">
                <Badge
                  className={getStatusColor(
                    applicant.status
                  )}
                >
                  {applicant.status}
                </Badge>

                <p className="text-sm text-muted-foreground">
                  Applied on {new Date(applicant?.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-2">
                  <Button variant="outline">
                    View Profile
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        Change Status
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={()=>{updateStatus(applicant._id,"Accepted")}} >
                        Accepted
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={()=>{updateStatus(applicant._id,"Pending")}}>
                        Pending
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={()=>{updateStatus(applicant._id,"Rejected")}}>
                        Rejected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
</>
  )
}

export default JobApplicants