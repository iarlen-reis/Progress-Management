import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  const userId = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const paramSchema = z.object({
    id: z.string(),
  })

  const { id } = paramSchema.parse(params)

  const entry = await prisma.entry.findUnique({
    where: {
      id,
    },
  })

  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
  }

  const task = await prisma.task.findUnique({
    where: {
      id: entry.taskId,
    },
  })

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  if (task.userId !== userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json(entry)
}

export async function PUT(request: NextRequest, { params }: Params) {
  const userId = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const paramSchema = z.object({
    id: z.string(),
  })

  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    increment: z.number(),
    date: z.string(),
  })

  const { id } = paramSchema.parse(params)

  const { name, description, increment, date } = bodySchema.parse(
    await request.json(),
  )

  const entry = await prisma.entry.findUnique({
    where: {
      id,
    },
  })

  const task = await prisma.task.findUnique({
    where: {
      id: entry?.taskId,
    },
  })

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  if (task.userId !== userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.entry.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      increment,
      date,
    },
  })

  return NextResponse.json(entry)
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const userId = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const paramSchema = z.object({
    id: z.string(),
  })

  const { id } = paramSchema.parse(params)

  const entry = await prisma.entry.findUnique({
    where: {
      id,
    },
  })

  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
  }

  const task = await prisma.task.findUnique({
    where: {
      id: entry.taskId,
    },
  })

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  if (task.userId !== userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.entry.delete({
    where: {
      id,
    },
  })

  await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      progress: task.progress - entry.increment,
    },
  })

  return NextResponse.json(entry)
}
