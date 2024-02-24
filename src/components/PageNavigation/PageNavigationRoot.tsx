import React from 'react'

interface PageNavigationRootProps {
  children: React.ReactNode
}

const PageNavigationRoot = ({ children }: PageNavigationRootProps) => {
  return (
    <ul className="flex items-center gap-2 mt-4 font-fredoka">{children}</ul>
  )
}

export default PageNavigationRoot
