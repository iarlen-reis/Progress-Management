import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    increment: z.number(),
    date: z.string(),
    taskId: z.string(),
  })

  const { taskId, name, description, increment, date } = bodySchema.parse(
    await request.json(),
  )

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  })

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  const entry = await prisma.entry.create({
    data: {
      name,
      description,
      increment,
      date,
      taskId,
    },
  })

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      progress: task.progress + increment,
    },
  })

  return NextResponse.json(entry)
}
