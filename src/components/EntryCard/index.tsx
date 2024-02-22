import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { convertDate } from '@/lib/convertDate'
import { deleteEntry } from '@/actions/entry/deleteEntry'
import { ButtonDelete } from '../ButtonDelete'
import ButtonForm from '../ButtonForm'

interface EntryCardProps {
  id: string
  taskId: string
  name: string
  description: string
  increment: number
  date: string
}

const EntryCard = ({
  id,
  taskId,
  name,
  description,
  increment,
  date,
}: EntryCardProps) => {
  const convertedDate = convertDate(date)

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-2xl font-fredoka font-medium">
          {name}
        </CardTitle>
        <CardDescription className="text-sm font-fredoka">
          {convertedDate}
        </CardDescription>
        <CardDescription className="text-sm font-fredoka">
          Adicionado: {increment}
        </CardDescription>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-lg font-fredoka">{description}</p>
        </CardContent>
      )}
      <CardFooter className="flex  justify-end">
        <ButtonDelete.Root action={deleteEntry}>
          <ButtonDelete.Input name="id" defaultValue={id} />
          <ButtonDelete.Input name="taskId" defaultValue={taskId} />

          <ButtonForm
            text="Excluir"
            textOnLoading="Excluindo..."
            variant="destructive"
          />
        </ButtonDelete.Root>
      </CardFooter>
    </Card>
  )
}

export default EntryCard
