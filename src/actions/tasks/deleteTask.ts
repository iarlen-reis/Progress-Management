'use server'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const deleteTask = async (data: FormData) => {
  const dataSchema = z.object({
    id: z.string(),
  })

  const { id } = dataSchema.parse({
    id: data.get('id'),
  })

  await fetch(`http://localhost:3000/api/task/${id}`, {
    method: 'DELETE',
  })

  revalidateTag('tasks')
}
