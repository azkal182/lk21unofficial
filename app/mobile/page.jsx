'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import Search from '../../components/mobile/search'
import { useSearchParams } from 'next/navigation'
import SeachResult from '../../components/mobile/SearchResult'

function page() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    if (!query) {
        return (
            <div className='p-2'>
                <Search />
            </div>
        )
    }

    return (
        <>
            <div className='p-2'>
                <Search />
            </div>
            <SeachResult query={query} />
        </>
    )
}

export default page
