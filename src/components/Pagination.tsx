"use client"
import { usePathname, useSearchParams,useRouter } from "next/navigation";


const Pagination = ({currentPage,
    hasPrev,
    hasNext}:{currentPage:number,hasPrev:boolean,hasNext:boolean}) => {
   
    const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

    const currPage = (page:number)=>{
        const params = new URLSearchParams(searchParams);
        params.set("page",page.toString());
        replace(`${pathname}?${params.toString()}`);
    }

  return (
    <div className="mt-12 flex justify-between w-full">
        <button onClick={()=>currPage(currentPage-1)}
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200" disabled={!hasPrev}>previous</button>
        <button onClick={()=>currPage(currentPage+1)}
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200" disabled={!hasNext}>next</button>
    </div>
  )
}

export default Pagination