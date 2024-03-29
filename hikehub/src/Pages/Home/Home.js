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
import Journeys from '../../Components/Journeys/Journeys'
import { Slider } from '@mui/base'
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
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={style.homeContainer}>
      <Hero />
      <div className={style.bodyContainer}>
        <About />
        <Offering />
        <div className={style.upcomingSection}>
          <Title text={"Upcoming Events"} />
          <div className={style.events}>
          <section  className={style.comingDesc}>
            <p>
            Discover the excitement that awaits! Explore our handpicked selection of upcoming events and embark on unforgettable journeys with fellow adventurers.
            </p>
          </section>

          {
            recents.length > 0 && (
              // <Slider {...settings}>

              <section className={style.upcoming}>

                {recents.map(event => (
                  <div className={style.cartHod}>
                  <EventCart key={event.id} event={event} />

                   </div>
                ))}
              </section>
              // </Slider>

            )
          }

           </div>
        </div>
        {/* <HomeStories /> */}
        <Journeys/>

        
        <Benefits />
      </div>
    </div>
  )
}

export default Home