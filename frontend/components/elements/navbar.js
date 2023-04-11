import { useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"

import { getButtonAppearance } from "utils/button"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"
import { MdMenu } from "react-icons/md"
import MobileNavMenu from "./mobile-nav-menu"
import ButtonLink from "./button-link"
import NextImage from "./image"
import CustomLink from "./custom-link"
import LocaleSwitch from "../locale-switch"

const Navbar = ({ navbar, pageContext }) => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)

  return (
    <>
      {/* The actual navbar */}
      <nav className="py-6 sm:py-2 bg-black ">
        <div className="container flex flex-row items-center justify-between max-w-7xl m-auto px-5">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="/">
              <a className="w-36 md:w-72 xl:w-96">
                <NextImage className={"w-96"} media={navbar.logo} />
              </a>
            </Link>
            {/* List of links on desktop */}
            <ul className="hidden list-none lg:flex flex-row gap-4 items-baseline ml-0 xl:ml-20">
              {navbar.links.map((navLink) => (
                <li key={navLink.id}>
                  <CustomLink link={navLink} locale={router.locale}>
                    <div className="hover:underline px-2 py-1 text-white">
                      {navLink.text}
                    </div>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            {/* Locale Switch Mobile */}
            {pageContext.localizedPaths && (
              <div className="lg:hidden">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(true)}
              className="p-1 block lg:hidden"
            >
              <MdMenu className="h-8 w-auto text-white" />
            </button>
            {/* CTA button on desktop */}
            {navbar.button && (
              <div className="hidden lg:block">
                <ButtonLink
                  onClick={(e) => {
                    if(navbar.button.url.startsWith('#')){
                      e.preventDefault();
                      let destSection=navbar.button.url.substring(1);
                      let $destSection = document.getElementById(destSection);
                      $destSection && $destSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  button={navbar.button}
                  appearance={getButtonAppearance(navbar.button.type, "light")}
                  compact
                />
              </div>
            )}
            {/* Locale Switch Desktop */}
            {pageContext.localizedPaths && (
              <div className="hidden lg:block">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  )
}

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: PropTypes.shape({
      image: mediaPropTypes,
      url: PropTypes.string,
    }),
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
  initialLocale: PropTypes.string,
}

export default Navbar
