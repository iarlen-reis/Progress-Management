import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const id = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: id,
      },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  const id = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    progress: z.number(),
    deadline: z.string(),
    target: z.number(),
  })

  const { name, description, deadline, progress, target } = bodySchema.parse(
    await request.json(),
  )

  const task = await prisma.task.create({
    data: {
      name,
      description,
      deadline,
      progress,
      target,
      userId: id,
    },
  })

  return NextResponse.json(task)
}
