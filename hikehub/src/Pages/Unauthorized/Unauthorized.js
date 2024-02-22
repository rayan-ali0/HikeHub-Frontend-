import notFound from '../../assets/images/emptygems.jpg'
import style from './Unauthorized.module.css'
import cloud from '../../assets/images/HG (1).png'
import mountain from '../../assets/images/MG.png'
import mountain1 from '../../assets/images/VG.png'
import { Link } from "react-router-dom";

const Unauthorized = () => {

    return (

        <div className={style.notFound}>
            <div className={style.textDiv}>
                <p>Entry Restricted!</p>
                <p>Venture Elsewhere</p>
                <Link to='/' ><button className={style.btn}>Get Back</button></Link>
            </div>
            <img src={notFound} className={style.backImg}></img>
            <div className={style.backOpacity} ></div>

        </div>
    )
}
export default Unauthorized