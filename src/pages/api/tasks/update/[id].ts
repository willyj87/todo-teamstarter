import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: string } | { success: string }>
) {
  try {
    if (req.query.id) {
      await new PrismaClient().task.update({
        where: {
          id: +req.query?.id,
        },
        data: {
            isDone: req.body.isDone
        }
      });
      res.status(200).json({ success: "Task deleted" });
    } else {
      res.status(400).json({ error: `Bad request query: ${req.query}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Task not deleted" });
  }
}
