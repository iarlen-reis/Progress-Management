'use server'
import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const deleteTask = async (data: FormData) => {
  const dataSchema = z.object({
    id: z.string(),
  })

  const { id } = dataSchema.parse({
    id: data.get('id'),
  })

  await prisma.task.delete({
    where: {
      id,
    },
  })

  revalidateTag('tasks')
}
