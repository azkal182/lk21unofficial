'use client'
import Link from 'next/link'
import React from 'react'
import { FaTv } from 'react-icons/fa'
import { FiHome } from 'react-icons/fi'
import { RiMovie2Line } from 'react-icons/ri'
import { usePathname } from 'next/navigation'

function Navmobile() {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <>
            <div className='fixed md:hidden bottom-0 transform -translate-x-1/2 inline-flex left-1/2 mx-auto justify-between bg-black w-full'>
                <Link
                    href={'/'}
                    shallow
                    aria-current='page'
                    className={`${
                        pathname == '/' ? 'text-white' : 'text-white/50'
                    } inline-flex flex-col items-center text-xs font-medium py-3 px-4 flex-grow`}
                >
                    <FiHome className='w-7 h-7' />
                    <span className='s'>Home</span>
                </Link>
                <Link
                    href={'/movie'}
                    shallow
                    className={`${
                        pathname == '/movie' ? 'text-white' : 'text-white/50'
                    } inline-flex flex-col items-center text-xs font-medium py-3 px-4 flex-grow`}
                >
                    <RiMovie2Line className='w-7 h-7' />
                    <span className='s'>Movie</span>
                </Link>
                <Link
                    href={'/tv'}
                    shallow
                    className={`${
                        pathname == '/tv' ? 'text-white' : 'text-white/50'
                    } inline-flex flex-col items-center text-xs font-medium py-3 px-4 flex-grow`}
                >
                    <FaTv className='w-7 h-7' />
                    <span className='s'>Tv</span>
                </Link>

                <a
                    className={`${
                        pathname == '/mobile' ? 'text-white' : 'text-white/50'
                    } inline-flex flex-col items-center text-xs font-medium py-3 px-4 flex-grow`}
                    href={'/mobile'}
                >
                    <svg
                        className='w-7 h-7'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                            clipRule='evenodd'
                        ></path>
                    </svg>
                    <span className=''>Search</span>
                </a>
                <a
                    className='inline-flex flex-col items-center text-xs font-medium text-white/50 py-3 px-4 flex-grow'
                    href='#'
                >
                    <svg
                        className='w-7 h-7'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                            clipRule='evenodd'
                        ></path>
                    </svg>
                    <span className=''>Profile</span>
                </a>
            </div>
        </>
    )
}

export default Navmobile
