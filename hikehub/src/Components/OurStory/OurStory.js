import TitleSection from '../../Components/TitleSection/TitleSection'
import style from './OurStory.module.css'
import Title from '../../Components/Title/Title'
import storyImg from '../../assets/images/hikeman2.jpg'
import story from '../../assets/images/pexels-simon-migaj-951076.jpg'

const OurStory = () => {
    return(
        <div className={style.storyContainer}>

<section className={style.textHolder}>
<Title text={"Our Story"}/>
<p>
Founded in 2020, HikeHub was born out of a love for exploration. From our humble beginnings to becoming a leader in guided hikes, our journey is fueled by the desire to share the beauty of nature with fellow enthusiasts
</p>
    </section>    
    <section>
<img src={story} className={style.myImg}></img>
    </section>
        </div>
    )
}
export default OurStory