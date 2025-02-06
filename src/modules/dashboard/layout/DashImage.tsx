import { fetchUser } from '@/action'
import { ASSETS_URL } from '@/constants'
import Image from 'next/image'

export default async function DashImage() {
    const data = await fetchUser()

    return (
        <>
            <div className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 relative bg-primary rounded-full overflow-hidden">
                <Image src={data?.image ?? ASSETS_URL["freds_photo_doc"]} alt='User Image'  className="absolute left-0 top-0 h-full w-full rounded-md object-cover flex-shrink-0" fill />
            </div>
        </>
    )
}
