import React, { useEffect, useCallback, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
import { Hidden } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GET_PRODUCTS } from '../Admin/Products/GraphQL/Querie';
import { useQuery } from '@apollo/client';
import LinesEllipsis from 'react-lines-ellipsis';
import { useSession } from '../../context/auth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	ul: {
		'& .MuiPaginationItem-root': {
			color: '#fff',
		},
	},
}));

const Product = () => {
	const itemsPerPage = 8;
	const classes = useStyles();
	const [page, setPage] = useState(1);
	const { loading, error, data } = useQuery(GET_PRODUCTS);
	const [dataProduct, setData] = useState([]);
	const [noOfPages, setNoPages] = useState('');
	const handleChange = (event, value) => {
		setPage(value);
	};

	const handleOnClick = (value) => {
		const TypeProduct =
			value === 'Allproduct' ? data.allProduct : data.allProduct.filter((item) => item.productType[0] === value);
		setData(TypeProduct);
	};

	useEffect(() => {
		setNoPages(Math.ceil(dataProduct?.length / itemsPerPage));
	}, [dataProduct]);

	useEffect(() => {
		setData(data?.allProduct);
		setNoPages(Math.ceil(dataProduct?.length / itemsPerPage));
	}, [data]);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	return (
		<React.Fragment>
			<header
				class="bg-fixed bg-no-repeat bg-center bg-cover relative font-Kanit"
				style={{ backgroundImage: 'url(img/bg.jpg)' }}
			>
				<div class="flex flex-col items-center justify-center py-20 container mx-auto">
					<h1
						data-aos="fade-right"
						data-aos-duration="1000"
						data-aos-easing="ease-in-sine"
						class="text-white font-bold leading-tight lg:text-8xl text-5xl"
					>
						Products
					</h1>
					<img className="object-contain h-96" src="/img/hero2.png" alt="image hero" />
				</div>
			</header>
			<nav role="navigation" style={{ backgroundColor: '#1b1b1b' }}>
				<div className="flex items-center justify-center font-Kanit relative lg:py-10 py-5 text-white">
					<div className="flex items-center overflow-x-auto no-scrollbar px-5">
						<Link to="#" className="text-lg lg:text-xl hover:underline" onClick={() => handleOnClick('Allproduct')}>
							Allproduct
						</Link>
						<Link
							to="#"
							className="ml-10 text-lg lg:text-xl hover:underline"
							onClick={() => handleOnClick('Headphones')}
						>
							Headphones
						</Link>
						<Link
							to="#"
							className="ml-10 text-lg lg:text-xl hover:underline"
							onClick={() => handleOnClick('Keyboard')}
						>
							Keyboard
						</Link>
						<Link to="#" className="ml-10 text-lg lg:text-xl hover:underline" onClick={() => handleOnClick('Mouse')}>
							Mouse
						</Link>
						<Link
							to="#"
							className="ml-10 text-lg lg:text-xl hover:underline"
							onClick={() => handleOnClick('Sound card')}
						>
							Sound Card
						</Link>
						<Link
							to="#"
							className="ml-10 text-lg lg:text-xl hover:underline"
							onClick={() => handleOnClick('Game controller')}
						>
							Controller
						</Link>
						<Link
							to="#"
							className="ml-10 text-lg lg:text-xl hover:underline "
							onClick={() => handleOnClick('Chair')}
						>
							Gaming Chair
						</Link>
						<Link
							to="#"
							className="ml-10 text-lg lg:text-xl hover:underline "
							onClick={() => handleOnClick('Monitor')}
						>
							Monitor
						</Link>
					</div>
				</div>
			</nav>
			<div class="container mx-auto py-10 px-5 min-h-screen font-Kanit">
				<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
					{dataProduct?.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => {
						return (
							<div
								className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl"
								key={index}
							>
								<div>
									<p className="lg:text-2xl md:text-xl uppercase text-gray-900 font-bold">
										{item.name}
									</p>
								</div>
								<div className="py-3">
									<img src={item.image} className="w-full object-cover object-center" />
								</div>
								<div className="grid gap-5">
									<p className="uppercase text-md text-gray-400">
										<LinesEllipsis
											text={item.description}
											maxLine="3"
											ellipsis="..."
											trimRight
											basedOn="letters"
										/>
									</p>

									<Link to={`/product/${item.slug}`}>
										<button class="tracking-wider border-2 border-gray-300 hover:bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full w-full py-2">
											Read more...
										</button>
									</Link>
									{item.discountedPercent !== 0 ? (
										<React.Fragment>
											<div className="flex flex-col md:flex-col justify-between items-center text-gray-900">
												<p className="font-bold text-2xl text-red-500">
													{item.discountedPrice} ฿
												</p>
												<div className="flex justify-evenly items-center">
													<p className="font-bold text-xl text-gray-500 line-through mx-2">
														{item.price} ฿
													</p>
													<p className="bg-gray-500 text-white text-center text-sm font-bold py-1 px-1 rounded-lg">
														-{item.discountedPercent}%
													</p>
												</div>
											</div>
										</React.Fragment>
									) : (
										<div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
											<p className="font-bold text-xl "> {item.price} $</p>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-center mt-5" style={{ backgroundColor: '#1b1b1b' }}>
				<Pagination
					count={noOfPages}
					page={page}
					onChange={handleChange}
					defaultPage={1}
					variant="outlined"
					shape="rounded"
					size="large"
					showFirstButton
					showLastButton
					className="py-5"
					classes={{ ul: classes.ul }}
				/>
			</div>
		</React.Fragment>
	);
};

export default Product;
