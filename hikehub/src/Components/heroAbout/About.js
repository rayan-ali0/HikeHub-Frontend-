import style from './About.module.css'
import Title from '../Title/Title.js'
import Button from '../Button/Button'
import mountain from '../../assets/images/akroum.jpeg'
import { Link, useNavigate } from 'react-router-dom'

const About = () => {
const navigate=useNavigate()

    const getMore=()=>{
        navigate('/about')
    }

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
                <img src={mountain} className={style.imgAbout} />
            </section>
        </div>
    )
}

export default About