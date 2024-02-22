import React, { ComponentProps } from 'react'

interface ButtonDeleteInputProps extends ComponentProps<'input'> {}
const ButtonDeleteInput = ({ ...props }: ButtonDeleteInputProps) => {
  return <input {...props} hidden />
}

export default ButtonDeleteInput
