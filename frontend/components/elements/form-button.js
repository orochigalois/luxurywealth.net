import Link from "next/link"
import PropTypes from "prop-types"
import { linkPropTypes } from "utils/types"
import Loader from "./loader"

const FormButton = ({
  link,
  children,
  className,
  isButton,
  handleClick,
  loading = false,
  type,
}) => {
  const isInternalLink = link.url.startsWith("/")

  const buttonClasses = (className) => {
    return `form-button ${className}`
  }

  if (isButton) {
    return (
      <button className={className} onClick={handleClick} type={type}>
        <div className={buttonClasses(className)}>
          {loading && <Loader />}
          {children}
        </div>
      </button>
    )
  }

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <Link href={link.url}>
        <a className={buttonClasses(className)}>{children}</a>
      </Link>
    )
  }

  // Plain <a> tags for external links
  if (link.newTab) {
    return (
      <a
        href={link.url}
        className={buttonClasses(className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <a href={link.url} className={buttonClasses(className)} target="_self">
      {children}
    </a>
  )
}

FormButton.propTypes = {
  link: linkPropTypes,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default FormButton
