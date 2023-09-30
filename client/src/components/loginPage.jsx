import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineExclamationCircle } from "react-icons/ai"
import * as yup from "yup";
import { useLoginMutation } from "../api/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
	email: yup.string().email().required('Email obligatoire'),
	password: yup.string().min(3, 'Il faut au moins 4 caracteres').required(),
});

export default function LoginPage() {
	const [showError, setShowError] = useState(false)

	const { register, handleSubmit, formState: { errors }, reset } = useForm({
		resolver: yupResolver(schema)
	});

	const navigate = useNavigate();
	const [login, { data, isLoading, isSuccess, isError, error }] = useLoginMutation();

	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem('user', JSON.stringify(data))
			reset()
			navigate('/notes');
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
            setShowError(true)
        }
	}, [isError])

	const onSubmit = (data) => {
		login(data);
	};

	return (
		<div className="min-h-screen w-full bg-blue-950 grid grid-cols-1 place-items-center my_background">
			<div className="px-8 w-full flex place-items-center flex-col">
				<h1 className="text-3xl font-bold text-white text-center mb-4">Se connecter</h1>
				
				
				<form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4 w-full max-w-lg mt-4">
					{
						showError ? <div className="flex items-center px-4 w-full h-10 bg-red-800 rounded-lg"> 
							<AiOutlineExclamationCircle className="text-2xl" /> <p className="px-2 font-bold">Erreur, les identifiants sont incorrects</p> 
						</div> : null
					}
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
							{isLoading ? 'Chargement...' : 'Se connecter'}
						</button>

						<Link to={"/signup"} className="outline-1 text-blue-500 outline outline-blue-400 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded" >
							S'inscrire
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
