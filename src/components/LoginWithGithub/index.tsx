'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { VscGithub } from 'react-icons/vsc'

const LoginWithGithub = () => {
  const handleLoginWithGithub = () => {
    signIn('github')
  }

  return (
    <Button
      className="w-full h-12 flex items-center gap-1.5 text-base  font-fredoka bg-[#24292d]"
      onClick={handleLoginWithGithub}
    >
      <VscGithub className="size-3.5" />
      Faça login com o Github
    </Button>
  )
}

export default LoginWithGithub
