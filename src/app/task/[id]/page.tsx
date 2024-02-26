import EntryCard from '@/components/EntryCard'
import { MenuTools } from '@/components/MenuTools'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { convertDate } from '@/lib/convertDate'
import prisma from '@/lib/prisma'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface ParamProps {
  params: {
    id: string
  }
}

export default async function TaskPage({ params }: ParamProps) {
  const session = await getServerSession(authOptions)

  const task = await prisma.task.findUnique({
    where: {
      id: params.id,
      userId: session?.user.id,
    },
    include: {
      entries: true,
    },
  })

  if (!task) {
    return redirect('/')
  }

  const convertedDeadlineDate = convertDate(task.deadline)
  const convertedCreatedAtDate = convertDate(task.createdAt)

  return (
    <div className="flex flex-col gap-8">
      <Card className="flex flex-col gap-1 mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-fredoka font-medium md:text-3xl line-clamp-1">
            Tarefa {task.name}
          </CardTitle>
          <CardDescription className="text-base md:text-lg">
            {task.description}
          </CardDescription>
          <CardDescription className="text-base text-zinc-600">
            {convertedCreatedAtDate} - {convertedDeadlineDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Progress value={Math.round((task.progress / task.target) * 100)} />
          <p className="text-sm sm:text-base">
            {task.progress} / {task.target}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 md:justify-end">
          <MenuTools.Root>
            <MenuTools.Link
              href={`/task/edit/${params.id}`}
              text="Editar tarefa"
              variant="outline"
            />
            <MenuTools.Link
              href={`/task/${params.id}/entry`}
              text="Criar entrada"
            />
          </MenuTools.Root>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-4">
        {task.entries &&
          task.entries.map((entry) => <EntryCard {...entry} key={entry.id} />)}
      </div>
    </div>
  )
}
