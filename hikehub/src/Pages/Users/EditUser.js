import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axiosInstance from '../../Utils/AxiosInstance';
import { toast } from 'react-toastify';
import { style } from '@mui/system';
// import "./Add.css"
import img from '../../assets/images/default.jpg'

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ModelEditUser = ({ onClose ,userData}) => {
  const [formData, setFormData] = useState({
    image:null
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
        const response = await axiosInstance.put(`user/${userData._id}`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
            ,
            { withCredentials: true }
        );
        if (response) {
          toast.success("User Edited successfully!");
        } else {
          setMessage(response.data.message)
        }
        onClose();
      } catch (error) {
        console.error('Error Editin user Role:', error.response);
      }

  };


  const styleField = {
    '& .MuiOutlinedInput-root': {
      borderColor: 'gray', // Default border color
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { // More specific selector for focus
        borderColor: 'gray',
      },
      '&.Mui-focused .MuiInputLabel-root': { // Target the label when focused
        color: 'gray', // Change label color to gray on focus
      },
      '&:hover .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
        borderColor: 'gray',
      },
      '& .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
        borderColor: 'gray',
      },
      '& .MuiInputLabel-root': {
        color: 'gray'
      },
      '&:focus .MuiInputLabel-root': {
        color: 'gray'
      },
      '& .MuiInputLabel-root': {
        color: 'gray',
        '&.Mui-focused': {
          color: 'gray',
          borderColor: 'gray' // Set label color to gray when focused
        },
      },
    },

    '& .MuiInputLabel-root': {
      color: 'gray', // Set desired label color here
      borderColor: 'gray'
    },

  }

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
        ...prevData,
        image: e.target.files[0],
    }));
};


  return (
    <Dialog open={true} onClose={onClose}>
      <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#064402' }}>Add Subscriber  </h2>
          <form onSubmit={handleSubmit}>

           <FormControl fullWidth>
            <InputLabel id="roleLabel">Role</InputLabel>
            <Select
              name="role"
              label="Role"
              defaultValue={userData.role}
              onChange={handleChange}
              labelId="roleLabel"
              fullWidth
            >
              <MenuItem value={"organizer"}>Organizer</MenuItem>
              <MenuItem value={"user"}>Normal User</MenuItem>
            </Select>
          </FormControl>
          <img
                            style={{
                                margin: "1rem auto",
                            }}

                            src={
                                formData.image ? URL.createObjectURL(formData.image)
                                    : userData.image?`${process.env.REACT_APP_BACKEND_PATH}${userData.image}`   :img                         } alt={formData.title}
                            width={"100%"}
                            height={"250px"}
                        />
                        <input
                            accept="image/*"
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        />
          
          </form>
          <div className={style.confirmation}>
            <p>PS: when setting a user as a organizer You are giving him authorization as a team member</p>
          </div>
          <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ backgroundColor: '#064402', color: 'white', marginTop: '10px', borderRadius: '25px', padding: '10px 20px' }}
            >
            Edit User Role
            </Button>
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

export default ModelEditUser;