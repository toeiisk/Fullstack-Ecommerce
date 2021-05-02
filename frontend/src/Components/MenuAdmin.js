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
				<Link to="/admin" className="text-xl font-mono py-3">
					Dashboard
				</Link>
				<Link to="/admin/products" className="text-xl font-mono py-3">
					Product
				</Link>
				<Link to="/admin/promotions" className="text-xl font-mono py-3">
					Promotions
				</Link>
				<Link to="/admin/orders" className="text-xl font-mono py-3">
					Orders
				</Link>
				{user !== null ? (
					<div className="text-xl font-mono py-3" onClick={logout}>
						Logout
					</div>
				) : null}
			</div>
		</>
	);
};

export default Menu;
