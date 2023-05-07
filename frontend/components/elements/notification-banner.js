import Markdown from "react-markdown"
import classNames from "classnames"
import { MdClose } from "react-icons/md"

const NotificationBanner = ({ data: { text, type }, closeSelf }) => {
  return (
    text && (
      <div
        className={classNames(
          // Common classes
          "text-white py-2",
          {
            // Apply theme based on notification type
            "bg-blue-600": type === "info",
            "bg-orange-600": type === "warning",
            "bg-red-600": type === "alert",
          }
        )}
      >
        <div className="container flex flex-row justify-between items-center m-auto">
          <div className="rich-text-banner flex-1">
            <Markdown>{text}</Markdown>
          </div>
          <button onClick={closeSelf} className="px-1 py-1 flex-shrink-0">
            <MdClose className="h-6 w-auto" color="#fff" />
          </button>
        </div>
      </div>
    )
  )
}

export default NotificationBanner
