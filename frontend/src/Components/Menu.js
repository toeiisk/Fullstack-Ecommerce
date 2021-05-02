import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ isOpen, toggle, user, logout }) => {
	return (
		<>
			<div
				className={isOpen ? 'grid grid-rows-4 text-center items-center py-5 text-white' : 'hidden'}
				onClick={toggle}
				style={{ backgroundColor: '#181818' }}
			>
				<Link to="/home" className="text-xl font-mono py-3">
					Home
				</Link>
				<Link to="/product" className="text-xl font-mono py-3">
					Product
				</Link>
				<Link to="/product" className="text-xl font-mono py-3">
					Promotions
				</Link>
				{user !== null ? (
					<div className="text-xl font-mono py-3" onClick={logout}>
						Logout
					</div>
				) : (
					<Link to="/login" className="text-xl font-mono py-3">
						Login
					</Link>
				)}
			</div>
		</>
	);
};

export default Menu;
