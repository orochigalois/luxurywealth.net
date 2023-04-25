import { getStrapiMedia } from "utils/media"
import EmblaCarouselAlt from "../elements/EmblaCarouselAlt";
const NewsMedia = ({ data }) => {
    return (
        <section className="overflow-hidden w-full relative" id="news-media">
            <div className="container">
                <p className="news-media__title">{data.Title}</p>
                <EmblaCarouselAlt slides={data.posts.data} />
            </div>
        </section>

    )
}

export default NewsMedia
