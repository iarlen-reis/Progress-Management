import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteTask } from '@/actions/tasks/deleteTask'
import ButtonForm from '../ButtonForm'
import { ButtonDelete } from '../ButtonDelete'

interface TaskCardProps {
  id: string
  name: string
  description: string
  progress: number
  target: number
}

const TaskCard = ({
  id,
  name,
  description,
  progress,
  target,
}: TaskCardProps) => {
  return (
    <li>
      <Card>
        <Link href={`/task/${id}`} className="flex flex-col gap-2">
          <CardHeader>
            <CardTitle className="text-xl font-fredoka font-medium line-clamp-1 md:text-2xl">
              {name}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm sm:text-base">
                {description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Progress value={Math.round((progress / target) * 100)} />
            <div className="flex justify-between">
              <span className="text-sm sm:text-base">
                {Math.round((progress / target) * 100)}%
              </span>
              <span className="text-sm sm:text-base">100%</span>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="flex justify-center gap-4 md:justify-end">
          <ButtonDelete.Root action={deleteTask}>
            <ButtonDelete.Input type="text" name="id" defaultValue={id} />
            <ButtonForm
              variant="destructive"
              text="Excluir"
              textOnLoading="Excluindo..."
            />
          </ButtonDelete.Root>
          <Button asChild variant="default" className="w-[120px]">
            <Link href={`/task/edit/${id}`} className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              Editar
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </li>
  )
}

export default TaskCard
