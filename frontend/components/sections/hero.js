import Markdown from "react-markdown"
import Image from "next/image"
import { getStrapiMedia } from "utils/media"

const Hero = ({ data }) => {
  return (
    <section className="w-full py-24 px-5 bg-black relative hero-section">
      <div className="max-w-7xl m-auto px-5">
        <div className="w-full overflow-hidden">
          <h2 className="title mb-20 text-white">{data.title}</h2>
        </div>

        <div className="w-full overflow-hidden md:w-1/2 md:max-w-2xl mb-10 md:mb-0 text-white text-lg relative z-10">
          <Markdown>{data.text}</Markdown>
        </div>

        <img src={getStrapiMedia(data.image.data.attributes.url)} width='600px' alt="" className='absolute bottom-16 right-10'/>

      </div>


    </section>
  )
}

export default Hero
