'use client'
import useSWR from 'swr'
import ModalView from '../../components/ModalView'
import { useSearchParams } from 'next/navigation'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Profile() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const { data, error, isLoading } = useSWR(
        `https://encouraging-bat-sun-hat.cyclic.app/api/movie/lk21/search?q=${query}`,
        fetcher
    )

    if (error) return <div>failed to load</div>
    if (isLoading)
        return (
            <div className='w-full min-h-screen flex items-center justify-center'>
                <div
                    class='w-12 h-12 rounded-full animate-spin
    border-4 border-solid border-blue-500 border-t-transparent'
                ></div>
            </div>
        )

    // render data
    return (
        <>
            {/* <div>
                {data.results.map((item) => {
                    console.log(item.poster)
                })}
            </div> */}
            <div className='container px-3 md:px-8 mx-auto'>
                <div>
                    <h1 className='font-semibold mb-2 text-lg'>
                        Search
                    </h1>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4'>
                        {data.results.map((item, i) => {
                            return (
                                <div key={i}>
                                    <ModalView data={item} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
