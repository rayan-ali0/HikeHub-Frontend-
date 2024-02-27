import style from './About.module.css'
import Title from '../Title/Title.js'
import Button from '../Button/Button'
import mountain from '../../assets/images/akroum.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import video from '../../assets/Video/video.mp4'
import { useState,useRef } from 'react'
import play from '../../assets/icons/play.png'
import pause from '../../assets/icons/pause.png'

const About = () => {
const navigate=useNavigate()
const [isVideoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);


    const toggleVideo = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
          if (isVideoPlaying) {
            videoElement.pause();
          } else {
            videoElement.play();
          }
          setVideoPlaying(!isVideoPlaying);
        }
      };

    return (
        <div className={style.aboutSectionHolder} >
            <section className={style.aboutSection}>
                <Title text={"The Best Agency for Hikers"} />
                <p className={style.aboutText}>
                    For three years, we've been the catalysts for unparalleled hiking experiences in Lebanon. Our journey unfolds amidst the diverse landscapes, ancient trails, and breathtaking vistas that define our beloved country. With a passion for exploration and a commitment to excellence, we invite you to join us as we continue to write the story of adventure across Lebanon's rugged beauty.
                </p>
                <Link  to='/about' className={style.btnHolder}>
                    <Button text={"Learn More"} />
                </Link>

            </section>
            <section className={`${style.aboutSection} ${style.imgSection}`}>
                <span onClick={toggleVideo} className={style.play}><img  src={isVideoPlaying?pause:play} className={style.playIcong}/></span>
                <video  ref={videoRef}  className={style.imgAbout} >
                    <source type='video/mp4' src={video}/>
                    your browser does not support this type of video
                </video>
                {/* <img src={mountain} className={style.imgAbout} /> */}
            </section>
        </div>
    )
}

export default About