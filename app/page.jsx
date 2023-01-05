import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../requests'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            {/*
            <Main type='movie' />
            */}
            <Row
                header='top movie today'
                linkRequest={requests.topMovieToday}
                type='movie'
                mode='popular'
            />
            <Row
                header='Popular'
                linkRequest={requests.popular}
                type='movie'
                mode='popular'
            />
            <Row
                header='Latest'
                linkRequest={requests.latest}
                type='movie'
                mode='latest'
            />
            <Row
                header='TV Latest'
                linkRequest={requests.seriesLatest}
                type='tv'
                mode='latest'
            />
            <Row
                header='TV Popular'
                linkRequest={requests.seriesPopular}
                type='tv'
                mode='popular'
            />
        </>
    )
}
