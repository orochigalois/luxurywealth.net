import React, { useState, useEffect, useCallback } from "react"
import { DotButton } from "./EmblaCarouselButtons"
import useEmblaCarousel from "embla-carousel-react"
import { getStrapiMedia } from "utils/media"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const EmblaCarouselHero = ({ slides }) => {
  const [viewportRef, embla] = useEmblaCarousel({}, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex])
  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on("select", onSelect)
  }, [embla, setScrollSnaps, onSelect])

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
                    style={{ paddingTop: 568 + "px" }}
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
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  )
}

export default EmblaCarouselHero
