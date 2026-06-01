import CompanyCard from '@/components/smallComponents/CompanyCard'
import { SidebarTrigger } from '@/components/ui/sidebar'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import React from 'react'
import { useSelector } from 'react-redux'

const MyCompanies = () => {
  useGetAllCompanies();
  const {Companies} = useSelector(store=>store.company);
  

  return (
<>
    <main className='p-4 bg-blue-100/30 h-screen overflow-y-scroll'>
        <div className='flex  '>
          <SidebarTrigger className="mr-2"/>
          <div>
            <h3 className='font-semibold text-xl '>My Companies</h3>
            <p className='text-gray-400 text-[12px]'>Manage all your registered companies</p>
          </div>
        </div>

        <div className='mt-3 max-sm:grid-cols-1 grid grid-cols-2 gap-3'>
            {
              Companies?.map((company,index)=>(
                <CompanyCard key={index} company={company} />
              ))
            }


        </div>
        
    </main>
</>
  )
}

export default MyCompanies