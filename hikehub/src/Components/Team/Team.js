import style from './Team.module.css'
import Title from '../../Components/Title/Title'
import storyImg from '../../assets/images/hikeman2.jpg'

const Team = () => {
    return (
        <div className={style.teamContainer}>
            <Title text={"Team Members"} />
            <p>
                Meet the faces behind HikeHub. Our team comprises seasoned hikers, guides, and outdoor enthusiasts committed to making your hiking experience exceptional
            </p>
            <section className={style.teamMembers}>
                <div className={style.member}>
                    <img src={storyImg} />
                    <h3> RAYAN ALI</h3>
                </div>

                <div className={style.member}>
                    <img src={storyImg} />
                    <h3> RAYAN ALI</h3>
                </div>

                <div className={style.member}>
                    <img src={storyImg} />
                    <h3> RAYAN ALI</h3>
                </div>

                <div className={style.member}>
                    <img src={storyImg} />
                    <h3> RAYAN ALI</h3>
                </div>
                <div className={style.member}>
                    <img src={storyImg} />
                    <h3> RAYAN ALI</h3>
                </div>
                
            </section>

        </div>
    )

}

export default Team