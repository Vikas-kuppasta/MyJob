import React from 'react'

const filtersection = ({filters,setFilters}) => {
    const filterData = [
        {
            filterType:"Location",
            filterKey:"location",
            options:[
                {
                    label:"Delhi",
                },
                {
                    label:"Pune",
                },
                {
                    label:"Banglore",
                },
                {
                    label:"Hydrabad",
                },
                {
                    label:"Mumbai",
                },
                ]
        },
        {
            filterType:"Industry",
            filterKey:"industry",
            options:[
                {
                    label:"IT"
                },
                {
                    label:"Creation"
                },
                {
                    label:"Sales"
                },
                {
                    label:"Mangement"
                },
                ]
        },
        {
            filterType:"Salary Range",
            filterKey:"salary",
            options:[
                {
                    label:"0-5",
                    min:0,
                    max:5,
                },
                {
                    label:"5-10",
                    min:5,
                    max:10,
                },
                {
                    label:"10-20",
                    min:10,
                    max:20,
                },
            ]
        },
    ]
  return (
<>
    <main className='w-50 bg-white mr-3 max-sm:hidden h-fit py-4 border rounded-md flex flex-col gap-3   '>
        <h1 className='text-2xl ml-4 text-black font-semibold ' >Filters</h1>
        <div className='border-t  border-gray-200 w-full border-solid  flex flex-col  '>
            {
                filterData.map((data,index)=>(
                    <div className='mt-2 ml-4 w-30   ' key={index}>
                        <h1 className='text-lg font-medium  text-blue-500'>{data.filterType}</h1>
                        {data.options.map((option,index)=>(

                        <div key={index} className='flex mt-1 gap-1 items-center text-sm '>
                            <input type="radio"  name={data.filterKey}  onChange={(e)=>{
                                if(data.filterKey ==="salary"){
                                    setFilters((prev)=>({...prev,minSalary:option.min,maxSalary:option.max}))
                                }else{
                                    setFilters({...filters,[data.filterKey]:option.label});    
                                }
                                }} />   
                            <span>{option.label}</span>
                        </div>
                        ))}
                    </div>    
                ))
            }

        </div>
    </main>
</>
  )
}

export default filtersection