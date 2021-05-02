import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

//COMPONENTS
import Footer from '../Footer';
import Topbar from '../Navbar';
import Menu from '../Menu';
import TobBarAdmin from '../NavbarAdmin'
import MenuAdmin from '../MenuAdmin'
import { useSession } from '../../context/auth'


const Navbar = () => {
	const [isOpen, setOpen] = useState(false);
	const { loading, user, logout: handleLogout } = useSession()
	const toggle = () => {
		setOpen(!isOpen);
	};
	
	return (
		<div>
			{user?.isStaff && user !== null ? <TobBarAdmin toggle={toggle} user={user} logout={handleLogout}/> : <Topbar toggle={toggle} user={user} logout={handleLogout}/>}
			{user?.isStaff && user !== null ? <MenuAdmin isOpen={isOpen} toggle={toggle} user={user} logout={handleLogout} /> : <Menu isOpen={isOpen} toggle={toggle} user={user} logout={handleLogout}/>}
			<Outlet />
			<Footer />
		</div>
	);
};

export default Navbar;
