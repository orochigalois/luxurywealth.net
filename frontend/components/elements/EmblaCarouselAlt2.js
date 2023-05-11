import React, { useState, useEffect, useCallback } from "react"
import { PrevButtonAlt, NextButtonAlt } from "./EmblaCarouselButtons"
import useEmblaCarousel from "embla-carousel-react"
import { getStrapiMedia } from "utils/media"
import Image from "next/image"

const EmblaCarouselAlt2 = ({ slides, notifyPrev, notifyNext }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => {
    embla && embla.scrollPrev()
    notifyPrev()
  }, [embla, notifyPrev])
  const scrollNext = useCallback(() => {
    embla && embla.scrollNext()
    notifyNext()
  }, [embla, notifyNext])

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
        <PrevButtonAlt onClick={scrollPrev} enabled={true} fill={"#1E1E1E"} />
        <NextButtonAlt onClick={scrollNext} enabled={true} fill={"#1E1E1E"} />
      </div>
    </>
  )
}

export default EmblaCarouselAlt2
