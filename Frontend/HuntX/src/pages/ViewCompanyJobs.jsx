import { ALLJOB_API_END_POINT, COMPANY_API_END_POINT } from '@/constants/constant';
import { setCompanyJobs } from '@/redux/getJobSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FaLocationDot } from 'react-icons/fa6';
import { IoBagSharp } from 'react-icons/io5';
import { MdCurrencyRupee } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { toast } from 'sonner';

const ViewCompanyJobs = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/getjobsbycompany/${id}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setCompanyJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id, dispatch]);

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

    const { companyJobs } = useSelector((store) => store.job);


    const totalJobs = companyJobs?.length || 0;
    const companyDescription =
        companyJobs?.[0]?.description || 'No company description available';

    return (
<>
        <main className='w-full min-h-screen bg-blue-50/20'>

        <div className=" max-w-5xl mx-auto px-4 py-8 ">

            {/* Header */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm mb-8">
                <div className="flex justify-between items-start">

                    <div>
                        <h1 className="text-3xl font-bold">
                            {companyJobs?.[0]?.company?.name || "Company"}
                        </h1>

                        <p className="text-muted-foreground mt-2">
                            {companyDescription}
                        </p>

                        <div className="flex gap-3 mt-4">
                            <Badge variant="secondary">
                                {totalJobs} Jobs Posted
                            </Badge>
                        </div>
                    </div>

                    <Button onClick={()=>navigate("/adminDashboard/postjob")} className={`bg-blue-400 hover:bg-blue-400  max-sm:hidden text-white cursor-pointer`}>
                       + Post New Job
                    </Button>

                </div>
            </div>

            {/* Jobs Grid */}
            {companyJobs?.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-xl font-semibold">
                        No Jobs Found
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        This company hasn't posted any jobs yet.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {companyJobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white border rounded-2xl p-5 hover:shadow-lg transition-all"
                        >
                            {/* Top */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl  font-semibold capitalize">
                                        {job.title}
                                    </h2>

                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                                        <span className='flex items-center gap-1'><FaLocationDot/> {job.location}</span>
                                        <span className='flex items-center gap-1'><MdCurrencyRupee/> {job.salary} LPA</span>
                                        <span className='flex items-center gap-1'><IoBagSharp/> {job.workmode}</span>
                                    </div>
                                </div>

                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                    Active
                                </Badge>
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground mt-4 line-clamp-2">
                                {job.description}
                            </p>

                            {/* Experience */}
                            <div className="mt-4">
                                <p className="font-medium">
                                    Experience: {job.experience} Years
                                </p>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {job.requirements?.map((skill, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                            {/* Footer Info */}
                            <div className="flex justify-between mt-5 text-sm text-muted-foreground">
                                <span className='flex items-center gap-1 '>
                                    <HiUserGroup/> {job.application?.length || 0} Applicants
                                </span>

                                <span>
                                    {new Date(
                                        job.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-3 gap-3 mt-6">
                                <Button onClick={()=>{navigate(`/adminDashboard/myjobs/applicants/${job._id}`)}} variant="outline">
                                    Applicants
                                </Button>

                                <Button onClick={()=>{navigate(`/adminDashboard/myjobs/${job._id}`)}} variant="outline">
                                    Edit
                                </Button>

                                <Button onClick={()=>{deleteHandler(job._id)}}
                                    variant="outline"
                                    className="text-red-500"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </main>
</>
    );
};

export default ViewCompanyJobs;