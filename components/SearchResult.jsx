import React from 'react'
import useSWR from 'swr'
import ModalView from './ModalView'

const fetcher = (url) => fetch(url).then((res) => res.json())
function SeachResult({ query }) {
    const { data, error, isLoading } = useSWR(
        `https://movie-express.vercel.app/api/v1/search?q=${query}`,
        fetcher
    )

    if (error) return <div>failed to load</div>
    if (isLoading)
        return (
            <div className='relative flex items-center justify-center h-80'>
                <div className='spinner-lg text-gray-500'></div>
            </div>
        )

    return (
        <>
            <div className='w-full px-2 md:max-w-6xl md:mx-auto mt-[50px]'>
                <div className='w-full flex items-center justify-between'>
                    <h1 className='py-2 font-bold text-lg'>
                        Search result for : {query}
                    </h1>
                    {/* <a className='text-red-600 text-sm' href='#'>
                            View all
                        </a> */}
                </div>

                <div className='grid grid-cols-3 gap-2 gap-x-8 md:grid-cols-4 lg:grid-cols-6 md:gap-4 mt-4'>
                    {data.results.map((item, i) => {
                        return (
                            <div className='w-full md:w-full ' key={i}>
                                <ModalView data={item} type={'tv'} />
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* <h1 className='font-bold px-2'>Results : {query}</h1> */}
            {/* <div className='flex flex-col card px-2 space-y-4  mt-2'> */}
            {/* {data.results.map((item) => (
                    <ModalSearch data={item} key={item.id} />
                ))} */}
            {/* </div> */}
        </>
    )
}

export default SeachResult
