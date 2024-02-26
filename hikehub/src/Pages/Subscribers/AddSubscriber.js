import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axiosInstance from '../../Utils/AxiosInstance';
import { toast } from 'react-toastify';
// import "./Add.css"

const ModelAddSubscriber = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email:'',
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
    try {
        const response = await axiosInstance.post('subscribe', formData);
        if (response) {
          toast.success("Subscriber added successfully!");
        } else {
          setMessage(response.data.message)
        }
        onClose();
      } catch (error) {
        console.error('Error adding Subscriber:', error.response);
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

  return (
    <Dialog open={true} onClose={onClose}>
      <Box sx={{ p: 2, width: 400, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#064402' }}>Add Subscriber  </h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={styleField}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ backgroundColor: '#064402', color: 'white', marginTop: '10px', borderRadius: '25px', padding: '10px 20px' }}
            >
              Add Subscriber
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

export default ModelAddSubscriber;