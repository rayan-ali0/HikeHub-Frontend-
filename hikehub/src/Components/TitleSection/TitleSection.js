import style from './TitleSection.module.css'
// import nature from '../../assets/images/background.jpg'
import nature from  '../../assets/images/nature.jpg'
import cloudss from  '../../assets/images/cloudss.jpg'

const TitleSection = ({ text, date }) => {
    return (
        <div className={style.titleSection}>
            <img src={cloudss} className={style.titleSectionImage} />
            <div className={style.opacityLayer} />
            <div className={style.title}>
            <h1 >
                {text}
            </h1>
            {date && (
                <h3 className={style.date}>{date.toLocaleString().split('T')[0]}</h3>
            )
            }
            </div>
           
        </div>

    )
}
export default TitleSection