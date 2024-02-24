import React from 'react'

interface PageNavigationTextProps {
  text: string
}
const PageNavigationText = ({ text }: PageNavigationTextProps) => {
  return (
    <span className="text-sm text-slate-700 font-semibold  md:text-lg lg:text-xl">
      {text}
    </span>
  )
}

export default PageNavigationText
