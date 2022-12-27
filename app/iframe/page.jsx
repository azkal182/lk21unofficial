'use client'

import React, { useEffect, useState } from 'react'
const https = require('https')
import axios from 'axios'

export default function Page() {
    const [embed, setEmbed] = useState('')
    const [getVideo, setGetVideo] = useState(false)
    const [data, setData] = useState('')
    const [con, setCon] = useState(false)
    useEffect(() => {
        // fembed("https://layarkacaxxi.icu/f/l-pg1unggyjmm4m/0ef0f83bccab54abaea2e07686731ce4");

        // const cancelToken = axios.CancelToken.source()

        {
            /*
  axios.get('https://fvs.io/redirector?token=UWxUK29BWlBBZzJMakpJcDZLb0o1UmVlWTJNU2g2N3lCUXBCemNLV3k4QlRRSnl6OVNSanlwWHNIQjdIM1BPYnI2ZStHeWczLzJzZDYyWEIzUWJPekNCeU8xajQ0RXpFVHpPbkZ5eGtPN2JSRjh6dkx4K1ZRQVRCN2hyNzlMRURUUk5yRWFsdmVBaXVPd3BMSjFtSmJPMEJ2UENDTjZ1MnpRY3g6UllZVFJhdkhhV21vZGdSK3VxaTA2QT09rCEj')
  .then(response => {
    console.log(response.url)

    window.stop()
 // const url = response.url
    //console.log(url)
   // controller.abort()
    //axios.cancel()
  })
  .catch(error => {
    console.log(error);
  });
  */
        }
    }, [])
    const url =
        'https://fvs.io/redirector?token=UWxUK29BWlBBZzJMakpJcDZLb0o1UmVlWTJNU2g2N3lCUXBCemNLV3k4QlRRSnl6OVNSanlwWHNIQjdIM1BPYnI2ZStHeWczLzJzZDYyWEIzUWJPekNCeU8xajQ0RXpFVHpPbkZ5eGtPN2JSRjh6dkx4K1ZRQVRCN2hyNzlMRURUUk5yRWFsdmVBaXVPd3BMSjFtSmJPMEJ2UENDTjZ1MnpRY3g6UllZVFJhdkhhV21vZGdSK3VxaTA2QT09rCEj'
    const handleClick = (link) => {
        setGetVideo(true)
        // setup AbortController
        //const controller = new AbortController();
        // signal to pass to fetch
        //const signal = controller.signal;
        const fetchController = new AbortController()
        const { signal } = fetchController
        let cekk = setTimeout(() => {
            fetchController.abort()
        }, 10000)
        fetch(link, { signal })
            .then((resp) => {
                console.log('oke')
                alert(resp.url)
                setEmbed(resp.url)
                setCon(true)
                setGetVideo(false)
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

        {
            /*
   let file = await getFile(data);

   for (var i = 0; i < meta.length; ++i) {
    if (meta[i]["label"] === file[i]["label"]) {
     meta[i]["file"] = file[i]["file"];
    }
   }

   */
        }
        //Logger.info(meta)
        //return meta
        alert(JSON.stringify(meta))

        //console.log(meta);
        setData(meta)
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
            <button onClick={handleClick}> Download</button>

            <button onClick={getLink}>getLink</button>

            <div className='video-container bg-blue-600'>
                {getVideo && <h1> geting video ...</h1>}
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

            {/*
{data ?? data.map((item) => {
return ( <button className="px-4 py-y bg-green-600" onClick={()=> {handleClick()}}>{item.label}</button>)}) : <h1 > tidak ada </h1>}

 */}
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

            {data && <h1> ada </h1>}
        </>
    )
}
