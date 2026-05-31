import { useEffect } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/constants/constant";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/getCompanies";


const useGetAllCompanies = ()=>{
        const dispatch = useDispatch();
        useEffect(()=>{
            const fetchData = async ()=>{
                try {
                    const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{
                        withCredentials:true,
                    });
                    if(res.data.success){
                        dispatch(setCompanies(res.data.companies));
                        console.log(res.data.companies);
                    }

                } catch (error) {
                    console.log("error:",error);
                }
            }
            fetchData();
        },[])
};

export default useGetAllCompanies;