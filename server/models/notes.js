import mongoose, { mongo } from "mongoose"

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    },

    categorie: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Note = mongoose.model("note", NoteSchema)

export default Note