'use server'
import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
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

  await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  })

  await prisma.entry.create({
    data: {
      name,
      description,
      increment,
      taskId,
      date,
    },
  })

  revalidateTag('tasks')
  redirect(`/task/${taskId}`)
}
