import EventNumbers from '../../Components/EventNumbers/EventNumbers'
import Restaurants from '../../Components/Restaurant/Restaurants'
import TitleSection from '../../Components/TitleSection/TitleSection'
import style from './Event.module.css'
import akroum from '../../assets/images/akroum.jpeg'
import Title from '../../Components/Title/Title'
import Details from '../../Components/Details/Details'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../../Utils/AxiosInstance'

const Event = () => {
    const [trail, setTrail] = useState({})
    const location = useLocation()
    const eventDetails = location.state && location.state
    console.log(location.state)

    const fetchTrail = async () => {
        try {
            const response = await axiosInstance.get(`trail/read/${eventDetails.trail._id}`)
            if (response) {
                setTrail(response.data)
                console.log("Traillllllll", response.data)
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
        fetchTrail()
    }, [])

    return (
        <div className={style.eventPage}>
            <TitleSection text={trail.title} />
            <div className={style.eventHolder}>
                <Details details={eventDetails} />
                <EventNumbers details={eventDetails} />
                {trail && trail.images && trail.images.length > 0 && (
                    <div className={style.captures}>
                        <Title text={"Journey Captures"} />
                        <div className={style.eventImages}>
                            {trail.images.map((image, index) => (
                                <img src={`http://localhost:5000/${image}`} className={style.eventImg} />
                            ))}
                        </div>
                    </div>
                )}


                <div className={style.additionalData}>
                    <section className={style.sites}>
                        <Restaurants type={"Sites"} data={trail.sites} />
                    </section>

                    <section className={style.restaurants}>
                        <Restaurants type={"Restaurants"} data={eventDetails.restaurants} />
                    </section>
                </div>

            </div>


        </div>

    )
}
export default Event