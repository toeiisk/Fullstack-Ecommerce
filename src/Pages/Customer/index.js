import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../../context/auth';

const Customer = () => {
	const { user } = useSession()
	return (
		<>
			<div className="flex flex-col lg:flex-row items-center w-full text-left lg:p-8 p-5 m-5 border-2 border-gray-200 font-Kanit">
				<div class="flex flex-col text-left lg:ml-10 lg:mt-0 mt-5">
					<h2 class="block leading-relaxed font-bold text-3xl mt-3">{user?.firstname} {user?.lastname}</h2>
					<h2 class="block leading-relaxed font-medium text-xl mt-3">{user?.phone}</h2>
					<h2 class="block leading-relaxed font-medium text-xl mt-3">{user?.email}</h2>
					<h2 class="block leading-relaxed font-medium text-xl mt-3">
						{user?.address}
					</h2>
					<div className="my-3">
						<Link to="/customer/editprofile">
							<button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 w-52">
								Edit Profile
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Customer;
