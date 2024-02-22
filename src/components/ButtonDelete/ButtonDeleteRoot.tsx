'use client'
import React from 'react'

interface ButtonDeleteRootProps {
  action: (data: FormData) => Promise<void>
  children: React.ReactNode
}

const ButtonDeleteRoot = ({ action, children }: ButtonDeleteRootProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (confirm('Tem certeza que deseja excluir esse item?')) {
          action(new FormData(event.currentTarget))
        }
      }}
    >
      {' '}
      {children}
    </form>
  )
}

export default ButtonDeleteRoot
