import { Prisma, PrismaClient, Task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: string } | {success: string} | void>
) {
  try {
    await new PrismaClient().task.create({
      data: req.body,
    });
    res.status(202).json({ success: "task created" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
