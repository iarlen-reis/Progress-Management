import Link from 'next/link'
import React from 'react'
import LogoutButton from '../LogoutButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className="bg-slate-900 w-full py-5 text-white">
      <div className="flex items-center justify-between container px-3 md:px-6">
        <Link href="/" className="text-xl font-medium">
          Progress
          <span className="text-slate-500  font-fredoka font-bold">
            Management
          </span>
        </Link>
        <ul>
          {session?.user && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
