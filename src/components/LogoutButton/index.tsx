'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'

const LogoutButton = () => {
  const handleLogout = () => {
    signOut()
  }

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton
