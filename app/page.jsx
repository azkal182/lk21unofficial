import Image from 'next/image'
import React from 'react'
import ModalView from '../components/ModalView'

async function Home() {
    const popular = await getPopular()
    const populars = popular.results.data

    return (
        <>
            <div className='container px-3 md:px-8 mx-auto'>
                <div>
                    <h1 className='font-semibold text-lg'>Latest</h1>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4'>
                        {populars.map((item, i) => {
                            return (
                                <div key={i}>
                                    {/* <h1>{item.title}</h1> */}
                                    {/* <div className='aspect-[2/3] group'>
                                        <Image
                                            // src={item.poster}
                                            className='object-cover group-hover:scale-[103%] transition ease-in-out duration-300'
                                            src={`${
                                                item.hasOwnProperty(
                                                    'TMDB'
                                                ) &&
                                                item.TMDB.hasOwnProperty(
                                                    'poster_path'
                                                )
                                                    ? 'https://image.tmdb.org/t/p/w500/' +
                                                      item.TMDB
                                                          .poster_path
                                                    : item.poster
                                            }`}
                                            width={500}
                                            height={500}
                                            alt={`Picture of ${item.poster}`}
                                        />
                                    </div> */}
                                    <ModalView data={item} />
                                </div>
                            )
                        })}
                        {/* <ModalView /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

async function getPopular() {
    const res = await fetch(
        'https://encouraging-bat-sun-hat.cyclic.app/api/movie/lk21/latest'
    )
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
