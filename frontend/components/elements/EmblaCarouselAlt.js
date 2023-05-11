import React, { useState, useEffect, useCallback } from "react"
import { PrevButtonAlt, NextButtonAlt } from "./EmblaCarouselButtons"
import useEmblaCarousel from "embla-carousel-react"
import { getStrapiMedia } from "utils/media"
import moment from "moment"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
import Image from "next/image"

const EmblaCarouselAlt = ({ slides }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on("select", onSelect)
  }, [embla, onSelect])

  const openLightbox = (index) => {
    setIsOpen(true)
    setPhotoIndex(index)
  }

  const images = slides.map((slide) =>
    getStrapiMedia(slide.attributes.image.data.attributes.url)
  )

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <div
                    className="img__wrapper"
                    style={{
                      paddingTop: `${
                        (100 * slide.attributes.image.data.attributes.height) /
                        slide.attributes.image.data.attributes.width
                      }%`,
                    }}
                  >
                    <Image
                      className="embla__slide__img"
                      src={getStrapiMedia(
                        slide.attributes.image.data.attributes.url
                      )}
                      alt=""
                      onClick={() => openLightbox(index)}
                      layout="fill"
                    />
                  </div>

                  <p className="news__media__title">{slide.attributes.title}</p>
                  <div className="subtitle__date">
                    <div className="subtitle">
                      <p>{slide.attributes.category}</p>
                    </div>
                    <div className="date">
                      {moment(slide.attributes.createdAt)
                        .format("MMMM D, YYYY")
                        .toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
        <PrevButtonAlt
          onClick={scrollPrev}
          enabled={prevBtnEnabled}
          fill={"#1E1E1E"}
        />
        <NextButtonAlt
          onClick={scrollNext}
          enabled={nextBtnEnabled}
          fill={"#1E1E1E"}
        />
      </div>
    </>
  )
}

export default EmblaCarouselAlt
