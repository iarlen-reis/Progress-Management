'use server'
import prisma from '@/lib/prisma'
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

  await prisma.entry.delete({
    where: {
      id,
    },
  })

  revalidateTag('tasks')
  revalidateTag(`task-${taskId}`)
}
