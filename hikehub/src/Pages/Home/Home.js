import Benefits from '../../Components/Benefits/Benefits'
import EventCart from '../../Components/EventCart/EventCart'
import Hero from '../../Components/Hero/Hero'
import HomeStories from '../../Components/HomeStories/HomeStories'
import Offering from '../../Components/Offering/Offering'
import Title from '../../Components/Title/Title'
import About from '../../Components/heroAbout/About'
import style from './Home.module.css'
const Home =()=>{

    return (
        <div className={style.homeContainer}>
          <Hero/>
          <div className={style.bodyContainer}>
<About/>
<Offering/>
<div  className={style.upcomingSection}> 
<Title text={"Upcoming Events"}/>
<div className={style.upcoming}>
<EventCart/>
<EventCart/>

</div>


</div>
<HomeStories/>
<Benefits/>
          </div>
        </div>
      )
}

export default Home