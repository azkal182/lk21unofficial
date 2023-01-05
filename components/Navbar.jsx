import Link from 'next/link'
import React from 'react'
import SearchModal from './SearchModal'

function Navbar() {
    return (
        <>
            <div className='hidden w-full z-10 absolute top-0 left-0 right-0 max-w-6xl  px-4 md:px-0 py-3 lg:mx-auto md:flex items-center justify-between'>
                <div className='flex items-center space-x-10'>
                    <Link href={'/'} shallow className='text-2xl font-bold'>
                        Lk21unofficial
                    </Link>
                    <div className='flex items-center space-x-4'>
                        <Link href={'/'} shallow>
                            Home
                        </Link>
                        <Link href={'/movie'} shallow>
                            Movie
                        </Link>
                        <Link href={'/tv'} shallow>
                            Tv
                        </Link>
                    </div>
                </div>

                <div className='hidden  md:flex items-center space-x-4'>
                    <SearchModal />
                    <button className='bg-red-600 px-3 py-1 rounded '>
                        Sign in
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar
