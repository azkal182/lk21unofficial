'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import SeachResult from '../../components/SearchResult'
function page() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')

    return (
        <>
            <SeachResult query={query} />
        </>
    )
}

export default page
