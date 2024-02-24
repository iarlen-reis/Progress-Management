import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateTask } from '@/actions/tasks/updateTask'
import { Textarea } from '@/components/ui/textarea'
import FieldSet from '@/components/FieldSet'
import IsRequired from '@/components/IsRequired'
import { env } from '@/lib/env'
import ButtonForm from '@/components/ButtonForm'
import { PageNavigation } from '@/components/PageNavigation'

interface ParamProps {
  params: {
    id: string
  }
}

interface TaskProps {
  id: string
  name: string
  description: string
  progress: number
  target: number
  deadline: string
}

export default async function EditTaskPage({ params }: ParamProps) {
  const response = await fetch(`${env.API_URL}/task/${params.id}`, {
    next: {
      tags: [`task-${params.id}`],
    },
  })

  const task: TaskProps = await response.json()
  return (
    <div className="flex flex-col gap-8">
      <PageNavigation.Root>
        <PageNavigation.Link href={`/task/${task.id}`} text={task.name} />
        <PageNavigation.Arrow />
        <PageNavigation.Text text={`Editar ${task.name}`} />
      </PageNavigation.Root>

      <form className="flex flex-col gap-6" action={updateTask}>
        <input type="hidden" name="id" id="id" defaultValue={task.id} />
        <FieldSet>
          <Label htmlFor="name">
            Nome <IsRequired />
          </Label>
          <Input
            placeholder="Nome da tarefa"
            name="name"
            id="name"
            defaultValue={task.name}
            required
          />
        </FieldSet>
        <FieldSet>
          <Label htmlFor="deadline">
            Prazo para conclusão <IsRequired />
          </Label>
          <Input
            placeholder="Prazo para conclusão"
            name="deadline"
            id="deadline"
            required
            type="date"
            defaultValue={task.deadline.split('T')[0]}
          />
        </FieldSet>
        <div className="grid grid-cols-2 gap-4">
          <FieldSet>
            <Label htmlFor="progress">
              Progresso <IsRequired />
            </Label>
            <Input
              type="number"
              placeholder="Progresso atual"
              name="progress"
              id="progress"
              defaultValue={task.progress}
              required
            />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="target">
              Meta <IsRequired />
            </Label>
            <Input
              type="number"
              placeholder="Meta da tarefa"
              name="target"
              id="target"
              defaultValue={task.target}
              required
            />
          </FieldSet>
        </div>
        <FieldSet>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            placeholder="Descrição da tarefa"
            name="description"
            id="description"
            defaultValue={task.description}
            cols={120}
            className="h-[120px]"
          />
        </FieldSet>
        <div className="flex justify-end">
          <ButtonForm text="Editar tarefa" textOnLoading="Salvando..." />
        </div>
      </form>
    </div>
  )
}
