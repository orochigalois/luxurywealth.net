import Link from "next/link"
import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import EmblaCarouselAlt2 from "@/components/elements/EmblaCarouselAlt2"
import useEmblaCarousel from "embla-carousel-react"
import { getStrapiMedia } from "utils/media"
import moment from "moment"
import Image from "next/image"

const Project = ({ project, global, pageContext }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  })
  const [track, setTrack] = useState(1)
  const notifyPrev = () => {
    setTrack((track) => track - 1)
    embla && embla.scrollPrev()
  }
  const notifyNext = () => {
    setTrack((track) => track + 1)
    embla && embla.scrollNext()
  }

  const firstElements = project.slider.data.slice(
    0,
    project.slider.data.length - 1
  )
  const lastElements = project.slider.data.slice(1)
  useEffect(() => {
    if (track > project.slider.data.length - 1) setTrack(1)
    if (track < 1) setTrack(project.slider.data.length - 1)
  }, [track, project.slider.data.length])

  return (
    <Layout
      global={global}
      pageContext={pageContext}
      className={"single__project"}
    >
      <section className=" w-full relative" id="project">
        <div className="container flex flex-wrap">
          <Link href="/" passHref>
            <div className="project__back__arrow">
              <svg
                className="project__back__svg"
                width="36"
                height="6"
                viewBox="0 0 36 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.86907 0L0 2.75047L5.80444 6L5.86917 3.33363H36V2.4168H5.86917L5.86907 0Z"
                  fill="#000"
                />
              </svg>
              <p>BACK</p>
            </div>
          </Link>
          <div className="left">
            <div className="content">
              <h3>{project.title}</h3>
              <div className="complete">
                <p>COMPLETE:</p>
                <p>{moment(project.complete).year()}</p>
              </div>
              <div className="category">
                <p>CATEGORY:</p>
                <p>{project.category}</p>
              </div>
              <div className="location">
                <p>LOCATION:</p>
                <p>{project.location}</p>
              </div>
            </div>
            <div className="embla">
              <div className="embla__viewport" ref={viewportRef}>
                <div className="embla__container">
                  {firstElements.map((slide, index) => (
                    <div className="embla__slide" key={index}>
                      <div className="embla__slide__inner">
                        <div
                          className="img__wrapper"
                          style={{ paddingTop: 248 + "px" }}
                        >
                          <Image
                            className="embla__slide__img"
                            src={getStrapiMedia(slide.attributes.url)}
                            alt=""
                            layout="fill"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="track__num">
              {track}/{project.slider.data.length - 1}
            </div>
          </div>
          <div className="right">
            <EmblaCarouselAlt2
              slides={lastElements}
              notifyPrev={notifyPrev}
              notifyNext={notifyNext}
            />
          </div>
        </div>
      </section>
      <section className="w-full relative" id="project__info">
        <div className="container">
          <div className="flex flex-wrap wrapper">
            <div className="overflow-hidden left">{project.description}</div>
            <div className="overflow-hidden right">
              {project.subDescription}
            </div>
          </div>
          <Link href={"/project/" + project.nextSlug}>
            <a>
              <div className="next__project__arrow">
                <p>NEXT PROJECT</p>
                <svg
                  className="next__project__svg"
                  width="36"
                  height="6"
                  viewBox="0 0 36 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.1309 0L36 2.75047L30.1956 6L30.1308 3.33363H0V2.4168H30.1308L30.1309 0Z"
                    fill="#000"
                  />
                </svg>
              </div>
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default Project
