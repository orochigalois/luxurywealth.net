import EmblaCarouselHero from "../elements/EmblaCarouselHero";

const Hero = ({ data }) => {
    return (
        <section className="w-full relative" id="hero">
            <div className="overlay"></div>
            <EmblaCarouselHero slides={data.slider.data} />
            <div className="container">
                <div className="text">
                    {data.title}
                </div>
            </div>
        </section>
    )
}

export default Hero
