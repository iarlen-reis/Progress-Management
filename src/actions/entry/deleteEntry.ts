'use server'
import { env } from '@/lib/env'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const deleteEntry = async (data: FormData) => {
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
  })

  revalidateTag('tasks')
  revalidateTag(`task-${taskId}`)
}
