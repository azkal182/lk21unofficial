'use client'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'
import {
    HiOutlineVolumeOff,
    HiOutlineVolumeUp,
    HiOutlineDownload,
} from 'react-icons/hi'
import { FaPlay } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Link from 'next/link'

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
    ssr: false,
})

function ModalSearch({ data }) {
    let [isOpen, setIsOpen] = useState(false)
    let [meta, setMeta] = useState([])
    let [tv, setTv] = useState([])
    let [selectedSeason, setSelectedSeason] = useState([])
    let [loadingMeta, setLoadingMeta] = useState(true)
    const [muted, setMuted] = useState(true)
    const [play, setPlay] = useState('')

    const formatText = (text) => {
        let words = text.split(' ')

        // Mengubah setiap awal kata menjadi huruf besar
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].slice(0, 1).toUpperCase() + words[i].slice(1)
        }

        // Menggabungkan array menjadi string kembali
        const finaltext = words.join(' ')
        return finaltext
    }
    const getMeta = async (type, id) => {
        // console.log(data)
        // setMeta(data)

        try {
            let { data } = await axios(
                `https://movie-express.vercel.app/api/v1/${type}/detail/${id}`
            )
            setMeta(data.results)
            if (type === 'tv') {
                setSelectedSeason(data.results.seasons[0].episodes)
            }

            // console.log(data.results)
            // console.log(data.results.seasons[0].episodes)
            setLoadingMeta(false)
        } catch (e) {
            console.log(e)
        }
    }

    function handelMute() {
        setMuted(!muted)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal(type, id) {
        setLoadingMeta(true)
        getMeta(type, id)
        // console.log(type)
        setIsOpen(true)
    }
    return (
        <>
            <div
                onClick={() => {
                    openModal(data.type, data.id)
                }}
                // key={}
                className='rounded flex space-x-4 cursor-pointer'
            >
                <div className='w-[150px] rounded overflow-hidden bg-gray-400'>
                    <Image
                        className='w-full object-fit-cover'
                        src={data.poster}
                        alt={data.title}
                        height={150}
                        width={100}
                    />
                </div>
                <div className='w-full ml-auto text-sm'>
                    <h1 className='text-md font-semibold'>{data.title}</h1>
                    <p className='mt-4'>
                        Released :{' '}
                        {new Date(data.dateCreated).toLocaleDateString(
                            'en-US',
                            {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            }
                        )}
                    </p>
                    <p>
                        genre :{' '}
                        {data && data.genres ? data.genres.slice(0, 2) : []}
                    </p>
                    <p>rating : {data.ratingValue}</p>
                    <p className='mt-2'>
                        Type : {data.type === 'tv' ? 'SERIES' : 'MOVIE'}
                    </p>
                </div>
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
                                <Dialog.Panel className='w-full bg-black max-w-xl transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all relative'>
                                    {loadingMeta && (
                                        <div className='z-100 absolute flex items-center justify-center min-h-full w-full inset-0 bg-black'>
                                            {' '}
                                            Loading Data . . .{' '}
                                        </div>
                                    )}
                                    <div className='player-wrapper relative pointer-events: none;'>
                                        {!loadingMeta && (
                                            <ReactPlayer
                                                url={`https://www.youtube.com/embed/${
                                                    data.trailer.match(
                                                        /v=([^&]+)/
                                                    )[1]
                                                }`}
                                                className='react-player'
                                                playing
                                                loop={true}
                                                muted={muted}
                                                width='100%'
                                                height='100%'
                                                config={{
                                                    youtube: {
                                                        playerVars: {
                                                            showinfo: false,
                                                            disablekb: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        )}
                                        {!loadingMeta && (
                                            <button
                                                onClick={closeModal}
                                                className='absolute border top-5 right-5 md:top-10 md:right-10 rounded-full bg-black/50 p-2'
                                            >
                                                <IoClose className='text-white/60' />
                                            </button>
                                        )}

                                        {!loadingMeta && (
                                            <div className='absolute bottom-5 md:bottom-10 flex w-full items-center justify-between px-5 md:px-10'>
                                                <div>
                                                    {data.type == 'movie' && (
                                                        // {alert(meta.server_embed)}
                                                        <div className='flex items-center space-x-4'>
                                                            <a
                                                                href={
                                                                    meta
                                                                        .server_embed
                                                                        .P2P
                                                                        ? meta
                                                                              .server_embed
                                                                              .P2P
                                                                              .link
                                                                        : meta
                                                                              .server_embed
                                                                              .CAST
                                                                              .link
                                                                }
                                                                target='blank'
                                                                className='px-4 focus:outline-none flex items-center py-1 bg-white text-black rounded-sm text-sm font-semibold'
                                                            >
                                                                <FaPlay className='mr-2' />{' '}
                                                                Play
                                                            </a>
                                                            <Link
                                                                href={`/redirector?id=${data.id}&&type=movie&&mode=download`}
                                                                target='blank'
                                                                className='px-4 focus:outline-none flex items-center py-1 bg-white text-black rounded-sm'
                                                            >
                                                                <HiOutlineDownload
                                                                    size={20}
                                                                />
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={handelMute}
                                                        className='bg-black/50 focus:outline-none p-2 border rounded-full text-white'
                                                    >
                                                        {muted ? (
                                                            <HiOutlineVolumeOff />
                                                        ) : (
                                                            <HiOutlineVolumeUp />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex space-x-16 rounded-b-md bg-black px-8 py-4'>
                                        <div className='space-y-4 text-lg'>
                                            <div className='flex items-center space-x-2 text-xs'>
                                                <p className='font-semibold text-green-400'>
                                                    {data.ratingValue} Match
                                                </p>
                                                <div className='font-light'>
                                                    {new Date(
                                                        data.dateCreated
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        }
                                                    )}
                                                </div>

                                                <div
                                                    className={`flex-h-4 items-center justify-center rounded text-white px-1.5 text-xs border border-white/40 ${
                                                        meta.quality ===
                                                        'BluRay'
                                                            ? 'bg-blue-600'
                                                            : meta.quality ===
                                                              'WEBDL'
                                                            ? 'bg-green-600'
                                                            : meta.quality ===
                                                              'TS'
                                                            ? 'bg-red-600'
                                                            : ''
                                                    }`}
                                                >
                                                    {meta.quality}
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
                                                <p className='text-justify w-full md:w-5/6 text-sm md:text-md line-clamp-5'>
                                                    {meta.overview}
                                                </p>
                                                <div className='flex flex-col space-y-3 text-sm'>
                                                    <div>
                                                        <span className='text-[gray]'>
                                                            Genre :
                                                        </span>
                                                        {` ${data.genres}`}
                                                    </div>

                                                    <div>
                                                        <span className='text-[gray]'>
                                                            Cast :
                                                        </span>

                                                        {` ${
                                                            meta && meta.cast
                                                        }`}
                                                    </div>
                                                </div>
                                            </div>

                                            {!loadingMeta &&
                                                data.type === 'tv' && (
                                                    <div>
                                                        <div className='flex justify-between items-center'>
                                                            <h1 className='text-sm font-semibold'>
                                                                {formatText(
                                                                    data.title
                                                                )}
                                                            </h1>
                                                            <select
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    // alert('test')
                                                                    setSelectedSeason(
                                                                        JSON.parse(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    )
                                                                }}
                                                                className='form-select px-2 py-1 pr-8 bg-transparent focus:border-none rounded text-sm'
                                                            >
                                                                {meta.seasons.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => (
                                                                        <option
                                                                            className='bg-black py-1'
                                                                            key={
                                                                                i
                                                                            }
                                                                            value={JSON.stringify(
                                                                                item.episodes
                                                                            )}
                                                                        >
                                                                            Season{' '}
                                                                            {
                                                                                item.season
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>

                                                        <div className='divide-y divide-gray-500 max-h-32 overflow-y-auto'>
                                                            {selectedSeason.map(
                                                                (item, i) => (
                                                                    <div
                                                                        className='flex items-center justify-between'
                                                                        key={i}
                                                                    >
                                                                        <Link
                                                                            href={`/redirector?id=${item.id}&&type=tv&&mode=watch`}
                                                                            target='blank'
                                                                            className='w-full flex items-center space-x-4 py-1'
                                                                        >
                                                                            <div className='rounded-full border text-center justify-center border-gray-500 p-2'>
                                                                                <FaPlay
                                                                                    className='text-gray-500 text-center'
                                                                                    size={
                                                                                        12
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className='text-sm'>
                                                                                Episode{' '}
                                                                                {
                                                                                    item.episode
                                                                                }
                                                                            </div>
                                                                        </Link>
                                                                        <Link
                                                                            href={`/redirector?id=${item.id}&&type=tv&&mode=download`}
                                                                            target='blank'
                                                                            className='text-sm mr-4 p-1 px-2 border-gray-500 rounded border flex items-center'
                                                                        >
                                                                            <HiOutlineDownload
                                                                                size={
                                                                                    18
                                                                                }
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
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

export default ModalSearch
