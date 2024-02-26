// RestaurantForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import img from '../../assets/images/default.jpg'
import axiosInstance from '../../Utils/AxiosInstance';
import { toast } from 'react-toastify';

const RestaurantForm = ({ onClose, restaurant, type }) => {
    console.log("ress", restaurant)
    const [formData, setFormData] = useState({
        name: restaurant ? restaurant.name : '',
        description: restaurant ? restaurant.description : '',
        image: null,
    });
    const [message, setMessage] = useState()

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

    const handleEdit = async () => {
        try {
            const response = await axiosInstance.patch(`restaurant/update/${restaurant._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
                ,
                { withCredentials: true }
            );
            // Close the form after successful add
            if (response) {
                toast.success("restaurant edited successfully", {
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
            console.error('Error editing restaurant:', error);
            // Handle error (show error message, etc.)
        }
    }

    const handleAdd = async (data) => {
        try {
            const response = await axiosInstance.post(`restaurant/create`, formData, {
                headers: { "Content-Type": 'multipart/form-data' }
            }
                ,
                { withCredentials: true }
            );
            // Close the form after successful add
            if (response) {
                toast.success("restaurant deleted successfully", {
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
            console.error('Error adding restaurant:', error.response);
            // Handle error (show error message, etc.)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("dormmmmmmmmmmmmmmmmmm",formData)
        if (type === "Add") {
            handleAdd()
        }
        else if (type === "Edit") {
            handleEdit()
        }

    };

    const handleDelete = async () => {

        try {
            const response = await axiosInstance.delete(`restaurant/delete/${restaurant._id}`, { withCredentials: true });
            if (response) {
                toast.success("restaurant deleted successfully", {
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
                <h2 style={{ color: '#163357' }}>{type + " "}Restaurant</h2>
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

                        <img
                            style={{
                                margin: "1rem auto",
                            }}

                            src={
                                formData.image && (type === "Add" || type === "Edit")
                                    ? URL.createObjectURL(formData.image)
                                    : type === "Edit" ? `${process.env.REACT_APP_BACKEND_PATH}${restaurant.image}`
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
                            variant="contained"
                            type="submit"
                            style={{ backgroundColor: '#163357', color: 'white', marginTop: '10px' }}
                        >
                            {type + " "} restaurant
                        </Button>
                    </form>
                )}

                {
                    type === "Delete" && (
                        <>
                            <p> Are You Sure Delete {restaurant?.name}</p>
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

export default RestaurantForm;