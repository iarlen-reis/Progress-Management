import React from 'react'

interface PageNavigationTextProps {
  text: string
}
const PageNavigationText = ({ text }: PageNavigationTextProps) => {
  return (
    <span className="text-sm line-clamp-1 text-slate-700 font-semibold  md:text-lg lg:text-xl">
      {text}
    </span>
  )
}

export default PageNavigationText
