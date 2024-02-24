'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { env } from '@/lib/env'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const createEntry = async (data: FormData) => {
  const session = await getServerSession(authOptions)

  const dataSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    increment: z.number(),
    taskId: z.string(),
    date: z.string().transform((value) => new Date(value).toISOString()),
  })

  const { name, description, increment, taskId, date } = dataSchema.parse({
    name: data.get('name'),
    description: data.get('description'),
    increment: Number(data.get('increment')),
    taskId: data.get('taskId'),
    date: data.get('date'),
  })

  await fetch(`${env.API_URL}/entry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user.id}`,
    },
    body: JSON.stringify({
      name,
      description,
      increment,
      taskId,
      date,
    }),
  })

  revalidateTag('tasks')
  revalidateTag(`task-${taskId}`)
  redirect(`/task/${taskId}`)
}
