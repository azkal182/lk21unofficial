import React from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'
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
                    <div>
                        <input type='text' placeholder='search' />
                    </div>
                    <div className='w-8 h-8 bg-green-600 rounded-full'></div>
                </div>
            </div>
        </>
    )
}

export default Navbar
