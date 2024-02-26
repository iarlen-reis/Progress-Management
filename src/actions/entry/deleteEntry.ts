'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const deleteEntry = async (data: FormData) => {
  const dataSchema = z.object({
    id: z.string(),
  })

  const { id } = dataSchema.parse({
    id: data.get('id'),
  })

  const entry = await prisma.entry.findUnique({
    where: {
      id,
    },
  })

  if (entry) {
    await prisma.entry.delete({
      where: {
        id,
      },
    })

    await prisma.task.update({
      where: {
        id: entry.taskId,
      },
      data: {
        progress: {
          decrement: entry.increment,
        },
      },
    })
  }

  revalidatePath(`/task/${entry?.taskId}`, 'page')
}
