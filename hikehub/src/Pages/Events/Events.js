import style from './Events.module.css'
import TitleSection from '../../Components/TitleSection/TitleSection'
import EventCart from '../../Components/EventCart/EventCart'
import axiosInstance from '../../Utils/AxiosInstance'
import { useEffect, useState } from 'react'
import Filter from '../../Components/FilterBar/Filter'


const Events = () => {
    const [events, setEvents] = useState([])
    const [allEvents, setAll] = useState([])

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get(`event/ongoing`)
            if (response) {
                setEvents(response.data)
                setAll(response.data)
                console.log("Traillllllllssssssssss", response.data)
            }
            else {
                console.log(response)
                console.log("Error fetching events")
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    console.log("eventttttttttttttttts", events)
    return (
        <div className={style.eventsPage}>
            <TitleSection text={"Upcoming Hikes"} />
            <div className={style.eventsBody}>

                <section className={style.events}>
                    {events && events.length > 0 ? (
                        events.map((event, index) => (
                            <EventCart key={index} event={event} />
                        ))
                    )
                    :(
                        <h1>no data</h1>
                    )}
                </section>
                <section className={style.filterContainer}>
                    <Filter allEvents={allEvents} setEvents={setEvents} />
                </section>

            </div>
        </div>
    )
}

export default Events