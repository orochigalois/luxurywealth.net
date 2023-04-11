import Image from "next/image"
import Markdown from "react-markdown"
import BlueButton from "../elements/blue-button"
// import Carousel from "../elements/carousel"
import EmblaCarousel from "../elements/EmblaCarousel";



const Slider = ({ data }) => {

  return (

    <section className="flex flex-wrap overflow-hidden max-w-7xl mx-auto py-24 justify-between px-5">
      <div className="w-full overflow-hidden">
        <h2 className="title text-center mb-20">{data.title}</h2>
      </div>
      <div className="w-full overflow-hidden md:w-1/2 md:max-w-md mb-10 md:mb-0">
        <Markdown>{data.text}</Markdown>
        <div className="mt-10">
          <BlueButton link={data.button}>
            {data.button.text}
          </BlueButton>
        </div>
      </div>

      <div className="w-full overflow-hidden md:w-1/2">
      <EmblaCarousel slides={data.slider.data} />
        {/* <Image src={getStrapiMedia(data.slider.data[0].attributes.url)}
          width={"100%"}
          height={"100%"}
          objectFit="cover" />
        <Image src={getStrapiMedia(data.slider.data[1].attributes.url)}
          width={"800px"}
          height={"600px"}
          objectFit="cover" /> */}
      </div>

    </section>
  )
}

export default Slider
