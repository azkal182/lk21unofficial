import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { FaPlay } from 'react-icons/fa'
import requests from '../requests'
async function Main({ type }) {
    const movies = await getData(type)
    const moviesWithTmdbId = movies.results.filter(
        (movie) =>
            'TMDB' in movie &&
            movie.TMDB !== null &&
            movie.TMDB.backdrop_path !== null
    )
    const randomIndex = Math.floor(Math.random() * moviesWithTmdbId.length)
    const randomMovie = moviesWithTmdbId[randomIndex]
    return (
        <>
            <div className='h-[400px] lg:h-[550px] overflow-hidden relative'>
                <Image
                    className='w-full object-cover h-[400px] lg:h-[550px]'
                    src={`https://image.tmdb.org/t/p/original${randomMovie.TMDB.backdrop_path}`}
                    alt={randomMovie.title}
                    width={1000}
                    height={700}
                    blurDataURL='data:...'
                    placeholder='blur'
                />
                <div className='hidden md:block'>
                    <div className='absolute  z-10 w-full inset-0 max-w-6xl mx-auto mt-[25%]'>
                        <div className='flex items-center justify-between'>
                            <div className='space-x-4'>
                                <button className='px-8 py-1 bg-red-600 rounded'>
                                    Play
                                </button>
                                <span>{randomMovie.TMDB.release_date}</span>
                            </div>
                            <button className='rounded-full inline-flex items-center text-center bg-white p-3'>
                                <FaPlay className='text-red-600' size={18} />
                            </button>
                        </div>
                        <div className='max-w-lg'>
                            <p className='line-clamp-3'>
                                {randomMovie.TMDB.overview}
                            </p>
                        </div>
                    </div>
                    <div className='absolute h-[550px] bottom-0 right-0 left-0 w-full bg-gradient-to-t from-black'></div>
                    <div className='absolute h-[550px] top-0 right-0 left-0 w-full bg-gradient-to-b from-black'></div>
                </div>
                <div>
                    <div className='absolute h-[400px] bottom-0 right-0 left-0 w-full bg-gradient-to-t from-black'></div>
                    <div className='absolute h-[400px] top-0 right-0 left-0 w-full bg-gradient-to-b from-black'></div>
                </div>
            </div>
            <div className='w-full flex items-center justify-evenly md:hidden mt-2'>
                <button className=''>List</button>
                <button className='flex items-center gap-x-2 bg-gray-200 text-black rounded px-2 py-0.5'>
                    <FaPlay /> Play
                </button>
                <button>Info</button>
            </div>
        </>
    )
}

export default Main

async function getData(type) {
    const res = await fetch(
        `https://tan-dead-meerkat.cyclic.app/api/v1/${type}/latest?tmdb=true`,
        {
            next: { revalidate: 60 },
        }
    )
    const data = await res.json()
    if (!res.ok) {
        console.log('error')
    }

    return data
}
