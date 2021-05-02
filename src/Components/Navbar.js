import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { GET_PRODUCTS } from '../Pages/Admin/Products/GraphQL/Querie';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

//ICONS
import { AiOutlineUser, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineMenu } from 'react-icons/ai';

const Navbar = ({ toggle, user, logout }) => {
	const { loading, data, error } = useQuery(GET_PRODUCTS);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleSearch = (event, value) => {
		if (value === null) {
			navigate(`/product`);
		} else {
			navigate(`/product/${value.slug}`);
		}
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	if (loading) return '...Loading';
	if (error) return `Error! ${error}`;
	return (
		<>
			<nav
				className="h-30 lg:px-20 lg:py-3 py-5 px-5 mx-auto flex items-center justify-between font-Mitr relative"
				role="navigation"
				style={{ backgroundColor: '#181818' }}
			>
				<Link to="/home" className="items-center lg:block hidden">
					<img className="mr-10 h-20 w-30" src="/img/logo.png" alt="logo" />
				</Link>

				<Autocomplete
					className="w-full lg:px-10"
					options={data.allProduct}
					getOptionLabel={(option) => `${option.name}`}
					listStyle={{ maxHeight: 20, overflow: 'auto' }}
					onChange={handleSearch}
					renderInput={(params) => (
						<TextField {...params} label="Item, Brands, Model" variant="outlined" className="bg-white" />
					)}
				/>

				<div className="flex items-center">
					<div className="lg:block hidden text-white">
						<Link to="/home" className="text-xl hover:underline ">
							Home
						</Link>
						<Link to="/product" className="ml-10 text-xl hover:underline ">
							Product
						</Link>
						<Link to="/promotion" className="ml-10 text-xl hover:underline ">
							Promotions
						</Link>
						{user !== null ? null : (
							<Link to="/login" className="ml-10 text-xl hover:underline ">
								Login
							</Link>
						)}
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
											<Link to="/">
												<p className="text-lg font-Mitr hover:underline">Logout</p>
											</Link>
										</MenuItem>
									</Menu>
								</div>
								<div className=" ml-5 cursor-pointer">
									<Link to="/cart">
										<AiOutlineShoppingCart color="white" className="h-7 w-7" />
									</Link>
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

export default Navbar;
