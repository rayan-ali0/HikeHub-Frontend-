import style from './Story.module.css'
import imgB from '../../assets/images/pexels-mirsad-mujanovic-691034.jpg'

const Story=({story,index})=>{
console.log(index%2===0)
    return(
<div className={`${index%2===0 ?style.story:style.flexPage}`}>
<section className={`${style.storySection} ${style.textSection}`}>
    <div className={style.title}>
    <h1 className={style.storyTitle}>{story.title}</h1>
<h4 className={style.date}>{story.eventId.date.split('T')[0]}</h4>
    </div>

<div className={style.storyLine}></div>
<p className={style.storyDescription}> 
{story.description}
{/* Darb El Mseilha, also known as the Mseilha Walkway, is a captivating hiking trail offering stunning scenery and historical charm in the Batroun region of Lebanon. Winding alongside the Nahr el-Joz river, the trail unveils enchanting landscapes, vibrant local culture, and historical treasures like the Mseilha Fort. */}
</p>
<div className={style.storyTestimonial}>
    <p>{story.testimonials[0]}</p>
</div>
</section>
<section className={`${style.storySection} ${style.imgeSection}`}>
{story.images.slice(0, 4).map((image, index) => (
    <img
      key={index}
      src={`${process.env.REACT_APP_BACKEND_PATH}${image}`}
      className={style.storyImage}
      alt={`Image ${index + 1}`}
    />
  ))}
  
{/* <img src={`${process.env.REACT_APP_BACKEND_PATH}${story.images[2]}`} className={style.storyImage}></img> */}
</section>
</div>
    )
}
export default Story