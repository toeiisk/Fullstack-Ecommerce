import React, { useState } from 'react';

const EditProfile = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
	return (
		<div className="w-full container mx-auto px-5 font-Kanit">
			<form className="lg:border-2 lg:border-gray-200 lg:p-10 m-5">
				<h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-black">Edit Profile</h1>
				<div className="py-2 text-left">
					<input
						type="text"
						className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
						placeholder="Name"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="py-2 text-left">
					<input
						type="text"
						className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
						placeholder="Phone"
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
				<div className="py-2 text-left">
					<input
						type="email"
						className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="py-2 text-left">
					<textarea
						class="resize border rounded-lg bg-gray-100 block w-full py-2 px-4"
						placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<div className="py-2 my-3">
					<button
						type="submit"
						className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditProfile;
