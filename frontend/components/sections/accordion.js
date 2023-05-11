import React, { useState } from "react"
import { getStrapiMedia } from "utils/media"
import Image from "next/image"
const Accordion = ({ data }) => {
  const [openAccordion, setOpenAccordion] = useState(null)

  const handleClick = (id) => {
    if (openAccordion === id) {
      setOpenAccordion(null)
    } else {
      setOpenAccordion(id)
    }
  }

  return (
    <>
      <section className="overflow-hidden w-full relative" id="accordion">
        <div className="container">
          <div className="wrapper" style={{ display: "flex", width: "100%" }}>
            {data.accordion.map((item) => (
              <div
                key={item.id}
                className={
                  openAccordion === item.id
                    ? "accordion__tile open"
                    : "accordion__tile closed"
                }
              >
                <div
                  className="accordion__title"
                  onClick={() => handleClick(item.id)}
                >
                  {item.title}
                </div>
                <div className="accordion__content">
                  <Image
                    src={getStrapiMedia(item.image.data.attributes.url)}
                    alt={item.image.data.attributes.alternativeText}
                    width={500}
                    height={100}
                  />
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="overflow-hidden w-full relative"
        id="accordion__mobile"
      >
        <div className="container">
          <div className="wrapper" style={{ display: "flex", width: "100%" }}>
            {data.accordion.map((item) => (
              <div
                key={item.id}
                className={
                  openAccordion === item.id
                    ? "accordion__tile open"
                    : "accordion__tile closed"
                }
              >
                <div className="accordion__title">
                  <div
                    className="clickable__overlay"
                    onClick={() => handleClick(item.id)}
                  ></div>
                  {item.title}
                </div>
                <div className="accordion__content">
                  <Image
                    src={getStrapiMedia(item.image.data.attributes.url)}
                    alt={item.image.data.attributes.alternativeText}
                    width={500}
                    height={100}
                  />
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Accordion
