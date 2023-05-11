import { fetchAPI } from "./api"

export async function getLocalizedPage(targetLocale, pageContext) {
  const localization = pageContext.localizations.data.find(
    (localization) => localization.attributes.locale === targetLocale
  )
  console.log(localization.id)
  const localePage = await fetchAPI(`/pages/${localization.id}`)
  return localePage
}

export function localizePath(page) {
  const { locale, defaultLocale, slug } = page

  if (locale === defaultLocale) {
    // The default locale is not prefixed
    return `/${slug}`
  }

  // The slug should have a localePrefix
  return `/${locale}/${slug}`
}

export function getLocalizedPaths(page) {
  const paths = page.locales.map((locale) => {
    return {
      locale: locale,
      href: localizePath({ ...page, locale }),
    }
  })

  return paths
}

export function localizeProjectPath(page) {
  const { locale, defaultLocale, slug } = page

  if (locale === defaultLocale) {
    // The default locale is not prefixed
    return `/project/${slug}`
  }

  // The slug should have a localePrefix
  return `/${locale}/project/${slug}`
}

export function getLocalizedProjectPaths(page) {
  const paths = page.locales.map((locale) => {
    return {
      locale: locale,
      href: localizeProjectPath({ ...page, locale }),
    }
  })

  return paths
}
