import React from 'react'
import Title from '../components/smallComponents/title'
import {featuredCards} from '../assets/assets'
import FeaturedCard from '../components/sharedComponents/featuredCard'
const featuring = () => {
  return (
<>
    <main className='grid grid-cols-2 '>
        {featuredCards.map((card)=>(
            <div key={card.id} className={`px-14 py-10 ${card.bgcolor}`}>
                <FeaturedCard card={card}/>
            </div>
        ))}
    </main>
</>
  )
}

export default featuring