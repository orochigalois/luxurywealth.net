import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import Link from "next/link"

import Cookies from "js-cookie"
import { MdExpandMore } from "react-icons/md"
import WorldIcon from "./icons/world"

import { useOnClickOutside } from "../utils/hooks"
import { getLocalizedPage } from "../utils/localize"

const LocaleSwitch = ({ pageContext }) => {
  const isMounted = useRef(false)
  const select = useRef()
  const router = useRouter()
  const [locale, setLocale] = useState()
  const [showing, setShowing] = useState(false)

  const handleLocaleChange = async (selectedLocale) => {
    // Persist the user's language preference
    // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
    Cookies.set("NEXT_LOCALE", selectedLocale)
    setLocale(selectedLocale)
  }

  const beautifyLocale= (locale) => { 
    switch (locale) {
      case "en":
        return "English";
        break;
      case "zh-CN":
        return "中文";
        break;
      default:
        return "English";
        break;
    }
  }

  const handleLocaleChangeRef = useRef(handleLocaleChange)
  useOnClickOutside(select, () => setShowing(false))

  useEffect(() => {
    const localeCookie = Cookies.get("NEXT_LOCALE")
    if (!localeCookie) {
      handleLocaleChangeRef.current(router.locale)
    }

    const checkLocaleMismatch = async () => {
      if (
        !isMounted.current &&
        localeCookie &&
        localeCookie !== pageContext.locale
      ) {
        // Redirect to locale page if locale mismatch
        const localePage = getLocalizedPage(localeCookie, pageContext)

        router.push(
          `${localizePath({ ...pageContext, ...localePage })}`,
          `${localizePath({ ...pageContext, ...localePage })}`,
          { locale: localePage.locale }
        )
      }
      setShowing(false)
    }

    setLocale(localeCookie || router.locale)
    checkLocaleMismatch()

    return () => {
      isMounted.current = true
    }
  }, [locale, router, pageContext])

  return (
    <div ref={select} className="relative ml-8 z-20">
      <button
        type="button"
        className="hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none flex items-center justify-between px-2 py-2 cursor-pointer h-full rounded-md w-32"
        onClick={() => setShowing(!showing)}
      >
        <WorldIcon />
        <span className="text-white capitalize">{beautifyLocale(locale)}</span>
        <MdExpandMore className="ml-1 text-white" />
      </button>
      <div
        className={`w-full bg-white p-1 mt-1 shadow-lg rounded-md ${
          showing ? "absolute" : "hidden"
        }`}
      >
        {pageContext.localizedPaths &&
          pageContext.localizedPaths.map(({ href, locale }) => {
            return (
              <Link
                href={href}
                key={locale}
                locale={locale}
                role="option"
                passHref
              >
                <p
                  onClick={() => handleLocaleChange(locale)}
                  className="capitalize hover:bg-blue-600 hover:text-white cursor-pointer p-2 rounded-md text-center text-blue-600"
                >
                  {beautifyLocale(locale)}
                </p>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

LocaleSwitch.propTypes = {
  initialLocale: PropTypes.string,
}

export default LocaleSwitch
