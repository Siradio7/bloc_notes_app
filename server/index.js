import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import notesRoutes from "./routes/notes.js"
import authRoutes from './routes/users.js'

const app = express()
app.use(express.json())
app.use(cors())


dotenv.config()

const PORT = process.env.PORT || 5000
const URI = process.env.URI

app.use("/notes", notesRoutes)
app.use("/auth", authRoutes)

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected")
    app.listen(PORT, start_callback)
}).catch(err => console.log(err))

const start_callback = () => { 
    console.log(`Server started on http://localhost:${PORT}`)
}
