import Link from 'next/link'
import React from 'react'
import LogoutButton from '../LogoutButton'
import { getServerSession } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { authOptions } from '@/utils/authOptions'

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
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Avatar>
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback className="bg-slate-400 text-slate-900 uppercase">
                      {session.user.name.charAt(0)}
                      {session.user.name.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit">
                  <LogoutButton />
                </HoverCardContent>
              </HoverCard>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
