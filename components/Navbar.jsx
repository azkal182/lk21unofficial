import React from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'
import { HiOutlineSearch } from 'react-icons/hi'
import { FiCommand } from 'react-icons/fi'
function Navbar() {
    return (
        <>
            <div className='flex items-center justify-between py-3  px-4 lg:px-8 border-b border-slate-800'>
                <div className='flex items-center gap-x-6'>
                    <div className='logo  text-red-500 font-bold text-xl flex items-center gap-x-1'>
                        <Image
                            src={logo}
                            alt='logo'
                            width={32}
                            height={32}
                        />
                        Movie
                    </div>
                    <div className='hidden md:flex items-center gap-x-4'>
                        <div>Home</div>
                        <div>Popular</div>
                        <div>Latest</div>
                    </div>
                </div>
                <div className='flex items-center gap-x-4'>
                    <button
                        // onClick={openModal}
                        className='lg:hidden focus:outline-none px-3 py-2 dark:bg-slate-700/90  border border-slate-400 dark:border-slate-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600'
                    >
                        <HiOutlineSearch size={20} />
                    </button>
                    <div className='hidden lg:block'>
                        <button
                            type='button'
                            // onClick={openModal}
                            className='px-2 py-2 focus:outline-none hover:bg-black/80 dark:bg-slate-700/90 dark:hover:bg-slate-600 border border-slate-400 dark:border-slate-500 text-sm rounded-md dark:text-slate-400 flex items-center gap-x-2'
                        >
                            <span>
                                <HiOutlineSearch size={18} />
                            </span>
                            <span>Pencarian Cepat...</span>
                            <span className='flex items-center gap-x-1'>
                                <FiCommand size={13} />K
                            </span>
                        </button>
                    </div>
                    <div className='w-8 h-8 bg-green-600 rounded-full'></div>
                </div>
            </div>
        </>
    )
}

export default Navbar
