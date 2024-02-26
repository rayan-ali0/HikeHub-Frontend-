import { useState, useContext, useEffect } from 'react';
import style from './Details.module.css'
import akroum from '../../assets/images/akroum.jpeg'
import Book from './Book';
import { UserContext } from "../../Context/UserContext"


const Details = ({ details, seats, trail }) => {
    const [book, setBook] = useState(false)
    const { user } = useContext(UserContext); // Assuming your context provides userId
    const [activeLink, setActiveLink] = useState('description');
    console.log("detailllllllllllllllllllls", details)
    const [bookStatus, setBookStatus] = useState()
    const [data, setData] = useState({
        description: trail.description || null,
        meetingPoints: details.meetingPoints || [],
        tools: details.tools || [],
        conditions: ["Participants must complete the registration process at least 2 days before the scheduled hiking event."
            ,
            'Payment for the hiking event must be made in full at least 1 day before the scheduled date.'
            , 'Cancellations are not allowed within 2 days of the scheduled event.',
            'Participants must provide advance notice of at least 2 days if they need to cancel their registration.']
    })

    console.log(data.meetingPoints[0].meetingPoint)

    useEffect(() => {
        if (seats === 0) {
            setBookStatus("Fully Booked")

        }
        else if (user) {
            const isUserAlreadyAssigned = details.meetingPoints.some(point =>
                point.users.some(user1 => user1.user.toString() === user._id)
            );
            if (isUserAlreadyAssigned) {
                setBookStatus("Booked!")
            }
        }


    }, [])
    return (
        <div className={style.detailsHolder}>
            <section className={style.details}>

                <ul className={style.detailsUls}>
                    <li onClick={() => setActiveLink('description')} className={activeLink === 'description' ? style.active : style.inactive}>
                        Description
                    </li>
                    <li onClick={() => setActiveLink('meetingPoints')} className={activeLink === 'meetingPoints' ? style.active : style.inactive}>
                        Meeting Points
                    </li>
                    <li onClick={() => setActiveLink('tools')} className={activeLink === 'tools' ? style.active : style.inactive}>
                        Tools
                    </li>
                    <li onClick={() => setActiveLink('conditions')} className={activeLink === 'conditions' ? style.active : style.inactive}>
                        Conditions
                    </li>
                </ul>
                <div className={style.liValue}>
                    {Array.isArray(data[activeLink]) && activeLink !== "meetingPoints" ? (
                        <ul className={style.dotsUl}>


                            {data[activeLink].map((item, index) => (
                                <li className={style.valueLists}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : !Array.isArray(data[activeLink]) && activeLink !== "meetingPoints" ? (

                        <p>
                            {data[activeLink]+"Darb El Mseilha, also known as the Mseilha Walkway, is a captivating hiking trail offering stunning scenery and historical charm in the Batroun region of Lebanon. Winding alongside the Nahr el-Joz river, the trail unveils enchanting landscapes."}
                        </p>
                    )
                        : activeLink === "meetingPoints" && (
                            <ul className={style.dotsUl}>
                                {data.meetingPoints.map((item, index) => (
                                    <li key={index} className={style.valueLists}>
                                        {item.meetingPoint} at {item.time}
                                    </li>
                                ))}
                            </ul>
                        )}

                </div>
                <div className={style.bookSection}>

                    {
                        !bookStatus ? (
                            <button onClick={() => setBook(true)}>Book Your Seat</button>
                        ) : (
                            <button disabled>{bookStatus}</button>
                        )}
                </div>

            </section>
            <section className={style.detailsImg}>
                <img src={`http://localhost:5000/${trail.images[1]}`} className={style.img} />
            </section>
            {book && <Book book={book} setBook={setBook} event={details} setBookStatus={setBookStatus} />}
        </div>
    )
}

export default Details