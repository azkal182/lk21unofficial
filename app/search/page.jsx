"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSWR } from "swr";
import ModalView from "../../components/ModalView";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Search() {
 const searchParams = useSearchParams();
 const query = searchParams.get("q");
 const [data, setData] = useState([]);
 //const { data, error } = useSWR(`https://encouraging-bat-sun-hat.cyclic.app/api/movie/lk21/show?id=thor-love-and-thunder-2022&q=${query}`, fetcher)
 // ...

 //const { data, error, isLoading } = useSWR('/api/user/123', fetcher)

 useEffect(() => {
  axios(
   `https://encouraging-bat-sun-hat.cyclic.app/api/movie/lk21/search?q=${query}`
  ).then((res) => {
   console.log(res.data.results.data);
   setData(res.data.results.data);
  });
 }, [searchParams.get("q")]);

 return (
  <>
   {data && <ul className="text-white">{JSON.stringify(data, null, 2)}</ul>}
   {data && (
    <div className="container px-3 md:px-8 mx-auto">
     <div>
      <h1 className="font-semibold mb-2 text-lg">Popular</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
       {data.map((item, i) => {
        return (
         <div key={i}>
          <ModalView data={item} />
         </div>
        );
       })}
      </div>
     </div>
    </div>
   )}
  </>
 );
}
