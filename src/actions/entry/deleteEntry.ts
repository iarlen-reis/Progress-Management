'use server'
import prisma from '@/lib/prisma'
import { authOptions } from '@/utils/authOptions'
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

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  })

  if (!task) {
    return {
      error: 'Task not found',
      status: 404,
    }
  }

  if (task.userId !== session?.user.id) {
    return {
      error: 'Unauthorized',
      status: 401,
    }
  }

  await prisma.entry.delete({
    where: {
      id,
    },
  })

  revalidateTag('tasks')
  revalidateTag(`task-${taskId}`)
}
