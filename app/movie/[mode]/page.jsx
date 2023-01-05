import React from 'react'
import ModalView from '../../../components/ModalView'

async function page({ params }) {
    const { results } = await getData('movie', params.mode)
    // console.log(results)
    return (
        <>
            <div className='w-full px-2 md:max-w-6xl md:mx-auto mt-[50px] '>
                <div className='w-full flex items-center justify-between'>
                    <h1 className='py-2'>{params.mode.toUpperCase()}</h1>
                    {/* <a className='text-red-600 text-sm' href='#'>
                            View all
                        </a> */}
                </div>

                <div className='grid grid-cols-3 gap-2 gap-x-8 md:grid-cols-4 lg:grid-cols-6 md:gap-4 mt-4'>
                    {results.map((movie, i) => {
                        return (
                            <div className='w-full md:w-full ' key={i}>
                                <ModalView data={movie} type='movie' />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default page

async function getData(type, mode) {
    const res = await fetch(
        type === 'movie'
            ? `https://tan-dead-meerkat.cyclic.app/api/v1/${type}/${mode}?tmdb=true`
            : `https://movie-express.vercel.app/api/v2/tv/${mode}`,
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
