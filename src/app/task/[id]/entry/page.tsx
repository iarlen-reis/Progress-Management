import { createEntry } from '@/actions/entry/createEntry'
import ButtonForm from '@/components/ButtonForm'
import FieldSet from '@/components/FieldSet'
import IsRequired from '@/components/IsRequired'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ParamProps {
  params: {
    id: string
  }
}

export default async function Entry({ params }: ParamProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 mt-4">
        <h1 className="text-3xl font-fredoka font-medium">Criar entrada</h1>
        <p className="text-lg">Adicione uma entrada a sua tarefa</p>
      </div>

      <form className="flex flex-col gap-6" action={createEntry}>
        <input
          type="text"
          name="taskId"
          id="taskId"
          defaultValue={params.id}
          hidden
        />
        <FieldSet>
          <Label htmlFor="name">
            Nome <IsRequired />
          </Label>
          <Input placeholder="Nome da entrada" name="name" id="name" required />
        </FieldSet>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
          <FieldSet>
            <Label htmlFor="date">
              Realizada em <IsRequired />
            </Label>
            <Input
              placeholder="Realizada em"
              name="date"
              id="date"
              required
              type="date"
            />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="increment">
              Incremento <IsRequired />
            </Label>
            <Input
              placeholder="Incremento"
              name="increment"
              id="increment"
              required
              type="number"
            />
          </FieldSet>
        </div>
        <FieldSet>
          <Label htmlFor="description">Descricão</Label>
          <Textarea
            rows={6}
            placeholder="Descricão"
            name="description"
            id="description"
            required
          />
        </FieldSet>
        <div className="flex justify-end">
          <ButtonForm text="Criar entrada" textOnLoading="Criando..." />
        </div>
      </form>
    </div>
  )
}
