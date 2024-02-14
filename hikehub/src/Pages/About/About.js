import TitleSection from '../../Components/TitleSection/TitleSection'
import style from './About.module.css'
import Title from '../../Components/Title/Title'
import OurStory from '../../Components/OurStory/OurStory'
import OurExpertise from '../../Components/OurExpertise/OurExpertise'
import Team from '../../Components/Team/Team'
const About = () => {
    return (
        <div className={style.aboutPage}>
            <TitleSection text={"We Connect People To The Outdoors"}/>
            <div className={style.container}>
                <section className={`${style.aboutTitle} ${style.aboutSections}`}>
                    <h1>
                        We believe nature is what unites us all
                    </h1>
                    <h3>Our mission is simple: to kindle the spirit of adventure
                    </h3>
                </section>
{/**Numbers Section */}
                <section className={`${style.nbSection} ${style.aboutSections}`}>
                    <Title text={"Our Numbers"} />
                    <div className={style.nbsHolder}>

                        <div className={style.number}>
                            <span className={style.nb}>
                                50
                            </span>
                            <p>
                                curated trails
                            </p>
                        </div>
                        <div className={style.number}>
                            <span className={style.nb}>
                                100+
                            </span>
                            <p>
                                fellow explorers
                            </p>

                        </div>
                        <div className={style.number}>
                            <span className={style.nb}>

                                100K+
                            </span>
                            <p>
                                logged kilometers
                            </p>
                        </div>

                    </div>
                </section>

                {/**Numbers Section */}
<OurStory/>

<OurExpertise/>
<Team/>

            </div>

        </div>
    )
}
export default About