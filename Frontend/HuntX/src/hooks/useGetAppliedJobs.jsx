import { APPLICATION_API_END_POINT } from "@/constants/constant"
import { setAppliedJob } from "@/redux/getApplication"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        
        const fetchData = async()=>{
            try {
                const res  = await axios.get(`${APPLICATION_API_END_POINT}/get`,{
                    withCredentials:true,
                });
                if(res.data.success){
                    dispatch(setAppliedJob(res.data.application));
                    
                }

            } catch (error) {
                console.log(error);
            }
                
        };

        fetchData();
        
    },[])
}

export default useGetAppliedJobs;