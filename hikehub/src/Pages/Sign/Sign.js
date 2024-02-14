
import React, { useState, useEffect, useRef } from 'react'
import TextField from '@mui/material/TextField';
import style from "./Sign.module.css"
import background from '../../assets/images/background.jpg'
const Sign=()=>{

    const styleField = {
        '& .MuiOutlinedInput-root': {
          borderColor: 'white', // Default border color
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { // More specific selector for focus
            borderColor: 'white',
          },
          '&.Mui-focused .MuiInputLabel-root': { // Target the label when focused
            color: 'white', // Change label color to gray on focus
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
        },
    
        '& .MuiInputLabel-root': {
          color: 'white', // Set desired label color here
          borderColor: 'white'
        },
    
      }


    return(
<div className={style.signPage}>
<img src={background} className={style.signImage}/>
<form className={style.signForm}>
    <h1 className={style.signTitle}> Sign Up</h1>
<TextField id="name" label="Your Name" name="Name" variant="outlined"  required  sx={styleField}
            />
            <TextField id="email" label="Your Email" name="Email" placeholder='Ex: email@gmail.com'  type="email" variant="outlined" required  sx={styleField}
            />
            <TextField id="phone" label="Phone Number" placeholder='Ex: 03 000 000' name="Phone" type="tel"  inputMode="numeric" variant="outlined" required  sx={styleField}
            />
            <TextField id="password" label="Your Password" name="password" variant="outlined" type="password" required 
              sx={styleField}
            />
                        <button className={style.customButton}>Sign Up</button>

            </form>
</div>
    )
}

export default Sign