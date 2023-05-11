import ErrorPage from "next/error"
import { getPageData, fetchAPI, getGlobalData, getStrapiURL } from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { getLocalizedPaths, getLocalizedProjectPaths } from "utils/localize"
import Project from "@/components/project"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({
  project,
  sections,
  metadata,
  preview,
  global,
  pageContext,
}) => {
  const router = useRouter()

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length && !project) {
    return <ErrorPage statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  // Merge default site SEO settings with page specific SEO settings
  if (metadata.shareImage?.data == null) {
    delete metadata.shareImage
  }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  }
  if (sections)
    return (
      <Layout
        global={global}
        pageContext={pageContext}
        className={pageContext?.locale}
      >
        {/* Add meta tags for SEO*/}
        <Seo metadata={metadataWithDefaults} />
        {/* Display content sections */}
        <Sections sections={sections} preview={preview} />
      </Layout>
    )
  else
    return (
      <Project
        project={project}
        global={global}
        pageContext={pageContext}
      ></Project>
    )
}

export async function getStaticPaths(context) {
  // Get all pages from Strapi
  const pages = await context.locales.reduce(
    async (currentPagesPromise, locale) => {
      const currentPages = await currentPagesPromise
      const localePages = await fetchAPI("/pages", {
        locale,
        fields: ["slug", "locale"],
      })
      return [...currentPages, ...localePages.data]
    },
    Promise.resolve([])
  )

  var paths = pages.map((page) => {
    const { slug, locale } = page.attributes
    // Decompose the slug that was saved in Strapi
    const slugArray = !slug ? false : slug.split("/")

    return {
      params: { slug: slugArray },
      // Specify the locale to render
      locale,
    }
  })

  const resProj = await fetch(`${getStrapiURL(`/api/projects`)}`)
  var projData = await resProj.json()

  projData.data.forEach((item) => {
    var enPath = {
      params: {
        slug: ["project", item.attributes.slug],
      },
      locale: "en",
    }
    var zhPath = {
      params: {
        slug: ["project", item.attributes.slug],
      },
      locale: "zh-CN",
    }
    paths.push(enPath)
    paths.push(zhPath)
  })

  return { paths, fallback: true }
}
function getNextSlug(projData, currentSlug) {
  const slugs = projData.data.map((item) => item.attributes.slug)
  const currentIndex = slugs.indexOf(currentSlug)

  if (currentIndex === -1) {
    return null // Slug not found
  }

  const nextIndex = (currentIndex + 1) % slugs.length
  return slugs[nextIndex]
}

export async function getStaticProps(context) {
  const { params, locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts if preview mode is on
  if (params.slug) {
    const res = await fetch(
      `${getStrapiURL(
        `/api/projects?filters[slug]=${params.slug[1]}&populate=*&locale=${locale}`
      )}`
    )
    var pageData = await res.json()
    if (pageData == null) {
      // Giving the page no props will trigger a 404 page
      return { props: {} }
    }

    const resProj = await fetch(`${getStrapiURL(`/api/projects`)}`)
    var projData = await resProj.json()

    // We have the required page data, pass it to the page component
    const { metadata, localizations, slug } = pageData?.data[0]?.attributes
    const nextSlug = getNextSlug(projData, slug)

    const pageContext = {
      locale,
      locales,
      defaultLocale,
      slug,
      localizations,
    }

    const localizedPaths = getLocalizedProjectPaths(pageContext)

    return {
      props: {
        preview,
        sections: false,
        project: { ...pageData.data[0].attributes, nextSlug },
        metadata,
        global: globalLocale.data,
        pageContext: {
          ...pageContext,
          localizedPaths,
        },
      },
    }
  } else {
    var pageData = await getPageData({
      slug: (!params.slug ? [""] : params.slug).join("/"),
      locale,
      preview,
    })
    if (pageData == null) {
      // Giving the page no props will trigger a 404 page
      return { props: {} }
    }

    // We have the required page data, pass it to the page component
    const { contentSections, metadata, localizations, slug } =
      pageData.attributes

    const pageContext = {
      locale,
      locales,
      defaultLocale,
      slug,
      localizations,
    }

    const localizedPaths = getLocalizedPaths(pageContext)

    return {
      props: {
        preview,
        sections: contentSections,
        project: false,
        metadata,
        global: globalLocale.data,
        pageContext: {
          ...pageContext,
          localizedPaths,
        },
      },
    }
  }
}

export default DynamicPage
