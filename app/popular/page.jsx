import React from 'react'
import ModalView from '../../components/ModalView'

async function Latest() {
    const popular = await getPopular()
    return (
        <>
            <div className='container px-3 md:px-8 mx-auto'>
                <div>
                    <h1 className='font-semibold mb-2 text-lg'>
                        Popular
                    </h1>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4'>
                        {popular.results.map((item, i) => {
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

export default Latest

async function getPopular() {
    const res = await fetch(
        'https://encouraging-bat-sun-hat.cyclic.app/api/movie/lk21/popular'
    )
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
