'use client'

import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
function Watch() {
    const params = useSearchParams()
    const [embed, setEmbed] = useState('')
    const [getVideo, setGetVideo] = useState(false)
    const [data, setData] = useState('')
    console.log(params.get('id'))

    async function fembed(query) {
        // const ip = request.ip()
        // Logger.warning(ip)
        //let query = request.input('url')
        const config = {
            headers: {
                'user-agent':
                    'Mozilla/5.0 (Linux; Android 12; CPH2043) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
                'content-type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept-Encoding': 'application/json',
            },
        }

        let path = await axios
            .get(`https://layarkacaxxi.icu/f/${query}`, config)
            .then((res) => {
                let data = res.data
                // console.log(data)
                const regex = /\/api\/source\/[^\"']+/gm
                const found = data.match(regex)[0]
                return found
            })
        let link = []
        let meta = []
        let data = await axios
            .post('https://layarkacaxxi.icu' + path)
            .then((res) => {
                const file = res.data.data
                // Logger.info()
                file.forEach(function (v, i) {
                    link.push(v.file)
                    meta.push(v)
                })
                return file
            })

        {
            alert(JSON.stringify(meta))

            //console.log(meta);
            setData(meta)
        }
    }

    const handleClick = (link) => {
        setGetVideo(true)
        const fetchController = new AbortController()
        const { signal } = fetchController
        let cekk = setTimeout(() => {
            fetchController.abort()
        }, 10000)
        fetch(`${link}`, { signal })
            .then((resp) => {
                // console.log('oke')
                // console.log(resp)
                // alert(resp.url)
                setEmbed(resp.url)
                // setCon(true)
                setGetVideo(false)
                fetchController.abort()
            })
            .then((data) => {
                // console.log(data)
                clearTimeout(cekk)
            })
            .catch((e) => {
                // alert('errs', e)
                console.log(e)
            })
    }

    useEffect(() => {
        fembed(params.get('id'))
        // console.log(params.get('id'))
    }, [params])

    return (
        <div>
            <div className='video-container bg-blue-600'>
                {getVideo && (
                    <div className='w-full text-center h-full place-content-center'>
                        {' '}
                        geting video ...
                    </div>
                )}
                {embed && (
                    <iframe
                        src={embed}
                        height='315'
                        width='560'
                        allowfullscreen=''
                        frameborder='0'
                    ></iframe>
                )}
            </div>
            {data &&
                data.map((item, i) => {
                    return (
                        <button
                            key={i}
                            className='px-4 py-y bg-green-600'
                            onClick={() => {
                                handleClick(item.file)
                            }}
                        >
                            {item.label}
                        </button>
                    )
                })}
        </div>
    )
}

export default Watch
