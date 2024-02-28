import React, { useState, useEffect, useContext } from 'react';
import Styles from "./Book.module.css";
import axios from 'axios';
import { UserContext } from "../../Context/UserContext"
import axiosInstance from '../../Utils/AxiosInstance'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const Book = ({ setBook, event, setBookStatus }) => {
    const location = useLocation()
    console.log(location.pathname)
    const { user } = useContext(UserContext); // Assuming your context provides userId
    const [error, setError] = useState(false)
    const [confirmation, setConfirmation] = useState(false)
    const [formData, setFormData] = useState({
        userId: user ? user._id : null,
        eventId: event._id,
        meetingPoint: ''
    });

    console.log("addddddddddddddddddddddddd")
    /////////////////////////////////////////////////
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submittt")
        try {
            const response = await axiosInstance.put(`event/addUser`, formData)
            if (response.status === 200 && response.data.status !== 'error') {
                setFormData({
                    userId: user ? user._id : null,
                    eventId: '',
                    meetingPoint: ''
                });
                toast.success("You Bookedd Successfully")
                setBookStatus("Booked!")
                setBook(false)
            }
            else {
                console.log(response.data.message)
                toast.error(response.data.message || "Error during booking. Please try again.")
            }
        } catch (error) {
            console.log(error.message)
        }
    };
    const confirmBook = (e) => {
        e.preventDefault();
        if (user) {
            setConfirmation(true)
            // handleSubmit(e)
        }
        else {
            setError(true)
        }
    }

    const onclose = () => {
        setBook(false)
    }
    const navigate = useNavigate()
    const redirectToSignIn = () => {
        const currentPath = location.pathname;
        navigate('/signin', { state: { redirect: currentPath } });
    };


    return (

        user && user.role === "organizer" ? (
            <div className={Styles.container}>
                <h2 className={Styles.h2}>{"You Are An Organizer"}</h2>
                <button className={Styles.cancelButton} onClick={onclose}>Cancel</button>
            </div>

        ) : (
            <>
                <div className={Styles.overlay}></div>
                <div className={Styles.container}>
                    <h2 className={Styles.h2}>{!confirmation ? "Book Your Seat" : "Please Confirm Your booking"}</h2>
                    {
                        confirmation ? (
                            <form onSubmit={handleSubmit}>
                                {/* <h4 className={Styles.h2}>Please Confirm Your booking</h4> */}
                                <button className={Styles.submitButton}>Confirm</button>
                            </form>
                        ) : (
                            <form onSubmit={confirmBook}>
                                <div className={Styles.formGroup}>
                                    <label className={Styles.label}>Meeting Point:</label>
                                    <select
                                        name="meetingPoint" // Change name to "category"
                                        value={formData.meetingPoint} // Update value to formData.category
                                        onChange={handleChange}
                                        className={Styles.inputField}
                                        required
                                    >
                                        <option value="">Choose Your Meeting Point</option>
                                        {event.meetingPoints.map(point => (
                                            <option key={point.meetingPoint} value={point.meetingPoint}>{point.meetingPoint + " at " + point.time}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className={Styles.submitButton}>Book</button>
                                {error && <p className={Styles.errorText}>You Have To <a onClick={redirectToSignIn}> Log In</a> </p>}
                            </form>
                        )
                    }


                    <button className={Styles.cancelButton} onClick={onclose}>Cancel</button>
                </div>
            </>
        )


    );
};

export default Book;