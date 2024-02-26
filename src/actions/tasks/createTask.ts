'use server'
import { env } from '@/lib/env'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

interface TaskProps {
  id: string
  name: string
  description: string
  progress: number
  target: number
  deadline: Date
}

export const createTask = async (data: FormData) => {
  const session = await getServerSession(authOptions)

  const dataSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    progress: z.number(),
    target: z.number(),
    deadline: z.string().transform((value) => new Date(value).toISOString()),
  })

  const { name, description, progress, target, deadline } = dataSchema.parse({
    name: data.get('name'),
    description: data.get('description'),
    progress: Number(data.get('progress')),
    target: Number(data.get('target')),
    deadline: data.get('deadline'),
  })

  const response = await fetch(`${env.API_URL}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user.id}`,
    },
    body: JSON.stringify({
      name,
      description,
      progress,
      target,
      deadline,
    }),
  })

  const task: TaskProps = await response.json()

  revalidateTag('tasks')
  redirect(`/task/${task.id}`)
}
