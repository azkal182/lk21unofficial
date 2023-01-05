import React from 'react'
import useSWR from 'swr'
import { format } from 'date-fns'
import Image from 'next/image'
import ModalSearch from './ModalSearch'

const fetcher = (url) => fetch(url).then((res) => res.json())
function SeachResult({ query }) {
    const { data, error, isLoading } = useSWR(
        `https://movie-express.vercel.app/api/v1/search?q=${query}`,
        fetcher
    )

    if (error) return <div>failed to load</div>
    if (isLoading)
        return (
            <div className="relative flex items-center justify-center h-32">
  <div className="spinner text-gray-500"></div>
</div>


        )

    return (
        <>
            <h1 className='font-bold px-2'>Results : {query}</h1>
            <div className='flex flex-col card px-2 space-y-4  mt-2'>
                {data.results.map((item) => (
                    <ModalSearch data={item} key={item.id} />
                ))}
            </div>
        </>
    )
}

export default SeachResult
