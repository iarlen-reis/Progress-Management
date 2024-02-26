import { MenuTools } from '@/components/MenuTools'
import TaskCard from '@/components/TaskCard'
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
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface ParamProps {
  searchParams: {
    page: string
    filter: string
  }
}

export default async function Home({ searchParams }: ParamProps) {
  const session = await getServerSession(authOptions)

  const filter = searchParams.filter
  const page = Number(searchParams.page ?? 1)

  const totalTasks = await prisma.task.count({
    where: {
      userId: session?.user.id,
    },
  })

  const maxPage = Math.ceil(totalTasks / 4)
  const existsNextPage = page < maxPage
  const existsPreviousPage = page > 1

  const tasks = await prisma.task.findMany({
    where: {
      userId: session?.user.id,
      name: {
        contains: filter,
        mode: 'insensitive',
      },
    },
    take: 4,
    skip: (Number(page) - 1) * 4,
  })

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
      {tasks && (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
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
      {tasks.length === 0 && !filter && (
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
      {tasks.length === 0 && filter && (
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
          {existsPreviousPage && (
            <PaginationItem>
              <PaginationPrevious
                href={`/?page=${page - 1}${filter ? `&filter=${filter}` : ''}`}
              />
            </PaginationItem>
          )}
          {maxPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href={`/?page=${page}${filter ? `&filter=${filter}` : ''}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )}
          {existsNextPage && (
            <PaginationItem>
              <PaginationNext
                href={`/?page=${page + 1}${filter ? `&filter=${filter}` : ''}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
