
import React, { useState, useEffect, useRef, useContext } from 'react'
import TextField from '@mui/material/TextField';
import style from "./Profile.module.css"
// import background from '../../assets/images/background.jpg'
import background from '../../assets/images/404.jpg'
import google from '../../assets/icons/google-removebg-preview.png'
import axiosInstance from '../../Utils/AxiosInstance';
import { UserContext } from '../../Context/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.minimal.css';
import leftArrow from '../../assets/icons/left-arrow.png'
import './profile.css'

const Profile = () => {
  const { user, setUser, fetchUserData } = useContext(UserContext)
  const [formData, setFormData] = useState({
  })

  const navigate = useNavigate()
  const location = useLocation()

  const styleField = {
    '& .MuiOutlinedInput-root': {
      borderColor: 'white', // Default border color
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { // More specific selector for focus
        borderColor: 'white',
      },
      '&.Mui-focused .MuiInputLabel-root': { // Target the label when focused
        color: 'white', // Change label color to white on focus
      },
      '&:hover .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
        borderColor: 'white',
      },
      '& .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
        borderColor: 'white',
      },
      '& .MuiInputLabel-root': {
        color: 'white'
      },
      '&:focus .MuiInputLabel-root': {
        color: 'white'
      },
      '& .MuiInputLabel-root': {
        color: 'white',
        '&.Mui-focused': {
          color: 'white',
          borderColor: 'white' // Set label color to white when focused
        },
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'white',
        borderColor: 'white',
      },
    },

    '& .MuiInputLabel-root': {
      color: 'white', // Set desired label color here
      borderColor: 'white'
    },

  }


  const editProfile = async (e) => {
    e.preventDefault()
    console.log("editttttttttttttttttttttt")
    try {
      const response = await axiosInstance.put(`user/${user._id}`,formData)
      if (response) {
        fetchUserData()
        console.log("profle", response.data)
      }
      else {
        console.log(response)
        console.log("Error editing Profile")
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(formData)
  }


  return (
    <div className={style.signPage}>
      <img src={background} className={style.signImage} />
      <div className={style.opacity}></div>
      {/* <div className={style.textStyle}>
        <span>TREKKING</span>
        <span>THROUGH</span>
        <span>FORESTS</span>
        <span>FOR PEACE</span>

      </div> */}

      <form className={style.signForm} onSubmit={editProfile}>
        <Link to="/">
          <img src={leftArrow} className={style.backImg} />
        </Link>
        <h1 className={style.signTitle}>
          {/* {location.pathname.slice(1).split('/').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} */}
          PROFILE
        </h1>

        <TextField id="name" label="Your Name" name="name" variant="outlined" required sx={styleField}
          defaultValue={user?.name}
          onChange={(e) => handleChange(e)}
        />

        <TextField id="email" label="Your Email" name="email" placeholder='Ex: email@gmail.com' type="email" variant="outlined" required sx={styleField}
          onChange={(e) => handleChange(e)}
          defaultValue={user?.email}

        />

        <TextField id="phone" label="Phone Number" placeholder='Ex: 03 000 000' name="phone" type="tel" inputMode="numeric" variant="outlined" required sx={styleField}
          onChange={(e) => handleChange(e)}
          defaultValue={user?.phone}

        />


        <TextField id="password" label="Your Password" name="password" variant="outlined" type="password"
          sx={styleField}
          onChange={(e) => handleChange(e)}

        />
        <section className={style.signBtns}>
          <button className={`${style.customButton} ${style.normalSign}`}
          >
            Edit Profile
          </button>
        </section>

      </form>
    </div>
  )
}

export default Profile