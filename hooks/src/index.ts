import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const client = new PrismaClient()
app.get("/hooks/catch/:userid/:zapid",async (req, res) => {
    const { userid, zapid } = req.params;
    // const secret = req.headers["x-secret"];
    const { body } = req;
    await client.$transaction(async tx=>{
        const run=await client.zapRun.create({
            data: {
                zapId: zapid,
                
                metadata:{
                    userID:userid,
                    testUser:"Somu Kandula"
                }
            }
        });
        await client.zapRunOutbox.create({
            data:{
                zapRunId:run.id
            }
        })


    })
    return res.send("ok");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});