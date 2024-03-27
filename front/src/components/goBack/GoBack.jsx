'use client'
import goBackImg from '../../img/goBack.svg'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const GoBack = () => {
    const router = useRouter()
    return(
        <div onClick={() => router.back()}>
            <Image
                src={goBackImg}
                width={25}
                height={25}
                alt="volver"
            />
        </div>
    )
}

export default GoBack;
