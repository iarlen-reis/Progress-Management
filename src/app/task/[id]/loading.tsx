import React from 'react'

const loading = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex-col gap-4 mt-7">
        <div className="flex flex-col gap-2">
          <div className="w-[240px] h-10 rounded bg-zinc-400 animate-pulse"></div>
          <div className="w-[300px] h-5 rounded bg-zinc-400 animate-pulse"></div>
          <div className="w-[300px] h-5 rounded bg-zinc-400 animate-pulse"></div>
        </div>

        <div className="w-full h-3 rounded bg-zinc-400 animate-pulse my-4"></div>
        <div className="flex items-center justify-center gap-2 md:justify-end">
          <div className="w-[100px] h-7 rounded bg-zinc-400 animate-pulse"></div>
          <div className="w-[100px] h-7 rounded bg-zinc-400 animate-pulse"></div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-full h-[200px] rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-full h-[200px] rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-full h-[200px] rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-full h-[200px] rounded bg-zinc-400 animate-pulse"></div>
      </div>
    </div>
  )
}

export default loading
