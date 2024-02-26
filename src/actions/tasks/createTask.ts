'use server'
import prisma from '@/lib/prisma'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const createTask = async (data: FormData) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      error: 'Unauthorized',
      status: 401,
    }
  }

  const dataSchema = z.object({
    name: z.string(),
    description: z.string(),
    progress: z.number(),
    target: z.number(),
    deadline: z.string().transform((value) => new Date(value).toISOString()),
  })

  const { name, description, progress, target, deadline } = dataSchema.parse({
    name: data.get('name'),
    description: data.get('description'),
    progress: Number(data.get('progress')),
    target: Number(data.get('target')),
    deadline: data.get('deadline'),
  })

  const task = await prisma.task.create({
    data: {
      name,
      description,
      progress,
      target,
      deadline,
      userId: session?.user.id,
    },
  })

  revalidateTag('tasks')
  redirect(`/task/${task.id}`)
}
