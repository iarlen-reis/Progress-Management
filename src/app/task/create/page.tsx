import { createTask } from '@/actions/tasks/createTask'
import ButtonForm from '@/components/ButtonForm'
import FieldSet from '@/components/FieldSet'
import IsRequired from '@/components/IsRequired'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default async function CreateTaskPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col mt-4">
        <h1 className="text-2xl font-fredoka font-medium md:text-3xl">
          Criar tarefa
        </h1>
      </div>

      <form className="flex flex-col gap-6" action={createTask}>
        <FieldSet>
          <Label htmlFor="name">
            Nome <IsRequired />
          </Label>
          <Input placeholder="Nome da tarefa" name="name" id="name" required />
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
          />
        </FieldSet>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
          <FieldSet>
            <Label htmlFor="progress">
              Progresso atual <IsRequired />
            </Label>
            <Input
              placeholder="Progresso atual"
              name="progress"
              id="progress"
              type="number"
            />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="target">
              Meta da tarefa <IsRequired />
            </Label>
            <Input
              placeholder="Meta da tarefa"
              name="target"
              id="target"
              type="number"
            />
          </FieldSet>
        </div>
        <FieldSet>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            placeholder="Descrição da tarefa"
            name="description"
            id="description"
            className="h-[120px]"
          />
        </FieldSet>
        <div className="flex justify-end">
          <ButtonForm text="Criar tarefa" textOnLoading="Criando..." />
        </div>
      </form>
    </div>
  )
}
