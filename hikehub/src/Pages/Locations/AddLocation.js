import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Input } from '@mui/material';
import axiosInstance from '../../Utils/AxiosInstance';
import { toast } from 'react-toastify';
import "./Add.css"

const ModelAddLocation = ({ onClose, setIsAddFormOpen, type, location }) => {
  const [formData, setFormData] = useState({
    name: location ? location.name : '',
    id: location && location._id
  });
  const [message, setMessage] = useState(null);
  console.log(type)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`location/delete/${location._id}`, { withCredentials: true });
      if (response) {
        toast.success("Location deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId: 3,
        });
      }
      onClose()
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const createLocation = async () => {
    try {
      const response = await axiosInstance.post('location/create', formData);
      if (response) {
        toast.success("Location added successfully!");
      } else {
        setMessage(response.data.message)
      }
      onClose();
    } catch (error) {
      console.error('Error adding model:', error.response.data.error);
    }
  }
  const editLocation = async () => {
    try {
      const response = await axiosInstance.patch(`location/update/${location._id}`, formData);
      if (response) {
        toast.success("Location added successfully!");
      } else {
        setMessage(response.data.message)
      }
      onClose();
    } catch (error) {
      console.error('Error adding model:', error.response.data.error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Add") {
      createLocation()
      console.log("add")
    }
    else if (type === "Edit") {
      editLocation()
      console.log("Ediitit")
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
        <h2 style={{ color: '#064402' }}>{type + " Location "}  </h2>
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
              sx={styleField}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ backgroundColor: '#064402', color: 'white', marginTop: '10px', borderRadius: '25px', padding: '10px 20px' ,width:"100%"}}
            >
              {type} Location
            </Button>

          </form>
        )}
        {
          type === "Delete" && (
            <>
              <p> Are You Sure Delete {location?.name}</p>
              <Button
                variant="contained"
                onClick={handleDelete}
                style={{ backgroundColor: '#064402', color: 'white', marginTop: '10px', borderRadius: '25px', padding: '10px 20px',width:"100%" }}
              >
                Confirm
              </Button>
            </>

          )
        }
        <Button
          variant="contained"
          onClick={onClose}
          style={{ backgroundColor: '#064402', color: 'white', marginTop: '10px', borderRadius: '25px', padding: '10px 20px',width:"100%" }}
        >
          Cancel
        </Button>
        {message && <p>{message}</p>}
      </Box>
    </Dialog>
  );
};

export default ModelAddLocation;