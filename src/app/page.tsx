import { MenuTools } from '@/components/MenuTools'
import TaskCard from '@/components/TaskCard'
import { env } from '@/lib/env'
import { getServerSession } from 'next-auth'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination'
import SearchInput from '@/components/SearchInput'

import Image from 'next/image'
import { authOptions } from '@/utils/authOptions'

export const dynamic = 'force-dynamic'

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
      cache: 'no-store',
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
      {tasks.tasks && (
        <div className="flex flex-col gap-4">
          {tasks.tasks.map((task) => (
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
      )}
      {tasks.tasks.length === 0 && !filter && (
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/checklist-pana.png"
            width={400}
            height={400}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
            alt="Uma gato em cima de uma movel enquanto sua dona faz uma checklist"
          />
          <p className="text-lg font-fredoka md:text-xl">
            Você não possui nenhuma tarefa.
          </p>
        </div>
      )}
      {tasks.tasks.length === 0 && filter && (
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/five-pana.png"
            width={400}
            height={400}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
            alt="Uma mulher confusa pensando"
          />
          <p className="text-lg font-fredoka md:text-xl text-center">
            Nenhuma tarefa com <br />
            <span className="font-medium text-red-400">
              {filter}
            </span> <br /> foi encontrada.
          </p>
        </div>
      )}
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
