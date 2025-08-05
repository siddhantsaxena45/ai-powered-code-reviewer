import express from "express";
import aiRoutes from "./routes/ai.routes.js"; 
import cors from "cors"


const app = express();
const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(express.json());



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/ai", aiRoutes); 

export default app;
