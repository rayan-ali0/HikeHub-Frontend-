import style from './Title.module.css'
const Title=({text})=>{

    return (
<div className={style.titleHolder}>
    {/* <span className={style.lineTitle}></span> */}
    <h1 className={style.title}>{text}</h1>
</div>
    )

}
export default Title