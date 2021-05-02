import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';

//ICONS
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai';

const NavbarAdmin = ({ toggle, user, logout }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<nav
				className="h-30 lg:px-20 lg:py-3 py-5 px-5 mx-auto flex items-center justify-between font-Mitr relative"
				role="navigation"
				style={{ backgroundColor: '#181818' }}
			>
				<Link to="/admin" className="items-center lg:block hidden">
					<img className="mr-10 h-20 w-30" src="/img/logo.png" alt="logo" />
				</Link>

				<Hidden mdUp>
					<Link to="/admin">
						<h1 className="text-3xl font-Kanit font-bold text-white">PRAMEKUB</h1>
					</Link>
				</Hidden>

				<div className="flex items-center">
					<div className="lg:block hidden text-white">
						<Link to="/admin" className="ml-10 text-xl hover:underline">
							Dashboard
						</Link>
						<Link to="/admin/products" className="ml-10 text-xl hover:underline">
							Product
						</Link>
						<Link to="/admin/promotions" className="ml-10 text-xl hover:underline">
							Promotions
						</Link>
						<Link to="/admin/orders" className="ml-10 text-xl hover:underline">
							Orders
						</Link>
					</div>
					{user !== null ? (
						<React.Fragment>
							<div className="flex items-center">
								<div className=" ml-10 cursor-pointer">
									<AiOutlineUser color="white" className="h-7 w-7" onClick={handleClick} />
									<Menu
										id="simple-menu"
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={handleClose}
									>
										<MenuItem onClick={handleClose}>
											<Link to="/customer" className="text-lg font-Mitr hover:underline">
												Profile
											</Link>
										</MenuItem>
										<MenuItem onClick={logout}>
											<p className="text-lg font-Mitr hover:underline">Logout</p>
										</MenuItem>
									</Menu>
								</div>
								<div className="ml-10 cursor-pointer lg:hidden">
									<AiOutlineMenu color="white" className="h-7 w-7" onClick={toggle} />
								</div>
							</div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<div className="ml-10 cursor-pointer lg:hidden">
								<AiOutlineMenu color="white" className="h-7 w-7" onClick={toggle} />
							</div>
						</React.Fragment>
					)}
				</div>
			</nav>
		</>
	);
};

export default NavbarAdmin;
