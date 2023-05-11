import React, { useState, useEffect, useCallback } from "react"
import { PrevButtonAlt, NextButtonAlt } from "./EmblaCarouselButtons"
import useEmblaCarousel from "embla-carousel-react"
import { getStrapiMedia } from "utils/media"
import Link from "next/link"
import Image from "next/image"

const EmblaCarouselProjects = ({ slides, notifyIndex }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    embla && embla.scrollPrev()
  }, [embla])
  const scrollNext = useCallback(() => {
    embla && embla.scrollNext()
  }, [embla])

  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on("select", onSelect)
    notifyIndex(selectedIndex)
  }, [embla, onSelect, selectedIndex, notifyIndex])

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <Link href={"/project/" + slide.attributes.slug}>
                    <a>
                      <div
                        className="img__wrapper"
                        style={{ paddingTop: 568 + "px" }}
                      >
                        <Image
                          className="embla__slide__img"
                          src={getStrapiMedia(
                            slide.attributes.image_shown_on_homepage.data
                              .attributes.url
                          )}
                          alt=""
                          layout="fill"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButtonAlt onClick={scrollPrev} enabled={true} fill={"#fff"} />
        <NextButtonAlt onClick={scrollNext} enabled={true} fill={"#fff"} />
      </div>
    </>
  )
}

export default EmblaCarouselProjects
