import style from './TitleSection.module.css'
import nature from '../../assets/images/background.jpg'
const TitleSection=({text})=>{
    return(
    <div className={style.titleSection}>
<img src={nature} className={style.titleSectionImage}/>
<div className={style.opacityLayer}/>
<h1 className={style.title}>
{text}
</h1>
    </div>

    )
}
export default TitleSection