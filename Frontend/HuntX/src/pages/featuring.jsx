import React from 'react'
import Title from '../components/smallComponents/title'
import {featuredCards} from '../assets/assets'
import FeaturedCard from '../components/sharedComponents/featuredCard'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/components/Animation/animate'
const featuring = () => {
  return (
<>
    <motion.div variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} className='grid-cols-1 grid lg:grid-cols-2 '>
        {featuredCards.map((card)=>(
            <motion.div variants={itemVariants} key={card.id} className={`max-sm:px-5 px-14 py-10 ${card.bgcolor}`}>
                <FeaturedCard card={card}/>
            </motion.div>
        ))}
    </motion.div>
</>
  )
}

export default featuring