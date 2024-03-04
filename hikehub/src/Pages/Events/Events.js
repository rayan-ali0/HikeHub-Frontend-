import style from './Events.module.css'
import TitleSection from '../../Components/TitleSection/TitleSection'
import EventCart from '../../Components/EventCart/EventCart'
import axiosInstance from '../../Utils/AxiosInstance'
import { useEffect, useState } from 'react'
import Filter from '../../Components/FilterBar/Filter'
import noData from '../../assets/images/route.png'

const Events = () => {
    const [events, setEvents] = useState([])
    const [allEvents, setAll] = useState([])
    const [loading, setLoading] = useState(true)
    const [open,setOpen]=useState(false)
    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get(`event/ongoing`)
            if (response) {
                setEvents(response.data)
                setAll(response.data)
                setLoading(false)
            }
            else {
                console.log(response)
                setLoading(false)
                console.log("Error fetching events")
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchEvents()
        console.log("opennnnnnnnnnnnnnnnnnnnn",open)
    }, [])

    return (
        <div className={style.eventsPage}>
            <TitleSection text={"Upcoming Hikes"} />
            {
                !loading ? (
                    <div className={style.eventsBody}>

                        <section className={style.events}>
                            {events && events.length > 0 ? (
                                events.map((event, index) => (
                                    <EventCart key={index} event={event} />
                                ))
                            )
                                : (
                                    <div className={style.notFound}>
                                    {/* <img src={noData}/> */}
                                    <h1> No Events Found!</h1>
                                    </div>

                                )
                            }
                        </section>
                        {/* <section className={`${style.filterContainer} ${open?style.filterContainerClose:style.filterContainerOpen} `}> */}

                        <section className={`${style.filterContainer} ${open?style.filterContainerOpen:style.filterContainerClose} `}>
                            <Filter allEvents={allEvents} setEvents={setEvents} setLoading={setLoading} open={open} setOpen={setOpen}/>
                        </section>

                    </div>
                ) : (
                    <div className={style.loadingDiv}>
                        <h1 className={style.loader}></h1>
                    </div>
                )
            }

        </div>
    )
}

export default Events