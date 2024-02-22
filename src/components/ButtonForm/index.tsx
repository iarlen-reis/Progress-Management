'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from '../ui/button'

interface ButtonFormProps extends ButtonProps {
  text: string
  textOnLoading: string
}

const ButtonForm = ({ text, textOnLoading, ...props }: ButtonFormProps) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-[120px]" disabled={pending} {...props}>
      {pending ? textOnLoading : text}
    </Button>
  )
}

export default ButtonForm
