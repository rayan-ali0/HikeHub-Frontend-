// SiteForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import img from '../../assets/images/default.jpg'
import axiosInstance from '../../Utils/AxiosInstance';
import { toast } from 'react-toastify';
import { style } from '@mui/system';
import styles from "../Trails/Trails.module.css";
import Style from './Sites.module.css'

const SiteForm = ({ onClose, fetchUpdatedData, site, type }) => {
    console.log("soteeeee", site)
    const [formData, setFormData] = useState({
        name: site ? site.name : '',
        description: site ? site.description : '',
        image: null,
    });
    const [message, setMessage] = useState()

    const { name, description, image } = formData

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleEdit = async (data) => {
        console.log(data)
        try {
            const response = await axiosInstance.patch(`site/update/${site._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
                ,
                { withCredentials: true }
            );
            // Close the form after successful add
            if (response) {
                toast.success("Site edited successfully", {
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
            onClose();
        } catch (error) {
            // setMessage( error.response.data.error)
            console.error('Error editing site:', error);
            // Handle error (show error message, etc.)
        }
    }

    const handleAdd = async (data) => {

        try {
            const response = await axiosInstance.post(`site/create`, formData, {
                headers: { "Content-Type": 'multipart/form-data' }
            }
                ,
                { withCredentials: true }
            );
            // Close the form after successful add
            if (response) {
                toast.success("Site deleted successfully", {
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
            onClose();
        } catch (error) {
            setMessage(error.response)
            console.error('Error adding site:', error.response);
            // Handle error (show error message, etc.)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formDataToSend = new FormData();
        // formDataToSend.append('name', name);
        // formDataToSend.append('description', description);
        // if (image != null) {
        //     formDataToSend.append('image', image);
        // }
        // console.log(formDataToSend)
        console.log(formData)
        if (type === "Add") {
            handleAdd()
        }
        else if (type === "Edit") {
            handleEdit()
        }

    };

    const handleDelete = async () => {

        try {
            const response = await axiosInstance.delete(`site/delete/${site._id}`, { withCredentials: true });
            if (response) {
                toast.success("Site deleted successfully", {
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

    return (
        <Dialog open={true} onClose={onClose}>
            <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>{type + " "}Site</h2>
                {(type === "Add" || type === "Edit") && (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            placeholder="Enter service name"
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


                        {/* {type === "Edit" && (
                <img
                  style={{
                    margin: "1rem auto",
                  }}
                  src={
                    formData.image
                      ? 
                      URL.createObjectURL(formData.image)
                      : `${process.env.REACT_APP_BACKEND_PATH}${site.image}`
                  }
                  alt={formData.title}
                  width={"100%"}
                  height={"300px"}
                />
              )}

{type === "Add" && (
                <img
                  style={{
                    margin: "1rem auto",
                  }}
                  src={
                    formData.image
                      ? 
                      URL.createObjectURL(formData.image)
                      :img
                  }
                  alt={formData.title}
                  width={"100%"}
                  height={"300px"}
                />
              )} */}

                        <img
                            style={{
                                margin: "1rem auto",
                            }}

                            src={
                                formData.image && (type === "Add" || type === "Edit")
                                    ? URL.createObjectURL(formData.image)
                                    : type === "Edit" ? `${process.env.REACT_APP_BACKEND_PATH}${site.image}`
                                        : img
                            } alt={formData.title}
                            width={"100%"}
                            height={"250px"}
                        />
                        <input
                            accept="image/*"
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        />

                        <Button
                            sx={{
                                color: 'white',
                                cursor: 'pointer',
                                width: 'auto',
                                height: '2.8rem',
                                fontSize: '1em',
                                backgroundColor: '#064402',
                                borderRadius: '25px', // assuming this overrides the inline style
                                border: '1px solid #386935', // Change to your desired border color
                                fontWeight: 'bold',
                                padding: '15px',
                                marginTop: '10px',
                                '&:hover': {
                                    backgroundColor: '#064402',
                                    // border: '1px solid #386935',
                                },
                            }} variant="contained"
                            type="submit"
                            className={styles.btnAdd}
                            style={{ marginTop: '10px', width: "100%" }}
                        >
                            {type + " "} Site
                        </Button>
                    </form>
                )}

                {
                    type === "Delete" && (
                        <div className={Style.delete}>
                            <p> Are You Sure Delete {site?.name}</p>
                            <Button
                                variant="contained"
                                onClick={handleDelete}
                                style={{ backgroundColor: '#064402', color: 'white', marginTop: '10px', borderRadius: '25px', padding: '10px 20px', width: "100%" }}
                            >
                                Confirm
                            </Button>
                        </div>

                    )
                }
                <Button
                    variant="contained"
                    onClick={onClose}
                    style={{ backgroundColor: '#064402', color: 'white', marginTop: '10px', borderRadius: '25px', padding: '10px 20px', width: "100%" }}
                >
                    Cancel
                </Button>
                {message && <p>{message}</p>}

            </Box>
        </Dialog>
    );
};

export default SiteForm;