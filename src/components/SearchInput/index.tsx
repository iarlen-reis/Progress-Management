'use client'
import { Input } from '../ui/input'
import { useDebounce } from 'use-debounce'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect } from 'react'

const SearchInput = () => {
  const router = useRouter()
  const [filter, setFilter] = React.useState('')
  const [debouncedFilter] = useDebounce(filter, 1000)

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    router.push(`/?page=1&filter=${filter}`)

    if (!filter) {
      router.push(`/?page=1`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter])

  return (
    <form className="flex items-center gap-2 max-w-[400px] w-full">
      <Input
        type="search"
        placeholder="Pesquisar"
        className="flex-1"
        value={filter}
        onChange={handleFilter}
      />
    </form>
  )
}

export default SearchInput
