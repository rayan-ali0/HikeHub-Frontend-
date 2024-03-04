
import React, { useState, useEffect, useRef } from 'react'
import style from "./EventCart.module.css"
import background from '../../assets/images/background.jpg'
import routes from '../../assets/icons/routes.png'
import seaLevel from '../../assets/icons/sea-level.png'
import activity from '../../assets/icons/activity.png'
import difficulty from '../../assets/icons/adventurer.png'
import Button from '../Button/Button'
import { Link, useNavigate } from 'react-router-dom'
const EventCart = ({ event }) => {
    const navigate = useNavigate()

    const viewDetails = () => {
        navigate(`/event/${event.slug}`, { state: event });
    }
    return (
        <div className={style.eventCart}>
            <section className={style.eventImg} >
                {/* <div className={style.opacity}></div> */}

                <img  src={`${process.env.REACT_APP_BACKEND_PATH}${event.trail.images[4]}`} />

            </section>
            <section className={style.titles}>
                <h3>{event.trail.title+" - "+event.trail.location.name}</h3>
                <h3 className={style.datee}> {event.date.split('T')[0]}</h3>
            </section>
            <section className={style.details}>
                <div className={style.detail}>
                    <img src={routes} className={style.eventIcons} />

                    <p>
                        {event.trail.length} Km
                    </p>
                </div>

                <div className={style.detail}>
                    <img className={style.eventIcons} src={seaLevel} />
                    <p>
                        {event.trail.seaLevel} m
                    </p>
                </div>

                <div className={style.detail}>
                    <img className={style.eventIcons} src={activity} />
                    <p>

                        {event.trail.walkingTime} Hr
                    </p>
                </div>
                <div className={style.detail}>
                    <img className={style.eventIcons} src={difficulty} />
                    <p> {event.trail.difficulty}</p>
                </div>

            </section>
            <div className={style.action}>
                {/* <section className={style.date}>{event.date.split('T')[0]}</section> */}
                <section className={style.btn} onClick={viewDetails}>
                    <Button text={"View Details"} />
                </section>
            </div>


        </div>
    )
}

export default EventCart