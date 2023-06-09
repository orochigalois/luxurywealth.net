import { getStrapiMedia } from "utils/media"
import Image from "next/image"
import PropTypes from "prop-types"
import { mediaPropTypes } from "utils/types"

const NextImage = ({ media, className, ...props }) => {
  if (!media?.data?.attributes) return <></>
  const { url, alternativeText, width, height } = media.data.attributes

  const loader = ({ src, width }) => {
    return getStrapiMedia(src)
  }

  // The image has a fixed width and height
  if (props.width && props.height) {
    return (
      <Image
        loader={loader}
        className={className}
        src={url}
        alt={alternativeText || ""}
        {...props}
      />
    )
  }

  // The image is responsive
  return (
    <Image
      loader={loader}
      layout="responsive"
      width={width || "100%"}
      height={height || "100%"}
      objectFit="contain"
      src={url}
      alt={alternativeText || ""}
    />
  )
}

Image.propTypes = {
  media: mediaPropTypes,
  className: PropTypes.string,
}

export default NextImage
