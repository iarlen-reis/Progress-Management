'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const createEntry = async (data: FormData) => {
  const dataSchema = z.object({
    name: z.string(),
    description: z.string(),
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

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  })

  if (task) {
    await prisma.entry.create({
      data: {
        name,
        description,
        increment,
        taskId,
        date,
      },
    })

    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        progress: {
          increment,
        },
      },
    })
  }

  revalidatePath('/', 'page')
  revalidatePath(`/task/${taskId}`, 'page')
  redirect(`/task/${taskId}`)
}
