import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

export async function GET() {
  const tasks = await prisma.task.findMany()

  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
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
    },
  })

  return NextResponse.json(task)
}
