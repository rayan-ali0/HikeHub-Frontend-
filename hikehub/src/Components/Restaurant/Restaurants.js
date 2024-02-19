import style from './Restaurants.module.css'
import cutlery from '../../assets/icons/cutlery.png'
import restaurant1 from '../../assets/images/restaurant1.png'
import acropolis from '../../assets/icons/acropolis.png'
import restaurant2 from '../../assets/images/restaurant2.png'

const Restaurants = ({ type, data }) => {
    console.log("dataaaaaaaaaaaaaa", data)
    return (
        <div className={style.restaurantsHolder}>
            <div className={style.sectionTitle}>
                <img src={type === "Restaurants" ? cutlery : acropolis} /> <h1>
                    {type === "Restaurants" ? "Restaurants" : "Sites along the Trail"}    </h1>
            </div>

            {data && type === "Restaurants" && (
                <div className={style.restaurants}>
                    <div className={style.restaurant}>
                        <section className={style.image}>
                            <img src={`http://localhost:5000/${data.breakfast.image}`} />
                        </section>
                        <section className={style.description}>
                            <h1>Breakfast: {data.breakfast.name}</h1>
                            <p>
                                {data.breakfast.description}                            </p>
                        </section>
                    </div>

                    <div className={style.restaurant}>
                        <section className={style.image}>
                            <img src={`http://localhost:5000/${data.lunch.image}`} />
                        </section>
                        <section className={style.description}>
                            <h1>Lunch: {data.lunch.name}</h1>
                            <p>
                                {data.breakfast.description}
                            </p>
                        </section>
                    </div>
                </div>
            )
            }

            {data && type === "Sites" && (
                <div className={style.restaurants}>
                    {data.map((item, index) => (

                        <div className={style.restaurant}>
                            <section className={style.image}>
                                <img src={`http://localhost:5000/${item.image}`} />
                            </section>
                            <section className={style.description}>
                                <h1> {item.name}</h1>
                                <p>
                                    {item.description}                            </p>
                            </section>
                        </div>
                    ))}


                </div>
            )
            }



        </div>

    )
}
export default Restaurants


// meeting_points[]= [{"meeting_point":"location","users":[]},{"meeting_point":"location",time:"8:00",users":[]