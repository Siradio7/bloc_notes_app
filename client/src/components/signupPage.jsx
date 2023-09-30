import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSignupMutation } from "../api/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const schema = yup.object().shape({
	first_name: yup.string().min(4, 'Entrez au moins 4 caractères'),
	last_name: yup.string().min(2, 'Entrez au moins 2 caractères'),
	email: yup.string().email().required('Email obligatoire'),
	password: yup.string().min(3, 'Il faut au moins 4 caracteres').required()
});

export default function SignupPage() {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})

	const navigate = useNavigate();
	const [signup, { data, isLoading, isSuccess, isError, error }] = useSignupMutation()

	useEffect(() => {
		if (isSuccess) {
			navigate('/')
		}
	}, [isSuccess])

	const onSubmit = (data) => {
		signup(data)
	}

	return (
		<div className="min-h-screen w-full bg-blue-950 grid grid-cols-1 place-items-center my_background">
			<div className="px-8 w-full flex place-items-center flex-col">
				<h1 className="text-3xl font-bold text-white text-center mb-4">Inscription</h1>
				<form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4 w-full max-w-lg mt-4">
                <div className="flex flex-col space-y-2">
						<label className="font-semibold text-white text-lg w-full" htmlFor="email">
							Nom
						</label>
						<input
							{...register("last_name")}
							type="text"
							name="last_name"
							id="last_name"
							className="border opacity-50 border-gray-400 rounded-lg p-2"
						/>
						{
							errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>
						}
					</div>

                    <div className="flex flex-col space-y-2">
						<label className="font-semibold text-white text-lg w-full" htmlFor="email">
							Prenom
						</label>
						<input
							{...register("first_name")}
							type="text"
							name="first_name"
							id="first_name"
							className="border opacity-50 border-gray-400 rounded-lg p-2"
						/>
						{
							errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>
						}
					</div>

					<div className="flex flex-col space-y-2">
						<label className="font-semibold text-white text-lg w-full" htmlFor="email">
							Email
						</label>
						<input
							{...register("email")}
							type="email"
							name="email"
							id="email"
							className="border opacity-50 border-gray-400 rounded-lg p-2"
						/>
						{
							errors.email && <p className="text-red-500">{errors.email.message}</p>
						}
					</div>
					<div className="flex flex-col space-y-2 w-full">
						<label className="font-semibold text-white text-lg w-full" htmlFor="password">Mot de passe</label>
						<input
							{...register("password")}
							type="password"
							name="password"
							id="password"
							className="border opacity-50 border-gray-400 rounded-lg p-2"
						/>
						{
							errors.password && <p className="text-red-500">{errors.password.message}</p>
						}
					</div>

					<div className="flex justify-between pt-4">
						<button
							type="submit"
							className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading ? 'bg-blue-200 cursor-not-allowed' : ''}`}
						>
							{isLoading ? 'Chargement...' : "Enregistrer"}
						</button>

						<Link to={"/"} className="outline-1 text-blue-500 outline outline-blue-400 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded" >
							Se connecter
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
