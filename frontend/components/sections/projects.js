import Link from "next/link"
import { useEffect, useState } from "react"
import EmblaCarouselProjects from "../elements/EmblaCarouselProjects"
import { getStrapiMedia } from "utils/media"
import Image from "next/image"

const Projects = ({ data }) => {
  const sliders__num = data.projects.data.length
  const [nextSlug, setNextSlug] = useState(
    data.projects.data[1].attributes.slug
  )
  const [nextImage, setNextImage] = useState(
    getStrapiMedia(
      data.projects.data[1].attributes.image_shown_on_homepage.data.attributes
        .url
    )
  )
  const [name, setName] = useState(data.projects.data[0].attributes.title)
  const [cat, setCat] = useState(data.projects.data[0].attributes.category)
  const notifyIndex = (index) => {
    if (index + 1 === sliders__num) {
      setNextImage(
        getStrapiMedia(
          data.projects.data[0].attributes.image_shown_on_homepage.data
            .attributes.url
        )
      )
      setNextSlug(data.projects.data[0].attributes.slug)
    } else {
      setNextImage(
        getStrapiMedia(
          data.projects.data[index + 1].attributes.image_shown_on_homepage.data
            .attributes.url
        )
      )
      setNextSlug(data.projects.data[index + 1].attributes.slug)
    }

    setName(data.projects.data[index].attributes.title)
    setCat(data.projects.data[index].attributes.category)
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
            <EmblaCarouselProjects
              slides={data.projects.data}
              notifyIndex={notifyIndex}
            />
            <Link href={"/project/" + nextSlug}>
              <a>
                <div className="next__wrapper">
                  <Image
                    className="next__image"
                    src={nextImage}
                    alt="next image"
                    layout="fill"
                  />
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
