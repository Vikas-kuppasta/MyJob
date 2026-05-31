import { ALLJOB_API_END_POINT } from "@/constants/constant";
import { setJob } from "@/redux/getJobSlice";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";

const useGetAllJob = (filters)=>{
    const dispatch = useDispatch();
    useEffect(()=>{

        const fetchData = async ()=>{
            try {
                const res = await axios.get(`${ALLJOB_API_END_POINT}/get`,{
                    params:{
                        location:filters.location,
                        jobtype:filters.industry,
                        minSalary:filters.minSalary,
                        maxSalary:filters.maxSalary,
                        keyword:filters.keyword
                    },
                    withCredentials:true,
                });
                if(res.data.success){
                    dispatch(setJob(res.data.jobs));
                    
                }      
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[filters,dispatch]);
}

export default useGetAllJob;