import { PrismaClient, Task } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | { error: string } | null>
) {
  try {
    if (req.query.id) {
      const task = await new PrismaClient().task.findUnique({
        where: {
          id: +req.query?.id,
        },
      });
      res.status(200).json(task);
    } else {
      res.status(400).json({ error: `Bad request query: ${req.query}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Task not deleted" });
  }
}
