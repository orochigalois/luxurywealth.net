import { useRouter } from "next/router"
import Hero from "@/components/sections/hero"
import BigImage from "@/components/sections/big-image"
import TextImage from "@/components/sections/text-image"
import Animation from "@/components/sections/animation"
import Whoarewe from "@/components/sections/who-are-we"
import ImageBanner from "@/components/sections/image-banner"
import NewsMedia from "@/components/sections/news-media"
import Projects from "@/components/sections/projects"
import Accordion from "@/components/sections/accordion"
import Slider from "@/components/sections/slider"
import ContactForm from "@/components/sections/contact-form"
import LargeVideo from "@/components/sections/large-video"
import FeatureColumnsGroup from "@/components/sections/feature-columns-group"
import FeatureRowsGroup from "@/components/sections/feature-rows-group"
import BottomActions from "@/components/sections/bottom-actions"
import TestimonialsGroup from "@/components/sections/testimonials-group"
import RichText from "./sections/rich-text"
import Pricing from "./sections/pricing"
import LeadForm from "./sections/lead-form"

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: Hero,
  ComponentSectionsBigImage: BigImage,
  ComponentSectionsTextImage: TextImage,
  ComponentSectionsAnimation: Animation,
  ComponentSectionsWhoAreWe: Whoarewe,
  ComponentSectionsImageBanner: ImageBanner,
  ComponentSectionsNewsAndMedia: NewsMedia,
  ComponentSectionsProjects: Projects,
  ComponentSectionsAccordion: Accordion,
  ComponentSectionsSlider: Slider,
  ComponentSectionsContactForm: ContactForm,
  ComponentSectionsLargeVideo: LargeVideo,
  ComponentSectionsFeatureColumnsGroup: FeatureColumnsGroup,
  ComponentSectionsFeatureRowsGroup: FeatureRowsGroup,
  ComponentSectionsBottomActions: BottomActions,
  ComponentSectionsTestimonialsGroup: TestimonialsGroup,
  ComponentSectionsRichText: RichText,
  ComponentSectionsPricing: Pricing,
  ComponentSectionsLeadForm: LeadForm,
}

// Display a section individually
const Section = ({ sectionData }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__typename]

  if (!SectionComponent) {
    return null
  }

  // Display the section
  return <SectionComponent data={sectionData} />
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  )
}

// Display the list of sections
const Sections = ({ sections, preview }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section
          sectionData={section}
          key={`${section.__typename}${section.id}`}
        />
      ))}
    </div>
  )
}

export default Sections
