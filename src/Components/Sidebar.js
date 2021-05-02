import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<React.Fragment>
			<div className="flex flex-col text-center lg:text-left lg:p-8 p-5 m-5 bg-gray-200 drop-shadow-lg w-full lg:w-80 lg:h-40">
				<Link to="/customer">
					<h1 class="text-black text-lg lg:text-xl font-bold leading-tight hover:underline my-2">Customer</h1>
				</Link>
				<Link to="/customer/order">
					<h1 class="text-black text-lg lg:text-xl font-bold leading-tight hover:underline my-2">
						Customer order
					</h1>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Sidebar;
