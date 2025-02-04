import { Header3 } from '@/components/ui/Typography'
import { appRoutePaths } from '@/routes/paths'
import Link from 'next/link'
import { ContactForm } from '@/components';

export default function ContactPage() {
  return (
    <main className="relative flex flex-col">
      <section className="relative py-10 lg:py-20 px-4 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-8 lg:px-10 lg:justify-center">
          <aside className="relative flex flex-col gap-2 md:gap-4 py-5 md:py-10">
            <Header3 className='text-secondary font-inspiration'>Contact us</Header3>
            <div className="flex flex-col gap-1">
              <Header3 className='text-primary font-medium font-eugusto max-w-sm'>Phone Number</Header3>
              <Link href={"tel: +2349069071120"} className="font-urbanist text-text text-lg lg:text-xl max-w-md">+2349069071120</Link>
            </div>
            <div className="flex flex-col gap-1 mt-5">
              <Header3 className='text-primary font-medium font-eugusto max-w-sm'>Email Address</Header3>
              <Link href={"mailto: customer@al-ameen.com"} className="font-urbanist text-text text-lg lg:text-xl max-w-md">customer@al-ameen.com</Link>
            </div>
          </aside>
          <aside className="relative bg-primary rounded-xl min-h-60 overflow-hidden lg:col-span-2 grid place-items-center">
            <iframe loading='lazy' allowFullScreen={false} referrerPolicy='no-referrer-when-downgrade' width="100%" height="100%" src={appRoutePaths.googleMap}></iframe>
          </aside>
        </div>
      </section>
      <ContactForm />
    </main>
  )
}
