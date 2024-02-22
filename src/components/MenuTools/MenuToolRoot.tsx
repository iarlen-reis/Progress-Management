import React from 'react'

interface MenuToolRootProps {
  children: React.ReactNode
}

const MenuToolRoot = ({ children }: MenuToolRootProps) => {
  return <div className="flex items-center justify-end gap-4">{children}</div>
}

export default MenuToolRoot
