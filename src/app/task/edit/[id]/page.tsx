import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateTask } from '@/actions/tasks/updateTask'
import { Textarea } from '@/components/ui/textarea'
import FieldSet from '@/components/FieldSet'
import IsRequired from '@/components/IsRequired'
import ButtonForm from '@/components/ButtonForm'
import { PageNavigation } from '@/components/PageNavigation'
import { getServerSession } from 'next-auth'
import { format } from 'date-fns'
import { authOptions } from '@/utils/authOptions'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

interface ParamProps {
  params: {
    id: string
  }
}

export default async function EditTaskPage({ params }: ParamProps) {
  const session = await getServerSession(authOptions)

  const task = await prisma.task.findUnique({
    where: {
      id: params.id,
      userId: session?.user.id,
    },
  })

  if (!task) {
    return redirect('/')
  }

  const formattedDate = format(new Date(task.deadline), 'yyyy-MM-dd')
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
            defaultValue={formattedDate}
          />
        </FieldSet>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
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
