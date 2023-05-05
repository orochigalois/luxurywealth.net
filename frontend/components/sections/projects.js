import { useEffect, useState } from "react";
import EmblaCarouselProjects from "../elements/EmblaCarouselProjects";
import { getStrapiMedia } from "utils/media"
const NewsMedia = ({ data }) => {
    console.log(data.projects.data[1].attributes)
    const sliders__num = data.projects.data.length;
    const [nextImage, setNextImage] = useState(getStrapiMedia(data.projects.data[1].attributes.image_shown_on_homepage.data.attributes.url));
    const [name, setName] = useState(data.projects.data[1].attributes.title);
    const [cat, setCat] = useState(data.projects.data[1].attributes.category);
    const notifyIndex = (index) => {
        if (index == sliders__num - 1) {
            setNextImage(getStrapiMedia(data.projects.data[0].attributes.image_shown_on_homepage.data.attributes.url));
            setName(data.projects.data[0].attributes.title);
            setCat(data.projects.data[0].attributes.category);
        }
        else {
            setNextImage(getStrapiMedia(data.projects.data[index + 1].attributes.image_shown_on_homepage.data.attributes.url));
            setName(data.projects.data[index + 1].attributes.title);
            setCat(data.projects.data[index + 1].attributes.category);
        }

    }
    return (
        <section className="overflow-hidden w-full relative" id="projects">
            <div className="container">
                <div className="wrapper">
                    <div className="left">
                        <p className="projects__title">{data.Title}</p>
                        <div className="projects__content">
                            <p className="name">{name}</p>
                            <p className="cat">{cat}</p>
                        </div>
                    </div>
                    <div className="right">
                        <EmblaCarouselProjects slides={data.projects.data} notifyIndex={notifyIndex} />
                        <div className="next__wrapper">
                            <img className='next__image' src={nextImage} alt="next image" />
                        </div>

                    </div>

                </div>

            </div>
        </section>

    )
}

export default NewsMedia
