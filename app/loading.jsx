export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
            <div className='w-full min-h-screen flex items-center justify-center'>
                <div
                    class='w-12 h-12 rounded-full animate-spin
border-4 border-solid border-blue-500 border-t-transparent'
                ></div>
            </div>
        </>
    )
}
