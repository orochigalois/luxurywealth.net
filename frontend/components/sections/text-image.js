import NextImage from "../elements/image"
import Markdown from "react-markdown"
import BlueButton from "../elements/blue-button"

const TextImage = ({ data }) => {
  return (

    <section className="flex flex-wrap overflow-hidden max-w-7xl mx-auto py-24 justify-between px-5">
      <div className="w-full overflow-hidden">
        <h2 className="title text-center mb-20">{data.Title}</h2>
      </div>

      <div className="w-full overflow-hidden md:w-1/2 md:max-w-md mb-10 md:mb-0">
        <Markdown>{data.Text}</Markdown>
        <div className="mt-10">
          <BlueButton link={data.BlueButton}>
            {data.BlueButton.text}
          </BlueButton>
        </div>
      </div>

      <div className="w-full overflow-hidden md:w-1/2">
        <NextImage media={data.Image} />
      </div>

    </section>
  )
}

export default TextImage
