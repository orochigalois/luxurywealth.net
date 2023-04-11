import NextImage from "../elements/image"
import Markdown from "react-markdown"
import Video from "../elements/video"

const Animation = ({ data }) => {
  return (
    <section className="w-full py-24 px-5 bg-black relative">
      <Video
        media={data.background_video}
        className="vimeo-device"
        autoPlay={true}
        controls={false}
        muted={true}
        loop={true}
      />
      <div className="max-w-7xl flex flex-wrap overflow-hidden justify-between m-auto animation-content">
        <div className="w-full overflow-hidden">
          <h2 className="title text-center mb-20 text-white">{data.title}</h2>
        </div>
        <div className="w-full overflow-hidden md:w-1/2 md:max-w-md mb-10 md:mb-0">
          <NextImage media={data.image} />
        </div>
        <div className="w-full overflow-hidden md:w-1/2 text-white">
          <Markdown>{data.text}</Markdown>
          <div className="mt-10">
          </div>
        </div>

      </div>




    </section>
  )
}

export default Animation
