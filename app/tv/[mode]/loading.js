export default function Loading() {
 // Or a custom loading skeleton component
const col = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
 return (
  <>
   <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 px-2 mt-12 animate-pulse">
   {col.map((item, i)=> (
    <div key={i} className="aspect-w-5 aspect-h-8 rounded-md overflow-hidden">
     <div className="w-full h-full bg-slate-900/50"></div>
    </div>))}

   </div>


  </>
 );
}
