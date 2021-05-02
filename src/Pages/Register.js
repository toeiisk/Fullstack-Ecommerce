import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { REGISTER } from "./GraphQL/Mutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";


const Register = () => {

	const [firstname, setFirstname] = useState('')
	const [username, setUsername] = useState('')
	const [lastname, setLastname] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [conPassword, setConPassword] = useState('')
	const [address, setAddress] = useState('')
	const [register] = useMutation(REGISTER);
	let navigate = useNavigate();

	const onSubmitRegister = useCallback(
		async (event) => {
			event.preventDefault()
			const variables = {
				record: {
					username: username,
					email: email,
					isStaff: false,
					firstname: firstname,
					lastname: lastname,
					address: address,
					phone: phone,
					password: password
				},
			};
			try {
				await register({ variables });
				alert("บันทึกข้อมูลสำเร็จ");
				navigate(`/login`)
			} catch (err) {
				console.log(err);
				alert("เกิดข้อผิดพลาด");
			}
		},
		[username, email, lastname, firstname, password, address]
	);
	return (
		<>
			<div className="min-h-screen flex flex-col">
				<div className="flex flex-1 items-center justify-center">
					<div className="px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
						<form className="text-center" onSubmit={onSubmitRegister}>
							<h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">Sign up</h1>
							<div className="py-2 text-left">
								<input
									type="text"
									className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									placeholder="Firstname"
									required
									onChange={(e) => setFirstname(e.target.value)}
								/>
							</div>
							<div className="py-2 text-left">
								<input
									type="text"
									className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									placeholder="Lastname"
									required
									onChange={(e) => setLastname(e.target.value)}

								/>
							</div>
							<div className="py-2 text-left">
								<input
									type="email"
									className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									placeholder="Email"
									required
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="py-2 text-left">
								<input
									type="tel"
									className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									placeholder="Phone"
									required
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
							<div className="py-2 text-left">
								<input
									type="text"
									className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									placeholder="Username"
									required
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="py-2 text-left">
								<input
									type="password"
									className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									placeholder="Password"
									required
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="py-2 text-left">
								<input
									type="password"
									className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									placeholder="Confirm Password"
									required
									onChange={(e) => setConPassword(e.target.value)}
								/>
							</div>
							{password !== conPassword ? (<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1">
								Password does't match !!
							</span>) : null}
							<div className="py-2 text-left">
								<textarea
									rows="5"
									name="message"
									id="message"
									placeholder="Address"
									class="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
									required
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
							<div className="py-2">
								<button
									type="submit"
									className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700"
								>
									Submit
								</button>
							</div>
						</form>
						<div className="font-Kanit font-light text-md text-center mt-6">
							<span>Already have an account? </span>
							<Link to="/login" className="font-Kanit font-light text-md text-indigo-600 underline hover:text-indigo-800 shadow-xl">
								Sign in
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
