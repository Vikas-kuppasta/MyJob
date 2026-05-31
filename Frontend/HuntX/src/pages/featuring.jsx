import React from 'react'
import Title from '../components/smallComponents/title'
import {featuredCards} from '../assets/assets'
import FeaturedCard from '../components/sharedComponents/featuredCard'
const featuring = () => {
  return (
<>
    <main className='grid-cols-1 grid lg:grid-cols-2 '>
        {featuredCards.map((card)=>(
            <div key={card.id} className={`max-sm:px-5 px-14 py-10 ${card.bgcolor}`}>
                <FeaturedCard card={card}/>
            </div>
        ))}
    </main>
</>
  )
}

export default featuring