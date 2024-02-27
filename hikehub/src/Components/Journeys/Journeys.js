import style from './Journeys.module.css'
import axiosInstance from '../../Utils/AxiosInstance'
import { useEffect, useState } from 'react'
import jouney from '../../assets/images/felix-rostig-UmV2wr-Vbq8-unsplash.jpg'
import img1 from '../../assets/images/eddy-billard-JOoOPt8tTPY-unsplash.jpg'
import story2 from '../../assets/images/story2.jpeg'
import arrow from '../../assets/icons/right-chevron.png'
import Title from '../Title/Title'
import { useNavigate } from 'react-router-dom'
// import  JourneyCard from '../../assets/images/'
import  JourneyCard from '../../assets/images/pexels-jan-krnc-1070492.jpg'
const Journeys = () => {
    const [recents, setRecents] = useState([])
    const fetchRecents = async () => {
        try {
            const response = await axiosInstance.get('event/getUpcoming')
            if (response) {
                setRecents(response.data)
                console.log(response.data)
            }
            else {
                console.log(response)
                console.log("Error fetching upcoming events")
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        console.log("BACKEND_PATH:", process.env.BACKEND_PATH);

        fetchRecents()
    }, [])
const navigate=useNavigate()
    const checkStories=()=>{
navigate('/stories')
    }

    return (
        <div className={style.jounertComp}>
      <Title text={"Completed Journeys"}/>
        <div className={style.jouneyContainer}>
            <section className={`${style.journeyA}`}>
                <img src={jouney} className={style.image}></img>
                <div className={style.opacity}></div>
                <span className={style.journeyTitle}>Tripo For Drab Mseilha</span>
                <img src={arrow} className={style.arrow} onClick={checkStories}/>
            </section>

            <section className={`${style.journeyB}`}>
                <img src={img1} className={style.image}></img>
                <div className={style.opacity}></div>
                <span className={style.journeyTitle}>Tripo For Drab Mseilha</span>
                <img src={arrow} className={style.arrow} />
            </section>

            <section className={`${style.journeyC}`}>
                <img src={JourneyCard} className={style.image}></img>
                <div className={style.opacity}></div>
                <span className={style.journeyTitle}>Tripo For Drab Mseilha</span>
                <img src={arrow} className={style.arrow} />
            </section>

            <section className={`${style.journeyD}`}>
                <img src={story2} className={style.image}></img>
                <div className={style.opacity}></div>
                <span className={style.journeyTitle}>Tripo For Drab Mseilha</span>
                <img src={arrow} className={style.arrow} />
            </section>

        </div>
        </div>
    )
}

export default Journeys