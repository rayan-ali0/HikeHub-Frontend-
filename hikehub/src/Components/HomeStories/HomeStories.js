import style from './HomeStories.module.css'
import story1 from '../../assets/images/story1.jpeg'
import story2 from '../../assets/images/story2.jpeg'
import story3 from '../../assets/images/story3.jpeg'

const HomeStories = () => {

    return (
        <div className={style.homeStory}>
            <section className={`${style.storyImages} ${style.storySection}`}>
                <div className={`${style.first}`}>
                    {/* <img src={story1} alt="story img" className={`${style.storiesImg}`} /> */}

                </div>
                <div className={`${style.second}`}>

                    {/* <img src={story2} alt="story img" className={`${style.storiesImg}`} /> */}
                </div>
                <div className={`${style.third}`}>
                    {/* <img src={story3} alt="story img" className={` ${style.storiesImg}`} />3 */}

                </div>
            </section>
            <section className={`${style.storyAction} ${style.storySection}`}>
<h2>
Journey Highlights
</h2>
<p>
We preserve the memories of completed hikes and extraordinary adventures. Join us in reliving the magic through our stories
</p>
<button>
    Discover More
</button>
            </section>
        </div>

    )
}
export default HomeStories