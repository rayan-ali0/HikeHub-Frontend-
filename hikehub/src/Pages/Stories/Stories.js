import Style from './Stories.module.css'
import Story from '../../Components/Story/Story'
import backgrd from '../../assets/images/felix-rostig-UmV2wr-Vbq8-unsplash.jpg'
import axiosInstance from '../../Utils/AxiosInstance';
import { useEffect, useState } from 'react';
import ImageSlider from '../../Components/ImageSlider/ImageSlider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './stories.css'
import arrow from '../../assets/icons/chevron.png'
import style from '../../Components/Story/Story.module.css'

import arrowLeft from '../../assets/icons/chevronleft.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Stories = () => {
    const [stories, setStories] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStories()
    }, [])

    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        // nextArrow:<img src={arrow} className={Style.rightarrow}/>,

        nextArrow: <ArrowForwardIcon className={Style.rightarrow} />,
        prevArrow: <ArrowBackIcon className={Style.leftarrow} />,
        autoplay: true,         
        autoplaySpeed: 4000
    };

    const settingss = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        // nextArrow:<img src={arrow} className={Style.rightarrow}/>,
        nextArrow: <ArrowForwardIcon className={Style.rightarrow} />,
        prevArrow: <ArrowBackIcon className={Style.leftarrow} />,
        // autoplay: true,         
        autoplaySpeed: 4000
    };


    const fetchStories = async () => {
        try {
            const response = await axiosInstance.get(`story/read`)
            if (response) {
                //   fetchUserData()
                setStories(response.data)
                setLoading(false)
                console.log("stories", response.data)
            }
            else {
                console.log(response)
                console.log("Error fetching stories")
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        !loading ? (
            <div className={Style.storyPage}>

                <Slider {...settings}  style={{width:"100%"}} >
                    {
                        stories.length > 0 && (
                            stories.map((story, index) => (

                                <div className={`${style.story}`} >
                                    <section className={`${style.storySection} ${style.textSection}`} >

                                        <div className={style.title} >
                                            <h1 className={style.storyTitle}>{story.title}</h1>
                                            <h4 className={style.date}>{story.eventId.date.split('T')[0]}</h4>
                                        </div>

                                        <div className={style.storyLine}></div>
                                        <p className={style.storyDescription}>
                                            {story.description}
                                        </p>
                                        <div className={style.storyTestimonial}>
                                            <Slider {...settingss} style={{ width: "80%" }}>
                                                {story.testimonials.map((text, index) => (
                                                    <p key={index} className={style.testimonialsText}>{text}</p>
                                                ))
                                                }

                                            </Slider>
                                        </div>
                                    </section>
                                    {/******************************** */}
                            

                                    <section className={`${style.storySection}`} >
                                        
                                        <div className={style.pics} >
                                            <img
                                                key={0}
                                                src={`${process.env.REACT_APP_BACKEND_PATH}${story.images[0]}`}
                                                className={`${style.storyImage} ${style.img1}`}

                                                alt={`story.images[1] ${0 + 1}`}
                                            />
                                        </div>
                                    </section>
                                </div>





                            ))
                        )
                    }
                </Slider>

            </div>
        ) : (
            <div className={Style.loadingDiv}>
                <h1 className={Style.loader}></h1>

            </div>
        )

    )
}
export default Stories


// import Style from './Stories.module.css'
// import Story from '../../Components/Story/Story'
// import backgrd from '../../assets/images/felix-rostig-UmV2wr-Vbq8-unsplash.jpg'
// import axiosInstance from '../../Utils/AxiosInstance';
// import { useEffect, useState } from 'react';
// import ImageSlider from '../../Components/ImageSlider/ImageSlider';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './stories.css'
// import arrow from '../../assets/icons/chevron.png'
// import style from '../../Components/Story/Story.module.css'

// import arrowLeft from '../../assets/icons/chevronleft.png'
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// const Stories = () => {
//     const [stories, setStories] = useState()
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         fetchStories()
//     }, [])

//     const settings = {
//         dots: true,
//         lazyLoad: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         initialSlide: 2,
//         nextArrow: <ArrowForwardIcon className={Style.rightarrow} />,
//         prevArrow: <ArrowBackIcon  className={Style.leftarrow}  />,
//         // autoplay: true,         
//         autoplaySpeed: 2000  
//     };


//     const fetchStories = async () => {
//         try {
//             const response = await axiosInstance.get(`story/read`)
//             if (response) {
//                 //   fetchUserData()
//                 setStories(response.data)
//                 setLoading(false)
//                 console.log("stories", response.data)
//             }
//             else {
//                 console.log(response)
//                 console.log("Error fetching stories")
//             }
//         }
//         catch (error) {
//             console.log(error.message)
//         }
//     }

//     return (
//         !loading ? (
//             <div className={Style.storyPage}>

// {/* <div  className={Style.slider}> */}
//                 <Slider {...settings}  >
//                     {
//                         stories.length > 0 && (
//                             stories.map((story, index) => (
//                                 <div className={Style.oneStory} key={index}>
//                                     <Story story={story} index={index + 1} />
//                                  </div>
//                             ))
//                         )
//                     }
//                 </Slider>
//                 {/* </div> */}

//                 {/* <ImageSlider sliders={stories} /> */}
//             </div>
//         ) : (
//             <div className={Style.loadingDiv}>
//                 <h1 className={Style.loader}></h1>

//             </div>
//         )

//     )
// }
// export default Stories