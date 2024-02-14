import React, { useState, useEffect, useRef } from 'react'
import TitleSection from '../../Components/TitleSection/TitleSection'
import style from './Contact.module.css'
import Title from '../../Components/Title/Title'
import leaves from '../../assets/images/hey 1.png'
import TextField from '@mui/material/TextField';
import locationIcon from '../../assets/icons/pin.png'
import emailIcon from '../../assets/icons/email.png'
import phoneIcon from '../../assets/icons/phone-call.png'
import { motion } from 'framer-motion';

const Contact = () => {

    const variants={
        initial:{
            y:50,
            opacity:0,
        },
        animate:{
            y:0,
            opacity:1,
            transition:{
                duration:1,
                staggerChildren:0.2
            },
        },
      }


      const styleField = {
        '& .MuiOutlinedInput-root': {
          borderColor: 'darkgray', // Default border color
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { // More specific selector for focus
            borderColor: 'darkgray',
          },
          '&.Mui-focused .MuiInputLabel-root': { // Target the label when focused
            color: 'gray', // Change label color to gray on focus
          },
          '&:hover .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
            borderColor: 'darkgray',
          },
          '& .MuiInputLabel-root': {
            color: 'black'
          },
        },
    
        '& .MuiInputLabel-root': {
          color: 'gray', // Set desired label color here
        },
    
      }

      const form = useRef();


    return (
        <div className={style.contactPage}>
            <TitleSection text={"How Can we Help you?"} />
            <div className={style.contactContainer}>
            <img src={leaves} className={style.leavesImg} />

<div className={style.contactForm}>        

          <motion.section  variants={variants} className={style.contactDetails}>
            <motion.h1 variants={variants}>Get In Touch</motion.h1>
            <motion.p  variants={variants}>
              Get in touch with us for all your automotive needs – we're here to assist you with top-notch car products and services!
            </motion.p>
            <motion.article variants={variants} className={style.contactInfo}>
              <motion.h2 variants={variants}>Contact Info</motion.h2>
              <motion.span  variants={variants}className={style.contactData}> <img src={phoneIcon} className={style.icons} />76147040
              </motion.span>
              <motion.span variants={variants} className={style.contactData}><img src={emailIcon} className={style.icons} />rayan@gmail.com
              </motion.span>
              {/* <motion.span variants={variants} className={style.contactData}> <img src={locationIcon} className={style.icons} /> Tripoli , XXXXX 
              </motion.span> */}
            </motion.article>
          </motion.section>

          <motion.form ref={form}  className={style.contactFormInputs} variants={variants}>
            <TextField id="name" label="Your Name" name="Name" variant="outlined"  required  sx={styleField}
            />
            <TextField id="email" label="Your Email" name="Email" placeholder='Ex: email@gmail.com'  type="email" variant="outlined" required  sx={styleField}
            />
            <TextField id="phone" label="Phone Number" placeholder='Ex: 03 000 000' name="Phone" type="tel"  inputMode="numeric" variant="outlined" required  sx={styleField}
            />
            <TextField id="message" label="Your Message" name="message" variant="outlined" multiline rows={5}  required 
              sx={styleField}
            />
            <motion.button variants={variants} className={style.customButton}>Send Message</motion.button>
          </motion.form>
    

    </div>
            </div>
         

        </div>
    )
}
export default Contact