// StoryForm.js
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
import Style from './StoriesTable.module.css'
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

const StoryForm = ({ onClose, story, type }) => {
    const [events, setEvents] = useState([])
    const [formData, setFormData] = useState({
        title: story ? story.title : '',
        description: story ? story.description : '',
        images: [null, null, null, null],
        testimonials: story ? story.testimonials : ''
    });
    const [message, setMessage] = useState()

    const handleChange = (e,option,name) => {
        console.log(option)
        console.log(e.target.name)
        if(option && name){
            setFormData((prevData) => ({
                ...prevData,
                [name]: option.value,
            }));
        }
        else{
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }));
        }
      
    };
    console.log("formmmmmm", formData)


    const handleImageChange = (e, index) => {
        const newImagesArray = [...formData.images]; // Create a copy of the images array
        newImagesArray[index] = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            images: newImagesArray,
        }));
        console.log(index)
        console.log(newImagesArray)

    };

    const handleEdit = async () => {
        console.log("edit", formData)
        try {
            const response = await axiosInstance.patch(`story/update/${story._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
                ,
                { withCredentials: true }
            );
            // Close the form after successful add
            if (response) {
                toast.success("story edited successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });

                onClose()
            }
        } catch (error) {
            // setMessage( error.response.data.error)
            console.error('Error editing story:', error);
            // Handle error (show error message, etc.)
        }
    }

    const handleAdd = async (data) => {
        try {
            const response = await axiosInstance.post(`story/create`, formData, {
                headers: { "Content-Type": 'multipart/form-data' }
            }
                ,
                { withCredentials: true }
            );
            // Close the form after successful add
            if (response) {
                toast.success("story Added successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });

                onClose()
            }
        } catch (error) {
            setMessage(error.response)
            console.error('Error adding story:', error.response);
            // Handle error (show error message, etc.)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("dormmmmmmmmmmmmmmmmmm", formData)
        if (type === "Add") {
            handleAdd()
        }
        else if (type === "Edit") {
            handleEdit()
        }

    };

    const handleDelete = async () => {

        try {
            const response = await axiosInstance.delete(`story/delete/${story._id}`, { withCredentials: true });
            if (response) {
                toast.success("story deleted successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });

                onClose()
                // fetchSites()
            }


        } catch (error) {
            setMessage(error.response)

            console.error("Error deleting item:", error.message);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get(`event/read`, { withCredentials: true });
            if (response) {
                const eventsData = response.data.map(event => ({
                    label: event.trail.title+","+event.date.split('T')[0],
                    value: event._id
                  }))
                  setEvents(eventsData)
            }


        } catch (error) {
            setMessage(error.response)

            console.error("Error deleting item:", error.message);
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <Dialog open={true} onClose={onClose}>
            <Box sx={{ p: 2, width: 450, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>{type + " "}Story</h2>
                {(type === "Add" || type === "Edit") && (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            placeholder="Enter service name"
                        />

                        <Autocomplete
                            className={style.inputs}
                            disablePortal
                            id="combo-box-demo"
                            options={events}
                            // sx={styleField}
                            // value={story.eventId._id||''}
                            disableClearable
                            name="eventId"
                            onChange={(e, option) => handleChange(e, option,"eventId")}
                            renderInput={(params) => (
                                <TextField {...params} label="Event" />
                            )}
                            renderOption={(props, option) => (
                                <li {...props} >
                                    {
                                        option.label
                                    }
                                </li>
                            )}
                        />

                        <TextField
                            label="Description"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            placeholder="Enter service description"
                            inputProps={{
                                maxLength: 178,
                            }}
                            multiline
                            rows={4}
                        />
                        <div className={Style.imgHolder}>
                            {
                                formData.images.map((image, index) => (
                                    <div
                                        className={Style.storyImg}
                                    >

                                        <input
                                            className={Style.inputFile}
                                            accept="image/*"
                                            type="file"
                                            name="image"
                                            onChange={(e) => handleImageChange(e, index)}
                                        />
        
                                        {
                                            type === "Edit" && (
                                                <img
                                                    className={Style.imgg}
                                                    key={index}
                                                    src={
                                                       
                                                        image
                                                            ? 
                                                            URL.createObjectURL(image)
                                                            :
                                                             `${process.env.REACT_APP_BACKEND_PATH}${story.images[index]}`
                                                    }
                                                    alt={"new image"}

                                                />
                                            )
                                        }
                                        {
                                            type === "Add" && (
                                                <img
                                                    className={Style.imgg}
                                                    key={index}
                                                    src={
                                                        image
                                                            ? URL.createObjectURL(image)
                                                            : img
                                                    }
                                                    alt={formData.title}

                                                />
                                            )
                                        }
                                    </div>

                                ))
                            }
                        </div>
                        {/* <img
                            style={{
                                margin: "1rem auto",
                            }}

                            src={
                                formData.image && (type === "Add" || type === "Edit")
                                    ? URL.createObjectURL(formData.image)
                                    : type === "Edit" ? `${process.env.REACT_APP_BACKEND_PATH}${story.image}`
                                        : img
                            } alt={formData.title}
                            width={"100%"}
                            height={"250px"}
                        /> */}
                        {/* <input
                            accept="image/*"
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        /> */}

                        <Button
                            variant="contained"
                            type="submit"
                            style={{ backgroundColor: '#163357', color: 'white', marginTop: '10px' }}
                        >
                            {type + " "} Story
                        </Button>
                    </form>
                )}

                {
                    type === "Delete" && (
                        <>
                            <p> Are You Sure Delete {story?.name}</p>
                            <Button
                                variant="contained"
                                onClick={handleDelete}
                                style={{ backgroundColor: '#064402', color: 'white', marginTop: '10px', borderRadius: '25px', padding: '10px 20px' }}
                            >
                                Confirm
                            </Button>
                        </>

                    )
                }
                <Button
                    variant="contained"
                    onClick={onClose}
                    style={{ backgroundColor: '#064402', color: 'white', marginTop: '10px', borderRadius: '25px', padding: '10px 20px' }}
                >
                    Cancel
                </Button>
                {message && <p>{message}</p>}

            </Box>
        </Dialog>
    );
};

export default StoryForm;