import { useEffect, useState } from 'react'
import style from './Gallery.module.css'
import axiosInstance from '../../Utils/AxiosInstance'
const Gallery = () => {

    const [stories, setStories] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStories()
    }, [])

    const fetchStories = async () => {
        try {
            const response = await axiosInstance.get(`story/read`)
            if (response) {
                //   fetchUserData()
                setStories(response.data[0])
                setLoading(false)
                console.log("stories", response.data)
            }
            else {
                console.log(response)
                console.log("Error fetching stories")
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        !loading(
            <div className={style.Story}>
            <section className={`${style.gallerySection}`}></section>
            <section className={`${style.gallerySection}`}></section>

        </div>
        )
       
    )
}

export default Gallery