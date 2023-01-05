'use client'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { FiCommand } from 'react-icons/fi'
import { HiOutlineSearch } from 'react-icons/hi'

export default function SearchModal() {
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            closeModal()
            router.push(`/search?q=${event.target.value}`)
            setSearchValue('')
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            {/* <button
                onClick={openModal}
                className='lg:hidden focus:outline-none px-3 py-2 dark:bg-slate-700/90 border border-slate-400 dark:border-slate-500 rounded-md hover:bg-gray-800 dark:hover:bg-slate-600'
            >
                <HiOutlineSearch size={20} />
            </button> */}
            <div className='hidden lg:block'>
                <button
                    type='button'
                    onClick={openModal}
                    className='px-2 py-2 hover:bg-gray-900 focus:outline-none dark:bg-slate-700/90 dark:hover:bg-slate-600 border border-slate-400 dark:border-slate-500 text-sm rounded-md dark:text-slate-400 flex items-center gap-x-2'
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

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full border border-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:divide-slate-700 divide-y divide-gray-500  max-w-2xl transform overflow-hidden rounded-lg bg-black/90 text-left align-middle lg:mt-6 shadow-xl transition-all'>
                                    <div className='flex items-center px-4'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5 dark:text-slate-200'
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            clastrokeWidth='2'
                                            stroke='currentColor'
                                            fill='none'
                                            strokeLinecap='round'
                                            ststrokeLinejoin='round'
                                        >
                                            <path
                                                stroke='none'
                                                d='M0 0h24v24H0z'
                                                fill='none'
                                            ></path>
                                            <circle
                                                cx='10'
                                                cy='10'
                                                r='7'
                                            ></circle>
                                            <line
                                                x1='21'
                                                y1='21'
                                                x2='15'
                                                y2='15'
                                            ></line>
                                        </svg>
                                        {/* <div className='opacity-0'>j</div> */}
                                        <input
                                            className='px-2 w-full border-0 bg-transparent dark:text-slate-100 focus:outline-none focus:ring-0 text-sm placeholder-slate-400 text-slate-300 h-12'
                                            placeholder='Pencarian cepat...'
                                            value={searchValue}
                                            onKeyDown={handleSearch}
                                            onChange={(event) => {
                                                setSearchValue(
                                                    event.target.value
                                                )
                                            }}
                                            type='text'
                                            ariaExpanded='false'
                                            tabindex='0'
                                        ></input>
                                    </div>
                                    <div className='px-4 h-8 bg-slate-black dark:bg-slate-900/30 items-center text-slate-500 dark:text-slate-400 flex gap-x-4 justify-between text-[12px] font-medium'>
                                        Enter
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
