import Link from "next/link"
import { BiMessageAltDetail } from "react-icons/bi"
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs"

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="container mx-auto px-4">
        <Link href="/"  className="font-black text-tertiary-dark">
          Transylvania
        </Link>

        <h4 className="font-semibold text-[40px] py-6">
          Contacts
        </h4>

        <div className="flex flex-wrap gap-16 items-center justify-between">
          <div className="flex-1">
            <p>The dark forest</p>
            <div className="flex items-center py-4">
              <BsFillSendFill />
              <p className="ml-2">Dracula Airlines</p>
            </div>

            <div className="flex items-center">
              <BsTelephoneOutbound />
              <p className="ml-2">000-111-222-000</p>
            </div>

            <div className="flex items-center pt-4">
              <BiMessageAltDetail />
              <p className="ml-2">Dracula Airlines</p>
            </div>
          </div>

          <div className="flex-1 md:text-left">
            <p className="pb-4">Our story</p>
            <p className="pb-4">Get in touch</p>
            <p className="pb-4">Our privacy commitment</p>
            <p className="pb-4">Terms of service</p>
            <p>Customer Assistance</p>
          </div>

          <div className="flex-1 md:text-left">
            <p className="pb-4"> Dining Experience</p>
            <p className="pb-4"> Wellness</p>
            <p className="pb-4"> Fitness</p>
            <p className="pb-4"> Sports</p>
            <p> Events</p>
          </div>
        </div>
      </div>

      <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0"></div>
    </footer>
  )
}

export default Footer