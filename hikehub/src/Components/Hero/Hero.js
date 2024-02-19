import style from './Hero.module.css'
import akroum from '../../assets/images/akroum.jpeg'
import hikeman from '../../assets/images/hikeman.jpg'
import cloud from '../../assets/images/cloud1.png'
import cloud2 from '../../assets/images/cloud2.png'
import { motion } from "framer-motion"

const slider={
    initial:{
        x:0
    },
    animate:{
        x:"-15%",
        transition:{
            repeat:Infinity,
            repeatType:"mirror",
            duration:20

        }
    }
}

const slider1={
    initial:{
        x:-200
    },
    animate:{
        x:"-35%",
        transition:{
            repeat:Infinity,
            repeatType:"mirror",
            duration:20

        }
    }
}
const Hero = () => {

    return (
        <div className={style.HeroContainer}>
            <img src={hikeman} className={style.heroBackground} />
            <div className={style.blur}></div>
            <section className={style.HeroText}>
                <div className={style.guideText}><span className={style.lineSpan}></span>A Hiking guide</div>
                <h1 className={style.heading1}>Be prepared for the </h1>
                {/* <div className={style.transparentTextContainer}> */}

                <h1 className={style.transparentText}>Mountain and beyond</h1>
{/* </div> */}
            </section>
            <div className={style.cloudHolders}>

            <motion.img src={cloud2} variants={slider1} initial="initial" animate="animate" className={style.clouds}/>

<motion.img src={cloud} variants={slider} initial="initial" animate="animate" className={style.clouds}/>
</div>
        </div>
    )
}

export default Hero