import { getNotes, getNoteById, addNote, updateNote, deleteNote } from "../controllers/notes.js"
import express from "express"

const router = express.Router()

router.get("/", getNotes)
router.get("/:id", getNoteById)
router.post("/", addNote)
router.patch("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router