import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const client = new PrismaClient();
app.use(express.json());
app.get("/hooks/catch/:userid/:zapid", async (req, res) => {
  const { userid, zapid } = req.params;
  // const secret = req.headers["x-secret"];
  const body = req.body;
  console.log(body, userid);
  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapid,
        metadata: body,
      },
    });
    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
  return res.send("ok");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
