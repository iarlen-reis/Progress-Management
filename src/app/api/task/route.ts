import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const id = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const page = Number(request.nextUrl.searchParams.get('page')) ?? 1
    const filter = request.nextUrl.searchParams.get('filter')

    const PER_PAGE = 4

    if (!filter) {
      const totalTasks = await prisma.task.count({
        where: {
          userId: id,
        },
      })

      const maxPage = Math.ceil(totalTasks / PER_PAGE)
      const existsNextPage = page < maxPage
      const existsPreviousPage = page > 1

      const tasks = await prisma.task.findMany({
        where: {
          userId: id,
        },
        take: PER_PAGE,
        skip: (page - 1) * PER_PAGE,
      })

      return NextResponse.json({
        page,
        maxPage,
        tasks,
        existsNextPage,
        existsPreviousPage,
      })
    }

    const totalTasks = await prisma.task.count({
      where: {
        userId: id,
        name: {
          contains: filter,
          mode: 'insensitive',
        },
      },
    })

    const maxPage = Math.ceil(totalTasks / PER_PAGE)
    const existsNextPage = page < maxPage
    const existsPreviousPage = page > 1

    const tasks = await prisma.task.findMany({
      where: {
        userId: id,
        name: {
          contains: filter,
          mode: 'insensitive',
        },
      },
    })

    return NextResponse.json({
      page,
      maxPage,
      tasks,
      existsNextPage,
      existsPreviousPage,
    })
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
