import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  const userId = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
  })

  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    progress: z.number(),
    deadline: z.string(),
    target: z.number(),
    userId: z.string(),
  })

  const { userId, name, description, deadline, progress, target } =
    bodySchema.parse(await request.json())

  const task = await prisma.task.create({
    data: {
      name,
      description,
      deadline,
      progress,
      target,
      userId,
    },
  })

  return NextResponse.json(task)
}
