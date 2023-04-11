import NextImage from "../elements/image"

const BigImage = ({ data }) => {
  return (
    <section className={`w-full ${!data?.BlackBackground ? '' :"bg-black"} py-24`}>
      <div className="max-w-4xl mx-auto">
        <NextImage media={data.Image} />
      </div>
    </section>
  )
}

export default BigImage
