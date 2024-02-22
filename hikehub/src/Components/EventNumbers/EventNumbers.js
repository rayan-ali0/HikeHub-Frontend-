// import Restaurants from '../../Components/Restaurant/Restaurants'
// import TitleSection from '../../Components/TitleSection/TitleSection'
import style from './EventNumbers.module.css'
import clock from '../../assets/icons/back-in-time.png'
import adventurer from '../../assets/icons/adventurer.png'
import routes from '../../assets/icons/routes.png'
import seaLevel from '../../assets/icons/sea-level.png'
import activity from '../../assets/icons/activity.png'
const EventNumbers = ({details,trail}) => {
    return (
        <div className={style.numbers}>
        
<section className={style.number}>
<img src={adventurer}/>
<h3>
    {trail.difficulty}
</h3>
<h5>Difficulty</h5>
</section>

<section className={style.number}>
<img src={clock}/>
<h3>
{details.meetingPoints[0].time} 
 am
</h3>
<h5>departure</h5>
</section>
<section className={style.number}>
<img src={activity}/>
<h3>
{trail.walkingTime} h
</h3>
<h5>Of Walking</h5>
</section>
<section className={style.number}>
<img src={routes}/>
<h3>
{trail.length}km
</h3>
<h5>Distance</h5>
</section>
<section className={style.number}>
<img src={seaLevel}/>
<h3>
{trail.seaLevel}
</h3>
<h5>Elevation</h5>
</section>
        </div>

    )
}
export default EventNumbers