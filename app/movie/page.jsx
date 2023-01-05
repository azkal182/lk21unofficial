import React from 'react'
import Row from '../../components/Row'
import requests from '../../requests'

function Page({ params }) {
    return (
        <>
            <div className='mt-0'>
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
            </div>
        </>
    )
}

export default Page
