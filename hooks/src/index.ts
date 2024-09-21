import express from "express";

const app = express();

app.get("/hooks/catch/:userid/:zapid", (req, res) => {
    const { userid, zapid } = req.params;
    // const secret = req.headers["x-secret"];
    const { body } = req;
    console.log(userid, zapid, body);
    res.send("ok");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});