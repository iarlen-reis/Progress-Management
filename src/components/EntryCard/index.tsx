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
  name: string
  description: string
  increment: number
  date: Date
}

const EntryCard = ({
  id,
  name,
  description,
  increment,
  date,
}: EntryCardProps) => {
  const convertedDate = convertDate(date)

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-xl font-fredoka font-medium line-clamp-1 md:text-2xl">
          {name}
        </CardTitle>
        <CardDescription className="text-sm font-fredoka md:text-base">
          {convertedDate}
        </CardDescription>
        <CardDescription className="text-sm font-fredoka md:text-base">
          Adicionado: {increment}
        </CardDescription>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-base font-fredoka md:text-lg line-clamp-3">
            {description}
          </p>
        </CardContent>
      )}
      <CardFooter className="flex  justify-end">
        <ButtonDelete.Root action={deleteEntry}>
          <ButtonDelete.Input name="id" defaultValue={id} />
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
