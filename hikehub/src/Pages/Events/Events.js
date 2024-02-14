import style from './Events.module.css'
import TitleSection from '../../Components/TitleSection/TitleSection'
import EventCart from '../../Components/EventCart/EventCart'
const Events=()=>{
    return (
<div className={style.eventsPage}>
<TitleSection text={"Upcoming Hikes"}/>
<div  className={style.eventsBody}>
<section className={style.filterBar}>
    filter and search Bart
    </section>
    <section className={style.events}>
<EventCart/>
<EventCart/>

<EventCart/>
<EventCart/>
<EventCart/>

<EventCart/>
<EventCart/>
<EventCart/>

<EventCart/>
    </section>

</div>
</div>
    )
}

export default Events