import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { useSession } from '../context/auth.js' 

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const { userLogin } = useSession()


	const handleLogin = useCallback(
		async (e) => {
		  e.preventDefault()
		  await userLogin(username, password)
		},
		[userLogin, password, username],
	  )

	return (
		<>
			<div className="flex flex-col min-h-screen" >
				<div className="flex flex-1 items-center justify-center">
					<div className="px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
						<form className="text-center" onSubmit={handleLogin}>
							<h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-black">Sign in</h1>
							<div className="py-2 text-left">
								<input
									type="text"
									className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									placeholder="Username"
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="py-2 text-left">
								<input
									type="password"
									className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="py-2">
								<button
									type="submit"
									className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700"
								>
									Sign In
								</button>
							</div>
						</form>
						<div className="font-Kanit font-light text-md text-center mt-6">
							<span>Don't have an account?</span>
							<Link to="/register" className="text-indigo-600 underline hover:text-indigo-800">
								Create One
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
