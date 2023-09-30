import mongoose from "mongoose"
import Note from "../models/notes.js"

export const getNotes = async (req, res) => { 
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;

    try {
        const notes = await Note.find();
        const response = { page, limit, data: notes };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getNoteById = async (req, res) => { 
    const { id } = req.params

    try {
        const note = await Note.findById(id)
        res.status(200).json(note)
    }catch(err) {
        res.status(500).json({ message: err.message })
    }
}

export const addNote = async (req, res) => { 
    const note = req.body
    const newNote = new Note({...note})

    try {
        await newNote.save()

        res.status(201).json(newNote)
    }catch(err) { 
        res.status(409).json({ message: err.message })
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params
    const note = req.body

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Note avec cet identifiant n'existe pas")

    try {
        const updateNote = await Note.findByIdAndUpdate(id, note, { new: true }) 

        res.status(200).json(updateNote)
    } catch (err) { 
        res.status(500).json({ message: err.message })
    }
}

export const deleteNote = async (req, res) => { 
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Note avec cet identifiant n'existe pas")

    try {
        await Note.findByIdAndDelete(id)
        
        res.status(200).json({ message: "Note supprimée avec succes!" })
    } catch (err) { 
        res.status(500).json({ message: err.message })
    }
}