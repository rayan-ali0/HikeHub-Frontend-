import React, { useContext } from 'react'
import Styles from "./Dashboard.module.css"
// import DashSidebar from '../../Components/DashSidebar/DashSidebar'
import { Outlet } from 'react-router-dom'
import backGround from '../../assets/images/toomas-tartes-Yizrl9N_eDA-unsplash (1).jpg'
import SideBar from '../../Layout/Sidebar/Sidebar'
import {LayoutContext} from '../../Context/LayoutContext'
const Dashboard = () => {
    const {open,setOpen}=useContext(LayoutContext)
    return (
        <div className={Styles.container}>
            <img src={backGround} className={Styles.dashImg} />
            <div className={Styles.opacity} />
            <SideBar/>
            <section className={`${open?Styles.outletOpen:Styles.outletClose}`}>
                <Outlet />
            </section>

        </div>
    )
}

export default Dashboard