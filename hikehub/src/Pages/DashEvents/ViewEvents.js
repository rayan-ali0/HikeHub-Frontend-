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
    const event = location.state && location.state.event
    console.log(event)


    useEffect(() => {
        // fetchEvents()
    }, [])

const sendReminder=async(email,name)=>{
    try {
        const response = await axiosInstance.post(`sendEmail`,{name:name,email:email,amount:event.cost}, { withCredentials: true });
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



    return (
        <div className={Style.viewEventPage}>
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
                    event.tools.map((tool,index)=>(
                        <li key={index}>{tool} </li>
                    ))
                }
                </ul>
            </div>
            <div>
                <h1> Meeting Points</h1>
                {
                    event.meetingPoints.map((meetingPoint,index)=>(
                        <section>
                        <h2>{meetingPoint.meetingPoint+" at "+meetingPoint.time}</h2>
                        {meetingPoint.users.map((user,indexx)=>(
<div>
    <span>Participant :{user.user.name} </span>
    <span>Email :{user.user.email} </span>

    <span>Paid :{user.paid?"Yes":"No"} </span>
{!user.paid&&
<button onClick={()=>sendReminder(user.user.email,user.user.name)}>Send reminder</button>}
</div>
                        ))}
                        </section>
                    ))
                }
            </div>
        </div>
    );
};

export default ViewEvent;