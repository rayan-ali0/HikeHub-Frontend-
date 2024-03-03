import style from './Story.module.css'
import imgB from '../../assets/images/pexels-mirsad-mujanovic-691034.jpg'
import { useState } from 'react'
import dlt from '../../assets/icons/delete.png'
import { motion } from 'framer-motion'
import Slider from 'react-slick'
import arrow from '../../assets/icons/chevron.png'

import arrowLeft from '../../assets/icons/chevronleft.png'



const variants = [
    {
        initial: {
            opacity: 0
        },

        animate: {
            opacity: 1

        },
        transition: { duration: 0.5, delay: 1 },
    }

]

const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    nextArrow: <img src={arrow}  className={style.rightarrow} />,
    prevArrow: <img src={arrowLeft}  className={style.leftarrow}  />,
    // autoplay: true,         
    autoplaySpeed: 2000  
};


const Story = ({ story, index }) => {
    console.log(index % 2 === 0)
    console.log(story)

    const [model, setModel] = useState(false)
    const [tempimgSrc, setTempImg] = useState('')
    const getImg = (index) => {
        setTempImg(story.images[index])
        setModel(true)
    }
    return (
        <motion.div className={`${style.story}`} variants={variants} animate="animate" initial="initial">

            {/* // <motion.div className={`${index % 2 === 0 ? style.story : style.flexPage}`} variants={variants} animate="animate" initial="initial"> */}
            <motion.section className={`${style.storySection} ${style.textSection}`} variants={variants} animate="animate" initial="initial">


                <motion.div className={style.title} variants={variants} animate="animate" initial="initial">
                    <h1 className={style.storyTitle}>{story.title}</h1>
                    <h4 className={style.date}>{story.eventId.date.split('T')[0]}</h4>
                </motion.div>

                <div className={style.storyLine}></div>
                <p className={style.storyDescription}>
                    {story.description}
                    {/* Darb El Mseilha, also known as the Mseilha Walkway, is a captivating hiking trail offering stunning scenery and historical charm in the Batroun region of Lebanon. Winding alongside the Nahr el-Joz river, the trail unveils enchanting landscapes, vibrant local culture, and historical treasures like the Mseilha Fort. */}
                </p>
                <div className={style.storyTestimonial}>
                <Slider {...settings}  style={{width:"80%"}}>
                        {story.testimonials.map((text,index)=>(
                             <p key={index} className={style.testimonialsText}>{text}</p>
                        ))
                        }

                    </Slider>
                </div>
            </motion.section>
            {/******************************** */}
            {/* <motion.section className={`${model ? style.modelOpen : style.modelClose} ${style.model}`} variants={variants} animate="animate" initial="initial">
                <img src={`${process.env.REACT_APP_BACKEND_PATH}${tempimgSrc}`} className={style.showIMg} />
                <img src={dlt} className={style.closeModel} onClick={() => setModel(false)}></img>
            </motion.section> */}
            
            <motion.section className={`${style.storySection} ${style.gallery}`} variants={variants} animate="animate" initial="initial">
                <div className={style.pics} onClick={() => getImg(0)}>
                    <img
                        key={0}
                        src={`${process.env.REACT_APP_BACKEND_PATH}${story.images[0]}`}
                        className={`${style.storyImage} ${style.img1}`}

                        alt={`story.images[1] ${0 + 1}`}
                    />
                </div>
                {/* <div className={style.pics} onClick={() => getImg(1)}>
                    <img
                        key={0}
                        src={`${process.env.REACT_APP_BACKEND_PATH}${story.images[1]}`}
                        className={`${style.storyImage} ${style.img2}`}

                        alt={`story.images[1] ${0 + 1}`}
                    />
                </div> */}
                {/* <div className={style.pics} onClick={() => getImg(2)}>
                    <img
                        key={0}
                        src={`${process.env.REACT_APP_BACKEND_PATH}${story.images[2]}`}
                        className={`${style.storyImage} ${style.img3}`}

                        alt={`Image ${0 + 1}`}
                    />
                </div>
                <div className={style.pics} onClick={() => getImg(3)}>
                    <img
                        key={0}
                        src={`${process.env.REACT_APP_BACKEND_PATH}${story.images[3]}`}
                        className={`${style.storyImage} ${style.img4}`}

                        alt={`Image ${0 + 1}`}
                    />
                </div> */}

            </motion.section>
        </motion.div>
    )
}
export default Story

// import style from './Story.module.css'
// import imgB from '../../assets/images/pexels-mirsad-mujanovic-691034.jpg'

// const Story = ({ story, index }) => {
//     console.log(index % 2 === 0)
//     console.log(story)
//     return (
//         <div className={`${index % 2 === 0 ? style.story : style.flexPage}`}>
//             <section className={`${style.storySection} ${style.textSection}`}>
//                 <div className={style.title}>
//                     <h1 className={style.storyTitle}>{story.title}</h1>
//                     <h4 className={style.date}>{story.eventId.date.split('T')[0]}</h4>
//                 </div>

//                 <div className={style.storyLine}></div>
//                 <p className={style.storyDescription}>
//                     {story.description}
//                     {/* Darb El Mseilha, also known as the Mseilha Walkway, is a captivating hiking trail offering stunning scenery and historical charm in the Batroun region of Lebanon. Winding alongside the Nahr el-Joz river, the trail unveils enchanting landscapes, vibrant local culture, and historical treasures like the Mseilha Fort. */}
//                 </p>
//                 <div className={style.storyTestimonial}>
//                     <p>{story.testimonials[0]}</p>
//                 </div>
//             </section>
//             <section className={`${style.storySection} ${style.imgeSection}`}>
//                 {story.images.slice(0, 4).map((image, index) => (
//                     <img
//                         key={index}
//                         src={`${process.env.REACT_APP_BACKEND_PATH}${image}`}
//                         className={style.storyImage}
//                         alt={`Image ${index + 1}`}
//                     />
//                 ))}

//             </section>
//         </div>
//     )
// }
// export default Story