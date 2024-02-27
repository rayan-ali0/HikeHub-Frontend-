import React, { useEffect, useState } from 'react'
import style from './Filter.module.css'
import nature from '../../assets/images/background.jpg'
import subscribeIcon from '../../assets/icons/send.png'
import magnifier from '../../assets/icons/magnifier.png'
import down from '../../assets/icons/down-arrow.png'
import up from '../../assets/icons/up-arrow.png'
// import { Slider, sliderClasses } from '@mui/base/Slider';
import Slider from '@mui/material/Slider';  // Importing Slider from Material-UI
import axiosInstance from '../../Utils/AxiosInstance'
import delt from '../../assets/icons/delete.png'

const Filter = ({ setEvents, allEvents }) => {
    const [locations, setLocations] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterBY, setFilterBY] = useState({
        lengthInterval: [0, 30]
    })

    const reset=()=>{ 
        setFilterBY({
            lengthInterval: [0, 30]
        })
        setSearchTerm('')
    }

    const handleFilter = (e) => {
        setFilterBY({
            ...filterBY,
            [e.target.name]: e.target.value
        })
        console.log("BYYYYYY", filterBY)
    }

    useEffect(() => {
        filterEvents()
    }, [filterBY])

    useEffect(() => {
        fetchLocations()
    }, [])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        console.log(searchTerm)
    }

    const Search = () => {
        let searchResults = []
        allEvents.filter((event) => {
            if(event.trail.title.toLowerCase().includes(searchTerm.toLowerCase())){
                searchResults.push(event)
            }
        });
        setEvents(searchResults)
    }

    const fetchLocations = async () => {
        try {
            const response = await axiosInstance.get(`location/read`)
            if (response) {
                setLocations(response.data)
                console.log("locationsnsss", response.data)
            }
            else {
                console.log(response)
                console.log("Error fetching events")
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const filterEvents = async () => {
        try {
            const response = await axiosInstance.post(`event/filter`, filterBY)
            console.log(filterBY)
            if (response) {
                setEvents(response.data)
                console.log("fileterrrsssssssssrrrr", response.data)
            }
            else {
                console.log(response)
                console.log("Error fetching events")
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className={style.filterBar}>
            {/* <img src={nature} className={style.backImg}></img> */}
            <div className={style.opacity}></div>
            <div className={style.filters}>
                <section className={style.inputBox} >
                    <select type="location" name="location" id="location" placeholder="location" className={`${style.emailInput} ${style.selectInput}`}
                        onChange={handleFilter}
                    >
                        <option value="">Location</option>
                        {
                            locations && locations.map((location, index) => (
                                <option value={location._id} key={index}>{location.name}</option>

                            ))
                        }
                        {/* <option value="tripoli">Tripoli</option>
                        <option value="batroun">Batroun</option> */}
                    </select>
                    {/* <img src={down} className={style.submit}></img> */}
                </section>
                <section className={style.inputBox} >
                    <select type="difficulty" name="difficulty" id="difficulty" placeholder="Difficulty" className={`${style.emailInput} ${style.selectInput}`}
                        onChange={handleFilter}

                    >
                        <option value="">difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>

                    </select>
                    {/* <img src={down} className={style.submit}></img> */}
                </section>
                <section className={`${style.inputBox} ${style.slideContainer}`}>
                    {/* <label for="lengthInterval">Length Interval:</label>
                    <input type="range" id="lengthInterval" name="lengthInterval" min="0" max="100" step="1" className={style.customSlider}  />
                    <output for="lengthInterval" id="lengthOutput">0 - 100</output> */}
                    {/* <div className={style.sliderValue}>
                   <p>{filterBY.lengthInterval.join(',')}</p>
<p>km</p>
                   </div> */}

                    <div className={style.slider}
                    >
                        <p>{filterBY.lengthInterval[0]}</p>
                        <Slider
                            value={filterBY.lengthInterval}
                            name="lengthInterval"
                            onChange={handleFilter}
                            getAriaLabel={() => 'Length range'}
                            min={0}
                            max={200}
                            style={{
                                color: 'rgba(255, 255, 255, 0.5)',
                                '& .MuiSlider-thumb': {
                                    backgroundColor: 'white',
                                },
                                '& .MuiSlider-track': {
                                    color: 'rgba(255, 255, 255, 0.5)',
                                },
                                '& .MuiSlider-rail': {
                                    color: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        />
                        <p>{filterBY.lengthInterval[1] + "Km"}</p>

                    </div>

                </section>

                <section className={style.inputBox} >
                    <input type="title" name="title" id="title" placeholder="Search By Title" className={style.emailInput} onChange={handleSearch} 
                    value={searchTerm}
                    />
                    <img src={magnifier} className={style.submit} onClick={Search}></img>
                </section>
                <section className={style.resetBtn}  onClick={reset}>
                   <img src={delt} className={style.resetX}/>
                </section>
            </div>
        </div>
    )
}

export default Filter