import EventNumbers from '../../Components/EventNumbers/EventNumbers'
import Restaurants from '../../Components/Restaurant/Restaurants'
import TitleSection from '../../Components/TitleSection/TitleSection'
import style from './Event.module.css'
import akroum from '../../assets/images/akroum.jpeg'
import Title from '../../Components/Title/Title'
import Details from '../../Components/Details/Details'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../../Utils/AxiosInstance'

const Event = () => {
    const {slug}=useParams()
    console.log(slug)
    const [trail, setTrail] = useState()
    const[event,setEvent]=useState()
    const[availableSeat,setAvailableSeat]=useState()
    const location = useLocation()
    const fetchTrail = async (id) => {
        try {
            const response = await axiosInstance.get(`trail/read/${id}`)
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



    const fetchEvent = async () => {
        console.log("fetchimnnnnnnnnnnnnnnnnnnnnnnnnnngggggg")
        try {
            const response = await axiosInstance.get(`event/slug/${slug}`)
            if (response) {
                setEvent(response.data.event)
                setAvailableSeat(response.data.availableSeats)
                     if (response.data.event && response.data.event.trail) {
                        fetchTrail(response.data.event.trail._id);
                    }
                console.log("eventtttttttttttttttttttttt", response.data.event)
                
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
        fetchEvent()
    }, [slug])

    return (
   event && trail?(
    <div className={style.eventPage}>
    <TitleSection text={trail.title}  date={event.date}/>
    <div className={style.eventHolder}>
        <Details details={event} trail={trail}  seats={availableSeat}/>
        <EventNumbers details={event}  trail={trail} />
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
                <Restaurants type={"Restaurants"} data={event.restaurants} />
            </section>
        </div>

    </div>


</div>
   )
     
:(
    <p>loadingggggggggg...</p>
)
      

    )
}
export default Event