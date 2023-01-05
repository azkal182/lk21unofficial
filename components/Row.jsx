import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ModalView from '../components/ModalView'

async function Row({ header, linkRequest, type, mode }) {
    const movies = await getData(linkRequest)
    return (
        <>
            <div className='w-full px-2 md:max-w-6xl md:mx-auto mt-2 md:mt-14'>
                <div>
                    <div className='w-full flex items-center justify-between'>
                        <h1 className='py-2'>{header.toUpperCase()}</h1>
                        <Link
                            href={type + '/' + mode}
                            shallow
                            className='text-red-600 text-sm'
                        >
                            View all
                        </Link>
                    </div>

                    <div className='h-[2px] bg-gradient-to-r from-red-600 w-full'></div>
                    <div className='flex flex-row items-stretch space-x-2 md:space-x-0 overflow-x-scroll scrolbar flex-nowrap md:flex-none md:grid md:grid-cols-4 lg:grid-cols-6 md:gap-4 mt-4 scrollbar-hide'>
                        {movies.results.slice(0, 12).map((movie, i) => {
                            return (
                                <div className='md:w-full ' key={i}>
                                    <ModalView data={movie} type={type} />
                                    {/* <div className=' rounded overflow-hidden w-[120px] md:w-full'>
                                        <Image
                                            className='w-full object-cover'
                                            src={movie.poster}
                                            alt={movie.title}
                                            height={300}
                                            width={200}
                                        />
                                    </div>
                                    <div className='hidden lg:block'>
                                        <h2 className='text-sm mt-1'>
                                            {movie.title}
                                        </h2>
                                    </div> */}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Row

async function getData(link) {
    const res = await fetch(link, { next: { revalidate: 86400 } })
    const data = await res.json()
    if (!res.ok) {
        console.log('error')
    }

    return data
}
