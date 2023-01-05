import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { HiSearch } from 'react-icons/hi'

function Search() {
    const [inputQuery, setInputQuery] = useState('')
    const inputRef = useRef(null)
    const router = useRouter()
    useEffect(() => {
        inputRef.current.focus()
        // inputRef.current.addEventListener('focus', () => {
        //     const inputMethodManager = global.KeyboardEvent
        //     inputMethodManager.show()
        // })
    }, [])
    const handleKeydown = (e) => {
        if (e.keyCode === 13) {
            // alert(inputQuery)
            router.push(`/mobile?q=${inputQuery}`)
        }
    }
    return (
        <>
            <div className='w-full text-black flex items-center bg-white rounded overflow-hidden px-2'>
                <HiSearch size={20} />
                <input
                    ref={inputRef}
                    onKeyDown={handleKeydown}
                    onChange={(event) => {
                        setInputQuery(event.target.value)
                    }}
                    className='w-full bg-transparent border-none focus:outline-none focus:ring-0'
                    type='text'
                    placeholder='Search'
                />
            </div>
        </>
    )
}

export default Search
