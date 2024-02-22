'use client'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-slate-900 w-full py-4 text-white">
      <div className="container px-3 md:px-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" className="font-fredoka font-medium text-2xl">
                Home
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}

export default Header
