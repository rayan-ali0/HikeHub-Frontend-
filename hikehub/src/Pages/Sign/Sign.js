
import React, { useState, useEffect, useRef, useContext } from 'react'
import TextField from '@mui/material/TextField';
import style from "./Sign.module.css"
// import background from '../../assets/images/background.jpg'
import background from '../../assets/images/hikeman.jpg'

// import background from '../../assets/images/toomas-tartes-Yizrl9N_eDA-unsplash (1).jpg'
import google from '../../assets/icons/google-removebg-preview.png'
import axiosInstance from '../../Utils/AxiosInstance';
import { UserContext } from '../../Context/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.minimal.css';
import leftArrow from '../../assets/icons/left-arrow.png'
import './profile.css'

const Sign = () => {
  const { user, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: '',
    phone: 0
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
    },

    '& .MuiInputLabel-root': {
      color: 'white', // Set desired label color here
      borderColor: 'white'
    },

  }
  const signin = async (e) => {
    e.preventDefault()
    try {

      const response = await axiosInstance.post('login', formData)
      if (response.status === 200) {
        console.log(response.data)
        setUser(response.data.data)
        toast.success("Logged in successfully")
        if (location.state) {
          navigate(location.state.redirect)
        } else {
          navigate('/')
        }
      }
    }
    catch (error) {
      console.log(error)
      toast.error(" Error Logged in. Please Try Again")
      console.log("error signinggginnnn")
    }
  }



  const signup = async (e) => {
    e.preventDefault()
    try {

      const response = await axiosInstance.post('user/register', formData)
      if (response.status === 201) {
        setUser(response.data.user)
        if (location.state) {
          navigate(location.state.redirect)
        } else {
          navigate('/')

        }
      }
    }
    catch (error) {
      console.log(error)
      console.log("error signinggguuuup")
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
      <div className={style.textStyle}>
        <span>TREKKING</span>
        <span>THROUGH</span>
        <span>FORESTS</span>
        <span>FOR PEACE</span>

      </div>

      <form className={style.signForm}>
        <Link to="/">
          <img src={leftArrow} className={style.backImg} />
        </Link>
        <h1 className={style.signTitle}>
          {/* {location.pathname.slice(1).split('/').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} */}
          {location.pathname === "/signin" ? "Welcome Back" : "Create your free account"}
        </h1>
        {location.pathname === "/signup" &&
          (
            <TextField id="name" label="Your Name" name="name" variant="outlined" required sx={styleField}
              onChange={(e) => handleChange(e)}
            />
          )
        }

        <TextField id="email" label="Your Email" name="email" placeholder='Ex: email@gmail.com' type="email" variant="outlined" required sx={styleField}
          onChange={(e) => handleChange(e)}

        />
        {location.pathname === "/signup" &&
          (
            <TextField id="phone" label="Phone Number" placeholder='Ex: 03 000 000' name="phone" type="tel" inputMode="numeric" variant="outlined" required sx={styleField}
              onChange={(e) => handleChange(e)}

            />
          )
        }

        <TextField id="password" label="Your Password" name="password" variant="outlined" type="password" required
          sx={styleField}
          onChange={(e) => handleChange(e)}

        />
        <section className={style.signBtns}>
          <button className={`${style.customButton} ${style.normalSign}`}
           onClick={(e) =>
            location.pathname === "/signup" ? signup(e) : signin(e)}>
            {location.pathname.slice(1).split('/').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}            </button>
          <span className={`${style.customButton} ${style.oauth}`}></span>
        </section>

        <section className={style.textSection}>
          {location.pathname === "/signup" ?
            (
              <p>Already have an account? <Link to={'/signin'} className={style.signLink} >Sign In</Link> </p>

            ) : (
              <p>Don't Have an account? <Link to={'/signup'} className={style.signLink} >
                <Link to={{ pathname: '/signup', state:  location.state}}  className={style.signLink}></Link>
                Sign Up</Link> 
              for free</p>

            )
          }
        </section>

      </form>
    </div>
  )
}

export default Sign