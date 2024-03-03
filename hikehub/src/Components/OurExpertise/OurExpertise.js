// import style from './OurExpertise.module.css'
import style from '../OurStory/OurStory.module.css'
import Title from '../../Components/Title/Title'
import storyImg from '../../assets/images/toomas-tartes-Yizrl9N_eDA-unsplash (1).jpg'

const OurExpertise = () => {
    return(
        <div className={style.expertiseContainer}>
    <section>
<img src={storyImg} className={style.myImg}></img>
    </section>

<section className={style.textHolder}>
<Title text={"Our Expertise"}/>
<p>
With three years of expertise, we specialize in crafting unique hiking adventures. Our team ensures you explore breathtaking landscapes with confidence and personalized guidance.</p>
    </section>    

        </div>
    )
}
export default OurExpertise