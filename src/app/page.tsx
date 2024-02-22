import { MenuTools } from '@/components/MenuTools'
import TaskCard from '@/components/TaskCard'
import { env } from '@/lib/env'

interface TaskProps {
  id: string
  name: string
  description: string
  progress: number
  target: number
}

export default async function Home() {
  const response = await fetch(`${env.API_URL}/task`, {
    next: {
      tags: ['tasks'],
    },
  })

  const tasks: TaskProps[] = await response.json()
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 mt-4">
        <h1 className="text-3xl font-fredoka font-medium">Progressos</h1>
        <p className="text-lg">Aqui estão todos seus progressos!</p>
      </div>
      <MenuTools.Root>
        <MenuTools.Link href="/task/create" text="Criar tarefa" />
      </MenuTools.Root>
      <div className="flex flex-col gap-4">
        {tasks &&
          tasks.map((task) => (
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
    </div>
  )
}
