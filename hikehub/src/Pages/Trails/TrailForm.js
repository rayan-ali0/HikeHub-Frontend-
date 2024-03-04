// TrailForm.js
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
import Style from './Trails.module.css'
import InputAdornment from '@mui/material/InputAdornment';
import './form.css'
const TrailForm = () => {
    const [locations, setLocations] = useState([])
    const [sites, setSites] = useState([])
    const [count, setCount] = useState(5)
    const [formData, setFormData] = useState({
        images: [null, null, null, null, null],
        // image1:'',
        // image2:'',
        // image3:'',
        // image4:'',
        // image5:'',
        difficulty: ''
    });

    const handleChange = (e, value, field) => {
        if (field === "location") {
            // Handling location as a single value
            setFormData((prevData) => ({
                ...prevData,
                [field]: value ? value.value : null,
            }));
        } else if (field === "sites") {
            // Handling sites as an array of values
            setFormData((prevData) => ({
                ...prevData,
                [field]: value.map((option) => option.value),
            }));
        } else {
            // Handling other form fields
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        console.log(formData)
    }


    const handleImageChange = (e, index) => {
        console.log(index)
        console.log(e.target.name)
        const newImagesArray = [...formData.images]; // Create a copy of the images array
        console.log(newImagesArray.length)
        if (index + 1 > newImagesArray.length) {
            newImagesArray.push(e.target.files[0]);
        }
        else {
            newImagesArray[index] = e.target.files[0];
        }

        setFormData((prevData) => ({
            ...prevData,
            images: newImagesArray,
        }));
        console.log(formData)

        // setFormData((prevData) => ({
        //         ...prevData,
        //         [e.target.name]: e.target.files[0],
        //     }));
    };

    const fetchLocation = async () => {
        try {
            const response = await axiosInstance.get(`location/read`, { withCredentials: true });
            if (response) {
                const locationData = response.data.map(location => ({
                    label: location.name,
                    value: location._id
                }))
                setLocations(locationData)
            }

        } catch (error) {

            console.error("Error deleting item:", error.message);
        }
    }
    const fetchSites = async () => {
  
        // dataTosend.append('walkingTime',formData.walkingTime)

        try {
            const response = await axiosInstance.get(`site/read`, { withCredentials: true });
            if (response) {
                const sitesData = response.data.map(site => ({
                    label: site.name,
                    value: site._id
                }))
                setSites(sitesData)
            }

        } catch (error) {

            console.error("Error deleting item:", error.message);
        }
    }

    const handleAdd = async () => {
        // console.log(formData)
        // const dataTosend = new FormData();

        // // Add text fields
        // dataTosend.append('title', formData.title);
        // dataTosend.append('length', formData.length);
        // dataTosend.append('location', formData.location);
        // dataTosend.append('seaLevel', formData.seaLevel);
        // dataTosend.append('walkingTime', formData.walkingTime);
        // dataTosend.append('difficulty', formData.difficulty);
        // dataTosend.append('description', formData.description);
        // dataTosend.append('sites', JSON.stringify(formData.sites));
    
        // // Add image files
        // formData.images.forEach((image, index) => {
        //     dataTosend.append(`images[${index}]`, image);
        // });
        // console.log(dataTosend)
        try {
            
            const response = await axiosInstance.post(`trail/create`, formData, {
                headers: { "Content-Type": 'multipart/form-data' }
            }
                ,
                { withCredentials: true });
            if (response) {
                toast.success("Trail Added successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: 3,
                });
                setFormData({
                    difficulty: '',
                    images: [null, null, null, null, null]

                })
                setCount(5)
            }

        } catch (error) {

            console.error("Error adding item:", error.message);
        }

    }

    useEffect(() => {
        fetchLocation()
        fetchSites()
    }, [])



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
        <div className={Style.addForm} >
            <section className={`${Style.addFormSection}  ${Style.titleForm}`}>
                <h1> Add A Trail</h1>

            </section>
            <section className={`${Style.addFormSection}  ${Style.datasection}`}>
                <form className={` ${Style.inputsForm}`}>

                    <TextField
                        label="Title"
                        type="text"
                        name="title"
                        // value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        placeholder="Enter service name"
                        sx={styleField}
                    />

                    <div className={Style.nbsSection}>

                        <TextField id="length" label="Length" name="length" type="number" variant="outlined" required

                            onChange={handleChange}
                            sx={styleField}
                            // className={style.volumeInput}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Km</InputAdornment>,
                            }}
                        />

                        <TextField id="walkingTime" label="Walking Time" name="walkingTime" type="number" variant="outlined" required

                            onChange={handleChange}
                            sx={styleField}
                            // className={style.volumeInput}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">H</InputAdornment>,
                            }}
                        />
                        <TextField id="seaLevel" label="Sea Level" name="seaLevel" type="number" variant="outlined" required

                            onChange={handleChange}
                            sx={styleField}
                            // className={style.volumeInput}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">m</InputAdornment>,
                            }}
                        />
                    </div>

                    <FormControl fullWidth sx={styleField}
                    >
                        <InputLabel id="difficulty"
                        >Difficulty</InputLabel>
                        <Select
                            name="difficulty"
                            label="Difficulty"
                            value={formData.difficulty || ''}
                            onChange={handleChange}
                            labelId="difficulty"
                            fullWidth
                        >
                            <MenuItem value=''>Difficulty</MenuItem>
                            <MenuItem value={"Easy"}>Easy</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Hard"}>Hard</MenuItem>
                        </Select>
                    </FormControl>

                    <Autocomplete
                        // className={style.inputs}
                        disablePortal
                        id="combo-box-demo"
                        options={locations}
                        sx={styleField}
                        // value={story.eventId._id||''}
                        disableClearable
                        name="eventId"
                        onChange={(e, option) => handleChange(e, option, "location")}
                        renderInput={(params) => (
                            <TextField {...params} label="Location" />
                        )}
                        renderOption={(props, option) => (
                            <li {...props} >
                                {
                                    option.label
                                }
                            </li>
                        )}
                    />

                    <Autocomplete
                        // className={style.inputs}
                        disablePortal
                        id="combo-box-demo"
                        options={sites}
                        sx={styleField}
                        // value={story.eventId._id||''}
                        disableClearable
                        multiple
                        name="sites"
                        onChange={(e, options) => handleChange(e, options, "sites")}
                        renderInput={(params) => (
                            <TextField {...params} label="Sites" />
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
                        // value={formData.description |}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        placeholder="Enter service description"
                        inputProps={{
                            maxLength: 560,
                        }}
                        multiline
                        rows={5}
                        sx={styleField}

                    />
                </form>
                <div className={` ${Style.imagesForm}`} >
                    {Array.from({ length: count }, (_, index) => (
                        <div key={index} className={Style.storyImg}>
                            <input
                                className={Style.inputFile}
                                accept="image/*"
                                type="file"
                                name={`images`}
                                onChange={(e) => handleImageChange(e, index)}
                            />
                            <img
                                className={Style.imgg}
                                src={

                                    formData.images[index+1]
                                        ? URL.createObjectURL(formData.images[index+1])
                                        : img
                                }
                                alt={"new image"}
                            />
                        </div>
                    ))}



                </div>
            </section>
            <section>
                <button
                    className={Style.btnAdd}
                    onClick={handleAdd}
                >
                    Add Trail
                </button>
            </section>
            {/* <section  className={`${Style.addFormSection}  ${Style.inputsForm}`}> */}
            {/* <form onSubmit={handleSubmit}> */}


            {/* </section> */}
        </div>
    );
};

export default TrailForm;