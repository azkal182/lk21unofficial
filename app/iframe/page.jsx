'use client'
import React, { useEffect, useState } from 'react'
const https = require('https')
import axios from 'axios'

import useSWR from 'swr'
export default function Page() {
    const [embed, setEmbed] = useState([])

    const [con, setCon] = useState(false)
    const handleClick = () => {
        // setup AbortController
        //const controller = new AbortController();
        // signal to pass to fetch
        //const signal = controller.signal;
        const fetchController = new AbortController()
        const { signal } = fetchController
        let cekk = setTimeout(() => {
            fetchController.abort()
        }, 9000)
        fetch(url, { signal })
            .then((resp) => {
                console.log('oke')
                alert(resp.url)
                setCon(true)
                //controller.abort()
                fetchController.abort()
            })
            .then((data) => {
                // console.log(data)
                clearTimeout(cekk)
            })
            .catch((e) => {
                alert('errs', e)
                console.log(e)
            })

        //controller.abort()
        // alert('cancel')
    }

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

        let path = await axios.get(query, config).then((res) => {
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

        let file = await getFile(data)

        for (var i = 0; i < meta.length; ++i) {
            if (meta[i]['label'] === file[i]['label']) {
                meta[i]['file'] = file[i]['file']
            }
        }
        //Logger.info(meta)
        //return meta
        alert(meta)
        //console.log(meta);
        //setEmbed(meta)
    }

    async function getFile(data) {
        const link = []
        data.forEach(function (v, i) {
            link.push(v.file)
        })
        //Logger.info(link)
        let final_link = []

        let result = await link.reduce(
            (accumulatorPromise, nextID, i) => {
                return accumulatorPromise.then(() => {
                    return new Promise((resolve, reject) => {
                        //Logger.info(nextID)
                        const fetchController = new AbortController()
                        const { signal } = fetchController
                        console.log(nextID)
                        fetch(nextID, (res) => {
                            //Logger.info(res.headers.location)
                            console.log(res.url)
                            final_link.push({
                                file: res.url,
                                label: data[i]['label'],
                            })
                            fetchController.abort()
                            resolve(res.url)
                            //return res.headers.location
                        }).catch((e) => {
                            alert('errs', e)
                            console.log(e)
                        })
                    })
                })
            },
            Promise.resolve()
        )
        //Logger.info(t)
        console.log(final_link)
        return final_link
    }
    async function getLink() {
        fembed(
            'https://layarkacaxxi.icu/f/l-pg1unggyjmm4m/0ef0f83bccab54abaea2e07686731ce4'
        )
    }

    const handleStop = () => {
        const controller = new AbortController()
        controller.abort()
        setCon(false)
    }

    return (
        <>
            <div>
                {/*
    <Iframe url="https://www987.ff-02.com/token=EfrZ62B-RA8ZQwwvi1lmJw/1672067285/140.213.0.0/176/6/63/f9afe1c8cf443d2905e0318adfd25636-480p.mp4" width="560" height="315" frameborder="0" allowfullscreen="true" />
    */}
                {JSON.stringify(embed)}
            </div>
            <button onClick={handleClick}> Download</button>
            <button onClick={handleStop}>ddStop </button>

            <button onClick={getLink}>getLink</button>

            <h1>{con ? 'con' : 'discon'} </h1>
        </>
    )
}
