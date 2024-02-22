import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

interface Params {
  params: {
    id: string
  }
}
export async function GET(request: Request, { params }: Params) {
  const paramSchema = z.object({
    id: z.string(),
  })

  const { id } = paramSchema.parse(params)

  const tasks = await prisma.task.findUnique({
    where: {
      id,
    },
    include: {
      entries: true,
    },
  })

  return NextResponse.json(tasks)
}

export async function PUT(request: Request, { params }: Params) {
  const paramSchema = z.object({
    id: z.string(),
  })

  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    progress: z.number(),
    deadline: z.string(),
    target: z.number(),
  })

  const { id } = paramSchema.parse(params)

  const { name, description, deadline, progress, target } = bodySchema.parse(
    await request.json(),
  )

  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      deadline,
      progress,
      target,
    },
  })

  return NextResponse.json({ task })
}

export async function DELETE(request: Request, { params }: Params) {
  const paramSchema = z.object({
    id: z.string(),
  })

  const { id } = paramSchema.parse(params)

  const task = await prisma.task.delete({
    where: {
      id,
    },
  })

  return NextResponse.json({ task })
}
