'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { env } from '@/lib/env'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const deleteEntry = async (data: FormData) => {
  const session = await getServerSession(authOptions)

  const dataSchema = z.object({
    id: z.string(),
    taskId: z.string(),
  })

  const { id, taskId } = dataSchema.parse({
    id: data.get('id'),
    taskId: data.get('taskId'),
  })

  await fetch(`${env.API_URL}/entry/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session?.user.id}`,
    },
  })

  revalidateTag('tasks')
  revalidateTag(`task-${taskId}`)
}
