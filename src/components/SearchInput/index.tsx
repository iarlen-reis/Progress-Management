'use client'
import React, { ChangeEvent, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'

const SearchInput = () => {
  const router = useRouter()
  const [filter, setFilter] = React.useState('')
  const [debouncedFilter] = useDebounce(filter, 2000)

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
    <form className="flex items-center gap-2 max-w-[260px] md:max-w-[400px] w-full">
      <Input
        type="search"
        placeholder="Pesquisar"
        className="flex-1"
        value={filter}
        onChange={handleFilter}
      />
      <Button variant="outline" size="icon" className="w-[40px] py-6">
        <Search className="size-3" />
      </Button>
    </form>
  )
}

export default SearchInput
