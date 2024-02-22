import { cn } from '@/lib/utils'
import React, { ComponentProps } from 'react'

interface FieldSetProps extends ComponentProps<'fieldset'> {
  children: React.ReactNode
}

const FieldSet = ({ children, ...props }: FieldSetProps) => {
  return (
    <fieldset className={cn('flex flex-col gap-2', props.className)} {...props}>
      {children}
    </fieldset>
  )
}

export default FieldSet
