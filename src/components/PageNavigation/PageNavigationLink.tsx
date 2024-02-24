import Link from 'next/link'
import React from 'react'

interface PageNavigationLinkProps {
  text: string
  href: string
}

const PageNavigationLink = ({ text, href }: PageNavigationLinkProps) => {
  return (
    <Link
      href={href}
      className="text-base font-fredoka md:text-lg lg:text-xl hover:transition-colors hover:opacity-80"
    >
      {text}
    </Link>
  )
}

export default PageNavigationLink
