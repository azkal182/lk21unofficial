import React from 'react'
import Row from '../../components/Row'
import requests from '../../requests'

function Page({ params }) {
    return (
        <>
            <div className='mt-0'>
                <Row
                    header='Top TV Today'
                    linkRequest={requests.topSeriesToday}
                    type='tv'
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
                <Row
                    header='TV Korea'
                    linkRequest={requests.seriesKorea}
                    type='tv'
                    mode='korea'
                />
                <Row
                    header='TV China'
                    linkRequest={requests.seriesMandarin}
                    type='tv'
                    mode='china'
                />
                <Row
                    header='TV West'
                    linkRequest={requests.seriesWest}
                    type='tv'
                    mode='west'
                />
            </div>
        </>
    )
}

export default Page
