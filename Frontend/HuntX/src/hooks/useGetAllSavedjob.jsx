import { ALLJOB_API_END_POINT } from "@/constants/constant"
import { setSavedJob } from "@/redux/getJobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAllSavedJob = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchData = async()=>{
            try {
            const res = await axios.get(`${ALLJOB_API_END_POINT}/saved-jobs`,{
                withCredentials:true,
            });
            
            if(res.data.success){
                dispatch(setSavedJob(res.data.savedJobs));
            }
            } catch (error) {
               console.log(error);
            }
            
        };
        fetchData();
    },[])
}

export default useGetAllSavedJob;