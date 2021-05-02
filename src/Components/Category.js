import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import { GET_PRODUCTS } from '../Pages/Admin/Products/GraphQL/Querie';
import { useQuery } from '@apollo/client';

const Category = () => {
	const itemsPerPage = 8;
	const [page, setPage] = useState(1);
	const { loading, error, data } = useQuery(GET_PRODUCTS);
	const [dataProduct, setData] = useState([]);
	const [noOfPages, setNoPages] = useState('');

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
		<div className="w-full text-black font-Kanit">
			<div class="container mx-auto py-8 px-5 min-h-screen font-Kanit">
				<h1
					data-aos="fade-right"
					data-aos-duration="1000"
					className="my-4 lg:text-5xl text-3xl font-bold leading-tight font-Mitr text-red-500"
				>
					Recommended
				</h1>
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
				<div>
					<Link to="/product">
						<button class="block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 transition-colors text-white rounded-lg px-3 py-3 font-semibold font-Mitr shadow-lg my-10">
							All Products
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Category;
