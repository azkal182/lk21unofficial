export default function Loading() {
 // Or a custom loading skeleton component
const col = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
 return (
<>
            <div className='hidden md:block md:w-full px-2 md:max-w-6xl md:mx-auto md:mt-14 animate-pulse'>
                <div>
                    <div className='w-full flex items-center justify-between'>
                        <div className='my-2 w-12 bg-slate-900/50 h-[18px] rounded'></div>
                        <div className='my-2 w-12 bg-slate-900/50 h-[18px] rounded'></div>
                    </div>

                    <div className='h-[2px] bg-gradient-to-r from-slate-900/90 w-full'></div>
                    <div className='md:space-x-0 overflow-x-scroll scrolbar md:flex-none md:grid md:grid-cols-4 lg:grid-cols-6 md:gap-4 mt-4 scrollbar-hide'>
                        {col.map((item, i) => (
                            <div
                                key={i}
                                className='rounded md:w-full bg-slate-900/50 h-[220px]'
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='w-full h-[400px] md:hidden m-2 rounded bg-slate-900/50 animate-pulse'></div>

            <div className='w-full md:hidden px-2 animate-pulse'>
                <div>
                    <div className='w-full flex items-center justify-between'>
                        <div className='my-2 w-12 bg-slate-900/50 h-[18px] rounded'></div>
                        <div className='my-2 w-12 bg-slate-900/50 h-[18px] rounded'></div>
                    </div>

                    <div className='h-[2px] bg-gradient-to-r from-slate-900/90 w-full'></div>
                    <div className=' mt-2 grid grid-cols-3 gap-2'>
                        {col.slice(0, 3).map((item, i) => (
                            <div
                                key={i}
                                className='rounded w-full bg-slate-900/50 h-[220px]'
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
 );
}
