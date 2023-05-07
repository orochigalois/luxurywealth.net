const Whoarewe = ({ data }) => {
  return (
    <section
      className="section flex flex-wrap overflow-hidden w-full mx-auto py-24 px-5 justify-between"
      id="whoarewe"
    >
      <div className="w-full overflow-hidden md:w-1/2 lg:pr-32">
        <p className="whoarewe__subtitle">{data.subtitle}</p>
        <p className="whoarewe__title">{data.title}</p>
      </div>
      <div className="w-full overflow-hidden md:w-1/2 lg:pl-5 pt-12">
        <p className="whoarewe__text">{data.text}</p>
      </div>
    </section>
  )
}

export default Whoarewe
