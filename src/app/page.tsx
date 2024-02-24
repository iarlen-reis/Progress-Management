import { MenuTools } from '@/components/MenuTools'
import TaskCard from '@/components/TaskCard'
import { env } from '@/lib/env'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination'
import SearchInput from '@/components/SearchInput'

interface TaskProps {
  id: string
  name: string
  description: string
  progress: number
  target: number
}

interface TaskResponse {
  page: number
  maxPage: number
  tasks: TaskProps[]
  existsNextPage: boolean
  existsPreviousPage: boolean
}

interface ParamProps {
  searchParams: {
    page: string
    filter: string
  }
}

export default async function Home({ searchParams }: ParamProps) {
  const session = await getServerSession(authOptions)

  const filter = searchParams.filter
  const page = searchParams.page ?? 1

  const response = await fetch(
    `${env.API_URL}/task?page=${page}${searchParams.filter ? `&filter=${filter}` : ''}`,
    {
      next: {
        tags: ['tasks'],
      },
      headers: {
        Authorization: `Bearer ${session?.user.id}`,
      },
    },
  )

  const tasks: TaskResponse = await response.json()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 mt-4">
        <h1 className="text-2xl font-fredoka font-medium md:text-3xl">
          Progressos
        </h1>
        <p className="text-base md:text-lg">
          Aqui estão todos seus progressos!
        </p>
      </div>
      <MenuTools.Root>
        <MenuTools.Link href="/task/create" text="Criar tarefa" />
      </MenuTools.Root>
      <SearchInput />
      <div className="flex flex-col gap-4">
        {tasks.tasks &&
          tasks.tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              progress={task.progress}
              target={task.target}
            />
          ))}
      </div>
      <Pagination className="flex items-center justify-end mt-4">
        <PaginationContent>
          {tasks.existsPreviousPage && (
            <PaginationItem>
              <PaginationPrevious
                href={`/?page=${tasks.page - 1}${filter ? `&filter=${filter}` : ''}`}
              />
            </PaginationItem>
          )}
          {tasks.maxPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href={`/?page=${tasks.page}${filter ? `&filter=${filter}` : ''}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )}
          {tasks.existsNextPage && (
            <PaginationItem>
              <PaginationNext
                href={`/?page=${tasks.page + 1}${filter ? `&filter=${filter}` : ''}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
