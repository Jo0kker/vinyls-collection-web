'use client'

import { useEffect } from 'react'

import Lottie from 'lottie-react'

import ValidMail from '@/assets/lottie/json/valid-mail.json'

export default function ConfirmEmailPage() {
    // use effect to change opacity of the title
    useEffect(() => {
        const title = document.querySelector('#title')
        if (title) {
            // add style to the title
            title.classList.add('opacity-100')
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center rounded bg-white py-4">
            <div className="flex flex-col items-center justify-center">
                <Lottie animationData={ValidMail} loop={false} />
                <h1
                    id="title"
                    className="
                text-center text-2xl font-bold
                opacity-0 transition-opacity duration-[5000ms]
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
                xl:text-6xl
              "
                >
                    Email confirmé
                </h1>
            </div>
        </div>
    )
}
