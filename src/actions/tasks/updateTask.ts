'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { env } from '@/lib/env'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const updateTask = async (data: FormData) => {
  const session = await getServerSession(authOptions)

  const dataSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    progress: z.number(),
    target: z.number(),
    deadline: z.string().transform((value) => new Date(value).toISOString()),
  })

  const { id, name, description, progress, target, deadline } =
    dataSchema.parse({
      id: data.get('id'),
      name: data.get('name'),
      description: data.get('description'),
      progress: Number(data.get('progress')),
      target: Number(data.get('target')),
      deadline: data.get('deadline'),
    })

  await fetch(`${env.API_URL}/task/${id}`, {
    method: 'PUT',
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

  revalidateTag('tasks')
  revalidateTag(`task-${id}`)
  redirect(`/task/${id}`)
}
