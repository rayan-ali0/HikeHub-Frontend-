import notFound from '../../assets/images/404.jpg'
import style from './NotFound.module.css'
import cloud from '../../assets/images/HG (1).png'
import mountain from '../../assets/images/MG.png'
import mountain1 from '../../assets/images/VG.png'
import { Link } from "react-router-dom";

const NotFound = () => {
    
    return (
        
        <div className={style.notFound}>
            {/* <img src={cloud} className={style.cloud}></img> */}
            {/* <img src={mountain} className={style.mountain}></img> */}
{/* <img src={mountain1} className={style.mountain1}></img> */}
<div className={style.textDiv}>
<h1 className={style.text}>404</h1>
<p>You Just Got Lost In The Jungle!</p>
<Link to='/' ><button className={style.btn}>Get Back</button></Link>

</div>
            <img src={notFound} className={style.backImg}></img>

        </div>
    )
}
export default NotFound