import { freds_photo, freds_photo_doc, young_me } from "@/assets"
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoWhatsapp, IoLogoYoutube } from "react-icons/io5"

/**
 * ASSETS URL
 * This is a list of assets (images, icons and media) the site will be filled with
 */
export const ASSETS_URL = {
    freds_photo, 
    freds_photo_doc, 
    young_me
}

export const DEFAULT_PAGE_SIZE = 6
export type IDENTIFIED_TABLES = "user" | "menu" | "contact" | "category" | "sales"

export const SOCIAL_LINKS = [
    {
        id: "a82as80220",
        icon: <IoLogoYoutube />,
        title: "youtube",
        link: "https://www.youtube.com/@fredericks",
    },
    {
        id: "a82as80221",
        icon: <IoLogoFacebook />,
        title: "facebook",
        link: "https://www.facebook.com/adefredy1",
    },
    {
        id: "a82as80222",
        icon: <IoLogoWhatsapp />,
        title: "whatsapp",
        link: "https://wa.me/+2348166075406",
    },
    {
        id: "a82as80223",
        icon: <IoLogoInstagram />,
        title: "instagram",
        link: "https://www.instagram.com/i.am.fredericks",
    },
    {
        id: "a82as80224",
        icon: <IoLogoLinkedin />,
        title: "linkedin",
        link: "https://www.linkedin.com/in/fredericks-911-codes",
    },
]


