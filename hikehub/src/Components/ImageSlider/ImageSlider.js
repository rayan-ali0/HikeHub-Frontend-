import style from './ImageSlider.module.css'
import Story from '../../Components/Story/Story'
import backgrd from '../../assets/images/felix-rostig-UmV2wr-Vbq8-unsplash.jpg'
import axiosInstance from '../../Utils/AxiosInstance';
import { useEffect, useState } from 'react';
// import arrow from '../../assets/icons/right-chevron.png'
import { motion } from 'framer-motion';
import arrow from '../../assets/icons/chevron.png'

import arrowLeft from '../../assets/icons/chevronleft.png'

const variants = [
    {
        initial: {
            opacity:0
        },

        animate: {
            opacity:1
            
        },
        transition: { duration: 0.5, delay: 1 },
    }

]

const ImageSlider=({sliders})=>{
const [current,setCurrent]=useState(0)
const [loading,setLoading]=useState(true)

useEffect(()=>{
    console.log("sssss",sliders)
},[])


    return(
<motion.div className={style.Slider} variants={variants} initial="initial" animate= "animate">
    {
        current!==(sliders.length-1)&&(
            <img src={arrow} className={style.rightarrow} onClick={()=>setCurrent(current+1)}></img>

        )
    }
      {
        current!==0&&(
            <img src={arrowLeft} className={style.leftarrow} onClick={()=>setCurrent(current-1)}></img>

        )
    }

<Story story={sliders[current]} index={1} className={style.animated} />
</motion.div>

    )
}
export default ImageSlider