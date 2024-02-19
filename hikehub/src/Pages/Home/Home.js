import Benefits from '../../Components/Benefits/Benefits'
import EventCart from '../../Components/EventCart/EventCart'
import Hero from '../../Components/Hero/Hero'
import HomeStories from '../../Components/HomeStories/HomeStories'
import Offering from '../../Components/Offering/Offering'
import Title from '../../Components/Title/Title'
import About from '../../Components/heroAbout/About'
import style from './Home.module.css'
import axios from 'axios'
import axiosInstance from '../../Utils/AxiosInstance'
import { useEffect, useState } from 'react'
const Home = () => {
  const [recents, setRecents] = useState([])
  const fetchRecents = async () => {
    try {
      const response = await axiosInstance.get('event/getUpcoming')
      // const response = await axios.get(`${process.env.BACKEND_PATH}event/getUpcoming`)
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

  return (
    <div className={style.homeContainer}>
      <Hero />
      <div className={style.bodyContainer}>
        <About />
        <Offering />
        <div className={style.upcomingSection}>
          <Title text={"Upcoming Events"} />
          {
            recents.length > 0 && (
              <div className={style.upcoming}>
                {recents.map(event => (
                  <EventCart key={event.id} event={event} />
                ))}
              </div>
            )
          }
        </div>
        <HomeStories />
        <Benefits />
      </div>
    </div>
  )
}

export default Home