import React from 'react'

const filtersection = () => {
    const filterData = [
        {
            filterType:"Location",
            options:["Delhi","Pune","Banglore","Hydrabad","Mumbai"]
        },
        {
            filterType:"Industry",
            options:["IT","MBA","Content Creation","Mangement"]
        },
        {
            filterType:"Salary Range",
            options:["0-2 LPA","2-4 LPA","4-6 LPA"]
        },
    ]
  return (
<>
    <main className='w-50 py-4  flex flex-col gap-3   '>
        <h1 className='text-3xl ml-4 text-black font-semibold ' >Filters</h1>
        <div className='border-t-2  border-gray-200 w-full border-solid  flex flex-col  '>
            {
                filterData.map((data,index)=>(
                    <div className='mt-2 ml-4 w-30   ' key={index}>
                        <h1 className='text-lg font-medium  text-blue-500'>{data.filterType}</h1>
                        {data.options.map((option,index)=>(

                        <div key={index} className='flex mt-1 gap-1 items-center text-sm '>
                            <input type="radio" name="" id="" />
                            <span>{option}</span>
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