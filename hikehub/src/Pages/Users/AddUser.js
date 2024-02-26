// AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import img from '../../assets/images/default.jpg'
import axiosInstance from '../../Utils/AxiosInstance';
import { toast } from 'react-toastify';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


const AddUser = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        phone: ''
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`user/register`, formData, {
                headers: { "Content-Type": 'multipart/form-data' }
            }
                ,
                { withCredentials: true }
            );
            // Close the form after successful add
            if (response) {
                toast.success("User added successfully", {
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
            console.error('Error adding User:', error.response);
            // Handle error (show error message, etc.)
        }
    }


    return (
        <Dialog open={true} onClose={onClose}>
            <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#163357' }}>Add User</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            placeholder="Enter user name"
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            placeholder="Enter user email"
                            required
                        />
                        <TextField
                            label="Phone"
                            type="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            placeholder="Enter user Phone"
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            placeholder="Enter user password"
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel id="roleLabel">Role</InputLabel>
                            <Select
                                name="role"
                                label="Role"
                                defaultValue={formData.role}
                                onChange={handleChange}
                                labelId="roleLabel"
                                fullWidth
                            >
                                <MenuItem value="">Select Role</MenuItem>
                                <MenuItem value={"organizer"}>Organizer</MenuItem>
                                <MenuItem value={"user"}>Normal User</MenuItem>
                            </Select>
                        </FormControl>
                        <img
                            style={{
                                margin: "1rem auto",
                            }}

                            src={
                                formData.image ? URL.createObjectURL(formData.image) : img
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
                            Add User
                        </Button>
                    </form>
            

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

export default AddUser;