import React from 'react'

const loading = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 mt-4">
        <div className="w-[100px] h-4 rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-[20px] h-4 rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-[100px] h-4 rounded bg-zinc-400 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="w-[120px] h-5 rounded bg-zinc-400 animate-pulse"></div>
          <div className="w-full h-10 rounded bg-zinc-400 animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-[120px] h-5 rounded bg-zinc-400 animate-pulse"></div>
          <div className="w-full h-10 rounded bg-zinc-400 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col gap-2">
            <div className="w-[120px] h-5 rounded bg-zinc-400 animate-pulse"></div>
            <div className="w-full h-10 rounded bg-zinc-400 animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-[120px] h-5 rounded bg-zinc-400 animate-pulse"></div>
            <div className="w-full h-10 rounded bg-zinc-400 animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-[120px] h-5 rounded bg-zinc-400 animate-pulse"></div>
          <div className="w-full h-28 rounded bg-zinc-400 animate-pulse"></div>
        </div>
        <div className="flex justify-end">
          <div className="w-[120px] h-10 rounded bg-zinc-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default loading
