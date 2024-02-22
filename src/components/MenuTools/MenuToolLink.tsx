import React from 'react'
import { Button, ButtonProps } from '../ui/button'
import Link from 'next/link'

interface MenuToolLinkProps extends ButtonProps {
  href: string
  text: string
}
const MenuToolLink = ({ href, text, ...props }: MenuToolLinkProps) => {
  return (
    <Button asChild {...props}>
      <Link href={href}>{text}</Link>
    </Button>
  )
}

export default MenuToolLink
