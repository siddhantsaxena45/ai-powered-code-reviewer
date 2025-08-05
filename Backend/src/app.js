import express from "express";
import aiRoutes from "./routes/ai.routes.js"; 
import cors from "cors"

const app = express();
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://ai-powered-code-reviewer-chi.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/ai", aiRoutes); 

export default app;
