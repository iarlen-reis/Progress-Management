import React from 'react'

const loading = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 mt-4">
        <div className="w-[240px] h-10  rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-[300px] h-6  rounded bg-zinc-400 animate-pulse"></div>
      </div>
      <div className="flex items-center justify-end">
        <div className="w-[140px] h-10 rounded bg-zinc-400 animate-pulse"></div>
      </div>
      <div className="max-w-[400px] w-full h-10 rounded bg-zinc-400 animate-pulse"></div>
      <div className="flex flex-col gap-4">
        <div className="w-full h-[200px] rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-full h-[200px] rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-full h-[200px] rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-full h-[200px] rounded bg-zinc-400 animate-pulse"></div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="w-5 h-5 rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-5 h-5 rounded bg-zinc-400 animate-pulse"></div>
        <div className="w-5 h-5 rounded bg-zinc-400 animate-pulse"></div>
      </div>
    </div>
  )
}

export default loading
