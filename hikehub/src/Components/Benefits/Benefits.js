import style from './Benefits.module.css'
import physic from '../../assets/images/Group.png'
import meditating from '../../assets/images/meditating.png'
import selfie from '../../assets/images/selfie.png'
import Title from '../Title/Title'
const Benefits=()=>{

    return (
        <div className={style.benefitsHolder}>
            <Title text={"Hiking Benefits"}/>
            <div className={style.benefits}>

            <section className={style.benefit}>
    <img src={physic}/>
    <h3>
    Physical Exercise
    </h3>
    <p>
    Strengthen muscles, boost fitness, and explore scenic landscapes with the natural workout of hiking
    </p>
</section>

            <section className={style.benefit}>

    <img src={meditating}/>
    <h3>
    Mental Health
        </h3>
    <p>
    Reduce stress, enhance clarity, and improve well-being with the therapeutic escape of hiking in nature.    </p>
</section>

            <section className={style.benefit}>

    <img src={selfie}/>
    <h3>
    Connect with nature
        </h3>
    <p>
    Rejuvenate your spirit by reconnecting with nature during hikes, experiencing the power of the outdoors.    </p>
</section>

            </div>

        </div>
    )
}

export default Benefits