
import React, { useState, useEffect, useRef } from 'react'
import style from "./EventCart.module.css"
import background from '../../assets/images/background.jpg'
import routes from '../../assets/icons/routes.png'
import seaLevel from '../../assets/icons/sea-level.png'
import time from '../../assets/icons/back-in-time.png'
import difficulty from '../../assets/icons/adventurer.png'


const EventCart=()=>{



    return(
<div className={style.eventCart}>
<img src={background} className={style.eventImg}/>
<section className={style.details}>
<div className={style.detail}>
<img src={routes} className={style.eventIcons}/>

<p>
100 Km
</p>
</div>

<div className={style.detail}>
    <img className={style.eventIcons} src={seaLevel}/>
    
    <p>
    500 m
</p>
</div>

<div className={style.detail}>
<img className={style.eventIcons} src={time}/>
<p>
    4 Hr
</p>
</div>
<div className={style.detail}>
<img className={style.eventIcons} src={difficulty}/>
   <p>Easy</p>
   </div>

</section>
<section className={style.date}>10-3-2024</section>

</div>
    )
}

export default EventCart