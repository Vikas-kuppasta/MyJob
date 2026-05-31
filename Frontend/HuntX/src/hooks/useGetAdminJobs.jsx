import { ALLJOB_API_END_POINT } from '@/constants/constant';
import { setAdminJobs, setJob,  } from '@/redux/getJobSlice';
import axios from 'axios';
import react, { useEffect } from 'react'
import { useDispatch } from 'react-redux';


const useGetAdminJobs = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{

        const fetchData = async ()=>{
            try {
                const res = await axios.get(`${ALLJOB_API_END_POINT}/getadminjobs`,{
                    withCredentials:true,
                });
                if(res.data.success){
                    dispatch(setAdminJobs(res.data.jobs));

                    
                }      
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[])
};

export default useGetAdminJobs;