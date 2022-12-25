'use client'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from 'react-icons/hi'
import { FaPlay } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
    ssr: false,
})

export default function ModalView({ data }) {
    let [isOpen, setIsOpen] = useState(false)
    let [idMovie, setIdMovie] = useState('')
    let [trailer, setTrailer] = useState('')
    const [muted, setMuted] = useState(true)
    const token = '243bd781b4261e4fade9058a64105c28'
    const getVideo = async (id) => {
        try {
            let response = await axios(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${token}`
            )

            const data = response.data.results.filter(
                (item) => item.type === 'Trailer'
            )
            const index = Math.floor(Math.random() * data.length)
            const show = data.splice(index, 1)[0]

            if (response.data.results.length > 1) {
                console.log(show)
                setTrailer(show.key)
            } else {
                setTrailer(response.data.results.key)
                console.log(response.data.results)
            }

            // setTrailer(response.data.results)
        } catch (error) {
            console.log(error.message)
        }
        // return 'oke'
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal(id) {
        // setIdMovie('jg')
        getVideo(id)
        // console.log('test')
        setIsOpen(true)
    }

    useEffect(() => {
        // getVideo()
    }, [idMovie])

    return (
        <>
            {/* <button
                type='button'
                onClick={openModal}
                className='rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
            >
                {data.title}
            </button> */}
            <div
                onClick={() => {
                    openModal(data.TMDB ? data.TMDB.id : null)
                }}
                className='aspect-[2/3] group cursor-pointer'
            >
                <Image
                    // src={data.poster}
                    className='object-cover group-hover:scale-[103%] transition ease-in-out duration-300'
                    src={`${
                        data.hasOwnProperty('TMDB') &&
                        data.TMDB.hasOwnProperty('poster_path')
                            ? 'https://image.tmdb.org/t/p/w500/' +
                              data.TMDB.poster_path
                            : data.poster
                    }`}
                    width={500}
                    height={500}
                    alt={`Picture of ${data.poster}`}
                />
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={closeModal}
                >
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
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full bg-black max-w-xl transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all'>
                                    <div className='player-wrapper relative'>
                                        <ReactPlayer
                                            url={`https://www.youtube.com/watch?v=${trailer}`}
                                            className='react-player'
                                            playing
                                            width='100%'
                                            height='100%'
                                        />
                                        <button
                                            onClick={closeModal}
                                            className='absolute border-white top-5 right-5 rounded-full bg-black/50 p-2'
                                        >
                                            <IoClose />
                                        </button>
                                        <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
                                            <div>
                                                <button className='px-4 focus:outline-none flex items-center py-1 bg-white text-black rounded-sm text-sm font-semibold'>
                                                    <FaPlay className='mr-2' />{' '}
                                                    Play
                                                </button>
                                            </div>
                                            <div>
                                                <button className='bg-black/50 focus:outline-none p-2 border rounded-full text-white'>
                                                    {muted ? (
                                                        <HiOutlineVolumeOff />
                                                    ) : (
                                                        <HiOutlineVolumeUp />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex space-x-16 rounded-b-md bg-black px-8 py-4'>
                                        <div className='space-y-4 text-lg'>
                                            <div className='flex items-center space-x-2 text-xs'>
                                                <p className='font-semibold text-green-400'>
                                                    {data.rating}{' '}
                                                    Match
                                                </p>
                                                <div className='font-light'>
                                                    {data.hasOwnProperty(
                                                        'TMDB'
                                                    )
                                                        ? data.TMDB
                                                              .release_date
                                                        : ''}
                                                </div>
                                                <div className='flex-h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>
                                                    {data.quality}
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
                                                <p className='w-5/6 text-sm md:text-md'>
                                                    {data.hasOwnProperty(
                                                        'TMDB'
                                                    )
                                                        ? data.TMDB
                                                              .overview
                                                        : ''}
                                                </p>
                                                <div className='flex flex-col space-y-3 text-'>
                                                    <div>
                                                        <span className='text-[gray]'>
                                                            Genres:
                                                        </span>
                                                        action
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
