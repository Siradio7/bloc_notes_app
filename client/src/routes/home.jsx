import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TbLogout } from "react-icons/tb"
import { useAddNoteMutation, useGetNotesQuery } from "../api/note.js";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "../api/note.js"
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md"
import { FaPenSquare } from "react-icons/fa"
import { useEffect, useState } from "react";
import img_bg from "/src/assets/eleve.png"

function Note({ id, title, categorie, description, setCurrentNote }) {
    const [deleteNote, { isSuccessDelete, isErrorDelete, errorDelete }] = useDeleteNoteMutation()

    const handleDeleteClick = () => {
        deleteNote(id)
    }

    return <div className="w-full flex justify-between bg-slate-200 rounded-md py-2 px-4">
        <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <h4 className="italic text-sm mb-4 opacity-50">{categorie}</h4>
            <p>{description}</p>
        </div>

        <div className="flex space-x-4 items-center">
            <button onClick={() => setCurrentNote({id, title, categorie, description})}>
                <FaPenSquare className="text-xl text-green-700 opacity-70 hover:opacity-100" />
            </button>

            <button onClick={handleDeleteClick}>
                <MdDelete className="text-2xl text-red-700 opacity-70 hover:opacity-100" />
            </button>
        </div>
    </div>
}

export default function Notes() {
    const [currentNote, setCurrentNote] = useState(null)
    const navigate = useNavigate()
    const schema = yup.object().shape({
        title: yup.string().required('Le titre est obligatoire'),
        categorie: yup.string().required('La categorie est obligatoire'),
        description: yup.string().required("La description est obligatoire"),
    })
    
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const { data, isLoading, isSuccess, isError, error } = useGetNotesQuery()
    const [addNote, { isSuccessAdd, isErrorAdd, errorAdd }] = useAddNoteMutation()

    const display_notes = data?.data.map((note) => {
        return <Note
            key={note._id}
            id={note._id}
            title={note.title}
            categorie={note.categorie}
            description={note.description}
            setCurrentNote={setCurrentNote}
        />
    })

    useEffect(() => {
        if (currentNote !== null) {
            reset({
                id: currentNote.id,
                title: currentNote.title,
                categorie: currentNote.categorie,
                description: currentNote.description
            })
        }
    }, [currentNote])


    const handleClickSoumettre = (data) => {
        addNote(data)

        reset({})
    }

    const [updateNote, { isSuccess:isSuccessUpdate, isError:isErrorUpdate, error:errorUpdate }] = useUpdateNoteMutation()

    const handleClickUpdate = (data) => {
        updateNote(data)

        reset({})
        setCurrentNote(null)
    }

    useEffect(() => {
        if(isSuccessUpdate) {
            reset()
        }
        
    }, [isSuccessUpdate])

    const handleClickLogout = () => {
        navigate("/")
        localStorage.removeItem("user")
    }

    const  { user } = JSON.parse(localStorage.getItem("user"))
    const username = user.first_name + " " + user.last_name

    return (
        <div className="flex">
            <div className="min-h-screen w-1/2 fixed space-y-14 bg-slate-400 flex flex-col items-center">
                <div className="w-full h-14 bg-slate-200 px-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img src={img_bg} className="w-11 h-11" />
                        <h1 className="text-lg font-bold">{username}</h1>
                    </div>
                    
                    <button onClick={handleClickLogout} className="flex items-center w-1/8 h-10 outline outline-1 outline-slate-500 text-slate-500 hover:text-black p-3 rounded-md hover:bg-slate-500">
                        <TbLogout className="mr-2 text-lg" /> Deconnection
                    </button>
                </div>

                <form action="" onSubmit={currentNote === null ? handleSubmit(handleClickSoumettre) : handleSubmit(handleClickUpdate)} className="space-y-6 bg-slate-200 p-6 rounded-lg shadow-lg w-3/4">
                    {
                        currentNote !== null ? <div>
                            <input {...register("id")} type="text" id="id" name="id" hidden />
                        </div> : null
                    }

                    <div>
                        <label htmlFor="title" className="block text-lg font-medium mb-2">Titre</label>
                        <input {...register("title")} type="text" id="title" name="title" placeholder="Entrez le titre" className="w-full p-3 opacity-50 placeholder-black border rounded-md" />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-lg font-medium mb-2">Catégorie</label>
                        <Controller 
                            name="categorie"
                            control={control}
                            render={({ field }) => (
                                <select {...field} className="w-full p-3 border opacity-50 placeholder-black rounded-md">
                                    <option value="Cours">Cours</option>
                                    <option value="Courses">Courses</option>
                                    <option value="Jeux">Jeux</option>
                                </select>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
                        <textarea id="description" {...register("description")} name="description" rows="3" placeholder="Entrez la description" className="w-full p-3 border opacity-50 placeholder-black rounded-md"></textarea>
                    </div>

                    <div>
                        <button type="submit" className="w-full outline outline-1 outline-slate-500 text-slate-500 hover:text-black p-3 rounded-md hover:bg-slate-500">
                            Soumettre
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-1/2 min-h-screen ml-1/2 py-6 bg-slate-600 px-4">
                <h2 className="text-center text-2xl tracking-widest text-slate-200 font-bold ">MES NOTES</h2>

                <div className="flex flex-col space-y-2 mt-14">
                    {
                        data?.data.length !== 0 ? display_notes : <p className="text-center text-white text-xl opacity-50">LISTE VIDE</p>
                    }
                </div>
            </div>
        </div>
    )
}
