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
import { env } from '@/lib/env'

interface ParamProps {
  params: {
    id: string
  }
}

interface EntryProps {
  id: string
  name: string
  description: string
  increment: number
  date: string
}

interface TaskProps {
  id: string
  name: string
  description: string
  progress: number
  target: number
  deadline: string
  createdAt: string
  entries: EntryProps[]
}

export default async function TaskPage({ params }: ParamProps) {
  const response = await fetch(`${env.API_URL}/task/${params.id}`, {
    next: {
      tags: [`task-${params.id}`],
    },
  })

  const task: TaskProps = await response.json()

  const convertedDeadlineDate = convertDate(task.deadline)
  const convertedCreatedAtDate = convertDate(task.createdAt)

  return (
    <div className="flex flex-col gap-8">
      <Card className="flex flex-col gap-1 mt-4">
        <CardHeader>
          <CardTitle className="text-3xl font-fredoka font-medium">
            Tarefa {task.name}
          </CardTitle>
          <CardDescription className="text-lg">
            {task.description}
          </CardDescription>
          <CardDescription className="text-base text-zinc-600">
            {convertedCreatedAtDate} - {convertedDeadlineDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Progress value={Math.round((task.progress / task.target) * 100)} />
          <p className="text-base">
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
          task.entries.map((entry) => (
            <EntryCard {...entry} taskId={task.id} key={entry.id} />
          ))}
      </div>
    </div>
  )
}