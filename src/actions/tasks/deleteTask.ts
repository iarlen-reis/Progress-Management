'use server'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const deleteTask = async (data: FormData) => {
  const session = await getServerSession(authOptions)

  const dataSchema = z.object({
    id: z.string(),
  })

  const { id } = dataSchema.parse({
    id: data.get('id'),
  })

  await fetch(`http://localhost:3000/api/task/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session?.user.id}`,
    },
  })

  revalidateTag('tasks')
}
