import PropTypes from "prop-types"
import { linkPropTypes, mediaPropTypes } from "utils/types"
import NextImage from "./image"
import CustomLink from "./custom-link"

const Footer = ({ footer }) => {
    return (
        <footer id="footer">
            <div className="container">
                <div className="flex flex-col lg:flex-row lg:justify-between footer__top">
                    <div>
                        <a href="/">
                            {footer.logo && (
                                <NextImage width="176.75px" height="60" media={footer.logo} />
                            )}
                        </a>
                    </div>
                    <nav className="flex flex-wrap flex-row lg:gap-40 items-start lg:justify-end pr-20">
                        {footer.columns.map((footerColumn) => (
                            <div
                                key={footerColumn.id}
                                className="mt-10 lg:mt-0 w-6/12 lg:w-auto"
                            >
                                <p className="footer__nav__title">
                                    {footerColumn.title}
                                </p>
                                <ul className="mt-3">
                                    {footerColumn.links.map((link) => (
                                        <li
                                            key={link.id}
                                            className="footer__nav__link"
                                        >
                                            <CustomLink link={link}>{link.text}</CustomLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="footer__bottom">
                  {footer.smallText}
                </div>
            </div>

        </footer>
    )
}

Footer.propTypes = {
    footer: PropTypes.shape({
        logo: mediaPropTypes.isRequired,
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    .isRequired,
                title: PropTypes.string.isRequired,
                links: PropTypes.arrayOf(linkPropTypes),
            })
        ),
        smallText: PropTypes.string.isRequired,
    }),
}

export default Footer
