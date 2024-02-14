import Title from "../Title/Title"
import style from './Offering.module.css'
import shoeIcon from '../../assets/icons/icon.png'
import roadIcon from '../../assets/icons/icon (1).png'
import baggage from '../../assets/icons/icon (2).png'

const Offering = () => {
    return (
        <div className={style.Offering}>
            <Title text={"Our Offerings"} />
            <div className={style.OfferingBox}>
                <section className={style.offer}>
                <img src={roadIcon} className={style.offerImg}></img>
                    <span className={style.offerTitle}>Secret Locations</span>
                    <p className={style.offerText}>
                        Discover the allure of untouched landscapes and mysterious wonders.
                    </p>
                </section>
                <section className={style.offer}>
                    <img src={shoeIcon} className={style.offerImg}></img>
                    <span className={style.offerTitle}>Safe Adventure</span>
                    <p className={style.offerText}>
                    Delight in the wild with peace, guided by our team for a safe, enjoyable hiking experience.                    </p>
                </section>
                <section className={style.offer}>
                <img src={baggage} className={style.offerImg}></img>
                    <span className={style.offerTitle}>Professional Hikers</span>
                    <p className={style.offerText}>
                    Embark confidently, guided by our team dedicated to ensuring your safety and enjoyment.                    </p>
                </section>
            </div>

        </div>
    )
}
export default Offering