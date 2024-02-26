// ViewEvent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import img from '../../assets/images/default.jpg'
import axiosInstance from '../../Utils/AxiosInstance';
import { toast } from 'react-toastify';
import { style } from '@mui/system';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Style from './Events.module.css'
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.minimal.css';

const ViewEvent = () => {
    const location = useLocation()

    const [event, setEventData] = useState()
    const [loading, setLoading] = useState(true)

    // const event = location.state && location.state.event
    console.log(location.state.event._id)


    useEffect(() => {
        fetchEvent()
    }, [])

    const fetchEvent = async () => {
        try {
            const response = await axiosInstance.get(`event/read/${location.state.event._id}`, { withCredentials: true });
            if (response) {
                // toast.success("The User has paid", {
                //     position: "top-center",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     toastId: 3,
                // });
                setEventData(response.data)

                setLoading(false)

            }


        } catch (error) {
            setLoading(false)

            console.error("Error update payment:", error.message);
        }
    }

   

    const sendReminder = async (email, name,type) => {
        try {
            const response = await axiosInstance.post(`sendEmail`, { name: name, email: email, amount: event.cost, type}, { withCredentials: true });
            if (response) {
                toast.success("Email Reminder successfully to this user", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });
                // fetchEvents()
            }


        } catch (error) {
            console.error("Error Sending an email:", error.message);
        }

    }

    const styleField = {
        '& .MuiOutlinedInput-root': {
            borderColor: 'white !important', // Default border color
            color: "white",
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { // More specific selector for focus
                borderColor: 'white !important',
            },
            '& .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
                borderColor: 'white !important',
            },
            '& .MuiInputLabel-root': {
                color: 'white !important'
            },
            '& .MuiSvgIcon-root': {
                color: "white !important"
            },
            '& .MuiTypography-root': {
                color: 'white'
            }
        },
        '& .MuiInputLabel-root': {
            color: 'white', // Set desired label color here
            borderColor: 'white'
        },

    }
    const updatePaid = async (id,email,name,type) => {
        try {
            const response = await axiosInstance.patch(`event/userPaid`, { userId: id, paidStatus: true, eventId: event._id}, { withCredentials: true });
            if (response) {
                toast.success("The User has paid", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });

                fetchEvent()
                sendReminder(email, name, type);

            }


        } catch (error) {
            console.error("Error update payment:", error.message);
        }

    }



    return (

        !loading ? (
            <div className={Style.viewEventPage} >
                <h1>{event.trail.title + "-" + event.date.split('T')[0]}</h1>
                <div>
                    Back Hour : {event.arrivalHr}
                </div>
                <div>
                    Cost : {event.cost}
                </div>
                <div>
                    Status : {event.status}
                </div>
                <div>
                    Max Seat : {event.maxSeats}
                </div>
                <div>
                    Restaurants :
                    <ul>
                        <li>Breakfast: {event.restaurants.breakfast.name} </li>
                        <li>Lunch: {event.restaurants.lunch.name} </li>
                    </ul>
                </div>
                <div>
                    Tools :
                    <ul>
                        {
                            event.tools.map((tool, index) => (
                                <li key={index}>{tool} </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h1> Meeting Points</h1>
                    {
                        event.meetingPoints.map((meetingPoint, index) => (
                            <section>
                                <h2>{meetingPoint.meetingPoint + " at " + meetingPoint.time}</h2>
                                {meetingPoint.users.map((user, indexx) => (
                                    <div>
                                        <span>Participant :{user.user.name} </span>
                                        <span>Email :{user.user.email} </span>

                                        <span>Paid :{user.paid ? "Yes" : "No"} </span>
                                        {!user.paid &&
                                            <button onClick={() => sendReminder(user.user.email, user.user.name,"reminder")}>Send reminder</button>
                                        }
                                        {!user.paid &&
                                            <button onClick={() => updatePaid(user.user._id,user.user.email,user.user.name,"done")}>He Paid</button>
                                        }
                                    </div>
                                ))}
                            </section>
                        ))
                    }
                </div>
            </div >
        ) : (
            <h1>loading..</h1>
        )


    );
};

export default ViewEvent;