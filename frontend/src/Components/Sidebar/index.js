import React from 'react';
import { Outlet } from 'react-router-dom';

//Components
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

import { useSession } from '../../context/auth';

const CustomerNavbar = () => {
	const { user, logout: handleLogout } = useSession();
	return (
		<div>
			<Navbar user={user} logout={handleLogout} />
			<header
				class="bg-fixed bg-no-repeat bg-center bg-cover relative font-Kanit"
				style={{ backgroundColor: '#181818' }}
			>
				<div class="flex items-center justify-center py-20">
					<div class="mx-2 text-center container">
						<h1 class="text-white text-2xl font-bold leading-tight xs:text-5xl md:text-6xl">Profile</h1>
					</div>
				</div>
			</header>
			<div className="min-h-screen font-Kanit">
				<div className="container mx-auto px-5 py-5 lg:py-10">
					<div className="flex flex-col mx-auto lg:flex-row text-black items-center lg:items-stretch">
						<Sidebar />
						<Outlet />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default CustomerNavbar;
