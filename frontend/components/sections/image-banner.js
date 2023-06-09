import { getStrapiMedia } from "utils/media"
import Image from "next/image"
const ImageBanner = ({ data }) => {
  return (
    <section className="overflow-hidden w-full relative" id="image-banner">
      <div className="overlay"></div>
      <Image
        src={getStrapiMedia(data.image.data.attributes.url)}
        alt=""
        className="absolute w-full h-full object-cover"
        layout="fill"
      />
      <div className="p__wrapper px-5">
        <p className="image-banner__text text-4xl">{data.text}</p>
      </div>
    </section>
  )
}

export default ImageBanner
