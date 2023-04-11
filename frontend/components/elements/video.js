import PropTypes from "prop-types"
import { getStrapiMedia } from "utils/media"
import { mediaPropTypes } from "utils/types"

const Video = ({
  media,
  poster,
  className,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
}) => {
  const fullVideoUrl = getStrapiMedia(media.data.attributes.url)
  const fullPosterUrl = getStrapiMedia(poster?.data.attributes.url)

  return (
    <video
      className={className}
      poster={fullPosterUrl}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
    >
      <source src={fullVideoUrl} type={media.mime} />
    </video>
  )
}

Video.propTypes = {
  media: mediaPropTypes,
  poster: mediaPropTypes,
  className: PropTypes.string,
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
}

export default Video
