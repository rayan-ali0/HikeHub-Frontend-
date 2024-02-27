import TitleSection from '../../Components/TitleSection/TitleSection'
import style from './About.module.css'
import Title from '../../Components/Title/Title'
import OurStory from '../../Components/OurStory/OurStory'
import OurExpertise from '../../Components/OurExpertise/OurExpertise'
import Team from '../../Components/Team/Team'
import {useSpring , animated} from "react-spring"
import CountUp from 'react-countup';

const About = () => {
    // function Number(n) {
    //     const { numberProps } = useSpring({
    //         from: { number: 0 },
    //         number: 50,
    //         delay: 200,
    //         config: { mass: 1, tension: 20, friction: 10 }
    //     })
    //     // return <animated.div>{number.to((m)=>m.toFixed(0))}</animated.div>
    // // }

    return (
        <div className={style.aboutPage}>
            <TitleSection text={"We Connect People To The Outdoors"} />
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
                                {/* 50 */}
                                {/* <Number n={50}/> */}
                                <CountUp start={0}
  end={50}
  duration={5}
//   delay={1}
  />

                                {/* {number ? number.to((n) => n.toFixed(0)) : "Loading..."} */}
                            </span>
                            <p>
                                curated trails
                            </p>
                        </div>
                        <div className={style.number}>
                            <span className={style.nb}>
                            {/* <Number n={100}/> */}
                                <CountUp start={0}
  end={100}
  duration={5}
  suffix="+"

//   delay={1}
  />

                            </span>
                            <p>
                                fellow explorers
                            </p>

                        </div>
                        <div className={style.number}>
                            <span className={style.nb}>

                            <CountUp start={0}
  end={100}
  duration={5}
  suffix="K+"

//   delay={1}
  />                            </span>
                            <p>
                                logged kilometers
                            </p>
                        </div>

                    </div>
                </section>

                {/**Numbers Section */}
                <OurStory />

                <OurExpertise />
                <Team />

            </div>

        </div>
    )
}
export default About