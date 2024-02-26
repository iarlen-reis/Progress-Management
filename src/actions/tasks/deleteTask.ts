'use server'
import prisma from '@/lib/prisma'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const deleteTask = async (data: FormData) => {
  const session = await getServerSession(authOptions)

  const dataSchema = z.object({
    id: z.string(),
  })

  const { id } = dataSchema.parse({
    id: data.get('id'),
  })

  const task = await prisma.task.findUnique({
    where: {
      id,
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

  await prisma.task.delete({
    where: {
      id,
    },
  })

  revalidateTag('tasks')
}
