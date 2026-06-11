import React from 'react'
import Title from '../smallComponents/Title'
import { useNavigate } from 'react-router-dom';


const featuredCard = ({card}) => {
    const Icon1 = card.image1;
    const Icon2 = card.image2;
    const Icon3 = card.image3;
    const Icon4 = card.image4;

    const navigate = useNavigate();
    return (
<>
    <main className='flex flex-col gap-10'>
        <Title text={card.title} subtitle={card.subtitle}/>

        <div className='flex flex-col xl:h-70 gap-4'>
            <div className='flex gap-6  '>
                <Icon1 className='max-md:text-4xl text-5xl text-white bg-blue-300 p-2 rounded-full' />
                <p className='max-md:w-55 lg:w-80 xl:w-120 '>{card.title1}</p>
            </div>
            <div className='flex gap-6   '>
                <Icon2 className='max-md:text-4xl text-5xl text-white bg-blue-300 p-2 rounded-full' />
                <p className='max-md:w-55 lg:w-80 xl:w-120 '>{card.title2}</p>
            </div>
            <div className='flex gap-6   '>
                <Icon3 className='max-md:text-4xl text-5xl text-white bg-blue-300 p-2 rounded-full' />
                <p className='max-md:w-55 lg:w-80 xl:w-120'>{card.title3}</p>
            </div>
            <div className='flex gap-6'>
                <Icon4 className='max-md:text-4xl text-5xl text-white bg-blue-300 p-2 rounded-full' />
                <p className='max-md:w-55 lg:w-80 xl:w-120'>{card.title4}</p>
            </div>
            
        </div>
        <div className='flex gap-4'>
            <button className='border rounded-md border-gray-400 p-2'>Learn more</button>
            
            <button onClick={()=>{navigate("/signup"); window.scrollTo(0, 0);}} className='bg-black cursor-pointer text-white rounded-md p-2 px-4'>Sign up</button>
            
        </div>
    </main>
</>
)
}

export default featuredCard