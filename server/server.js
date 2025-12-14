import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from "@clerk/express"
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoutes.js"
import connectCloudinary from "./configs/cloudinary.js"
import roomRouter from "./routes/roomRoutes.js"

connectDB()
connectCloudinary()



const app = express()
app.use(cors())

// 🔴 Clerk webhook must be RAW
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
)

// normal middleware
app.use(express.json())
app.use(clerkMiddleware())

app.get("/", (req, res) => res.end("API is working"))
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
)
