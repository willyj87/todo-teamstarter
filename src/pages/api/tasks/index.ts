import { PrismaClient, Task } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
) {
  const tasks = await new PrismaClient().task.findMany();
  res.status(200).json(tasks)
}
