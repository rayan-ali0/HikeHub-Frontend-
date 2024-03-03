import style from './Team.module.css'
import Title from '../../Components/Title/Title'
import storyImg from '../../assets/images/hikeman2.jpg'
import { useEffect, useState } from 'react'
import axiosInstance from '../../Utils/AxiosInstance'

const Team = () => {
const [team,setTeam]=useState()
const [loading,setLoading]=useState(true)

useEffect(()=>{
fetchTeam()
},[])
    const fetchTeam = async () => {
        try {

            const response = await axiosInstance.get(`user/team/all`, { withCredentials: true });
            if (response) {
                setTeam(response.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false)

        }
    }
    return (
        !loading&&(
            <div className={style.teamContainer}>
            <Title text={"Team Members"} />
            <p>
                Meet the faces behind HikeHub. Our team comprises seasoned hikers, guides, and outdoor enthusiasts committed to making your hiking experience exceptional
            </p>
            <section className={style.teamMembers}>
                {
                    team && team.length>0&& team.map((member,index)=>(
                        <div className={style.member}>
                        <img src={ member.image? `${process.env.REACT_APP_BACKEND_PATH}${member.image}`:storyImg} />
                        <h3> {member.name}</h3>
                    </div>
                    ))
                }
                
            </section>

        </div>
        )

    )

}

export default Team