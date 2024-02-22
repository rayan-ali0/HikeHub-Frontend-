import style from './Stories.module.css'
import Story from '../../Components/Story/Story'
import backgrd from '../../assets/images/felix-rostig-UmV2wr-Vbq8-unsplash.jpg'
import axiosInstance from '../../Utils/AxiosInstance';
import { useEffect, useState } from 'react';

const Stories=()=>{
const [stories,setStories]=useState()
const [loading,setLoading]=useState(true)

useEffect(()=>{
fetchStories()
},[])

    const fetchStories=async()=>{
        try {
            const response = await axiosInstance.get(`story/read`)
            if (response) {
            //   fetchUserData()
            setStories(response.data)
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

    return(
        !loading?(
<div className={style.storyPage}>
    <img src={backgrd} className={style.backImg}></img>
    <div className={style.opacity}></div>
    {
        stories.length>0 &&(
            stories.map((story,index)=>(
                <div className={style.oneStory} key={index}>
                                    {console.log(index)}

                <Story story={story} index={index+1}/>
                </div>
            ))
        )
    }
</div>
        ):(
            <h1>Loadinnggg,,,,</h1>
        )

    )
}
export default Stories