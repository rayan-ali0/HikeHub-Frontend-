import style from './Stories.module.css'
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
        nextArrow: <ArrowForwardIcon className={style.rightarrow} />,
        prevArrow: <ArrowBackIcon  className={style.leftarrow}  />,
        // autoplay: true,         
        autoplaySpeed: 2000  
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
            <div className={style.storyPage}>

{/* <div  className={style.slider}> */}
                <Slider {...settings}  >
                    {
                        stories.length > 0 && (
                            stories.map((story, index) => (
                                <div className={style.oneStory} key={index}>
                                    <Story story={story} index={index + 1} />
                                 </div>
                            ))
                        )
                    }
                </Slider>
                {/* </div> */}

                {/* <ImageSlider sliders={stories} /> */}
            </div>
        ) : (
            <div className={style.loadingDiv}>
                <h1 className={style.loader}></h1>

            </div>
        )

    )
}
export default Stories