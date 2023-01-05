'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Rediector() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const mode = searchParams.get('mode')
    const type = searchParams.get('type')
    const router = useRouter()
    const { data, error, isLoading } = useSWR(
        `https://movie-express.vercel.app/api/v1/${type}/${
            type === 'movie' ? 'detail' : 'show'
        }/${id}`,
        fetcher
    )
    console.log(id + mode)
    if (data && mode == 'watch') {
        // alert('watch')
        if (data.results.server_embed.P2P) {
            window.location.href = data.results.server_embed.P2P.link
        }
        if (data.results.server_embed.CAST) {
            window.location.href = data.results.server_embed.CAST.link
        }
    } else if (data && mode == 'download') {
        console.log(data.results.link_download)
        // alert('download')
    }

    return (
        <div className='min-h-screen w-full flex flex-col justify-center z-20 absolute top-0 items-center text-black bottom-0 left-0 right-0 bg-white'>
            <div className='flex items-center'></div>

            {isLoading && (
                <div className='flex flex-col justify-center'>
                    <h1 className='font-bold text-2xl block'>
                        Please wait ....
                    </h1>
                    <div className='mx-auto'>
                        <svg
                            className='mr-3 h-10 w-10 animate-spin text-gray-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                            ></circle>

                            <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                        </svg>
                    </div>
                </div>
            )}

            {mode === 'download' && data && (
                <div className='text-center'>
                    <h1 className='font-bold text-xl mb-4'>
                        Choose download !
                    </h1>
                    <h1 className='font-bold text-2xl mb-4'>
                        {data.results.title}
                    </h1>
                    <div className='flex items-center mx-auto w-full space-x-4'>
                        {data.results.link_download.map((item, i) => (
                            <a
                                key={i}
                                href={item.link}
                                className='rounded px-4 py-2 bg-green-600 text-white'
                            >
                                {item.item}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {mode === 'watch' && data && (
                <h2 className='text-center font-bold text-red-500'>
                    Jika halaman tidak berganti, silahkan klik{' '}
                    <a
                        className='text-blue-500 text-2xl font-bold'
                        href={
                            data.results.server_embed.P2P
                                ? data.results.server_embed.P2P.link
                                : data.results.server_embed.CAST.link
                        }
                    >
                        disini
                    </a>
                </h2>
            )}
        </div>
    )
}

export default Rediector
