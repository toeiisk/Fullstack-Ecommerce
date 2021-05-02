import React, { useEffect, useCallback, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_PRODUCT, GET_PRODUCTS, GET_PRODUCT_BY_SLUG } from '../Admin/Products/GraphQL/Querie';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_CART } from '../Product/GraphQL/Mutation'
import {ME_QUERY} from '../GraphQL/Querie'

const Productdetail = () => {
	const navigate = useNavigate();
	const [quantity, setQuantity] = React.useState(1);
	const [addtoCart] = useMutation(ADD_CART);
	let { slug } = useParams();

	const AddToCart = async (value) => {
		const variables = {
			productItem: value
		};
		try {
			await addtoCart({ variables, refetchQueries:[{query: ME_QUERY}] });
			alert("เพิ่มสินค้าลงตะกร้าแล้ว");
			setQuantity(1)
		} catch (err) {
			console.log(err);
			alert("เกิดข้อผิดพลาด");
		}
	}

	const AddProductToCart = useCallback((item) => {
		const obj = {
			productId: item._id,
			amount: quantity
		}
		AddToCart(obj)

	}, [ quantity])


	const { loading, error, data } = useQuery(GET_PRODUCT_BY_SLUG, {
		variables: {
			slug,
		},
		fetchPolicy: 'cache-and-network',
	});

	const { loading: loadmoredata, error: errormoredata, data: moredata } = useQuery(GET_PRODUCTS, {
		fetchPolicy: 'cache-and-network',
	});

	const handleChange = (event) => {
		setQuantity(event.target.value);
	};

	if (loading) return '...Loading';
	if (error) return `Error! ${error}`;
	if (loadmoredata) return '...Loading';
	if (errormoredata) return `Error! ${error}`;
	console.log(data.productBySlug)
	return (
		<div className="w-full text-black min-h-screen font-Kanit">
			<div className="container mx-auto px-5 mt-10">
				<button
					class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-52 mx-5"
					onClick={() => navigate(-1)}
				>
					Back
				</button>
			</div>
			<div className="container flex flex-col mx-auto lg:flex-row text-black px-5 py-5 lg:px-10 lg:py-20">
				<div className="flex flex-col w-full lg:px-20">
					<img
						src={data.productBySlug.image}
						alt="image hero"
						className="object-contain md:object-scale-down"
					/>
				</div>
				<div className="flex flex-col w-full text-left lg:mt-0 mt-8">
					<h1 className="my-4 lg:text-4xl text-2xl font-bold leading-tight font-Kanit">
						{data.productBySlug.name}
					</h1>
					<div className="mt-2">
						<p className="leading-normal lg:text-xl text-lg font-bold font-Kanit">
							Inventory: {data.productBySlug.amount}
						</p>
					</div>
					{data?.productBySlug?.discountedPercent !== 0 ? (
						<React.Fragment>
							<div className='flex'>
							<h1 className="my-4 lg:text-2xl text-xl font-bold leading-tight font-Kanit line-through">
								Price: {data.productBySlug.price}
							</h1>
							<h1 className="my-4 lg:text-2xl text-xl font-bold leading-tight font-Kanit text-red-500 mx-4">
								{' '}{data.productBySlug.discountedPrice}
							</h1>
							</div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<h1 className="my-4 lg:text-2xl text-xl font-bold leading-tight font-Kanit">
								Price: {data.productBySlug.price}
							</h1>
						</React.Fragment>
					)}
					<p className="leading-relaxed lg:text-lg text-base font-Kanit my-2">
						{data.productBySlug.description}
					</p>
					<hr className="border-2 dorder-red-400 my-3" />
					<div className="flex my-5">
						<FormControl variant="outlined" className="w-full">
							<InputLabel id="demo-simple-select-outlined-label">Quantity</InputLabel>
							<Select value={quantity} onChange={handleChange} label="Quantity">
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={6}>6</MenuItem>
								<MenuItem value={7}>7</MenuItem>
								<MenuItem value={8}>8</MenuItem>
								<MenuItem value={9}>9</MenuItem>
								<MenuItem value={10}>10</MenuItem>
							</Select>
						</FormControl>
						<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/2 mx-5" onClick={() => AddProductToCart(data.productBySlug)}>
							Add to cart
						</button>
					</div>
				</div>
			</div>

			<div className="py-3 bg-gray-500 w-full">
				<div className="container mx-auto px-4">
					<h1 className="lg:text-2xl text-xl font-bold leading-tight font-Kanit text-white">Our products</h1>
				</div>
			</div>

			<div class="container mx-auto py-5 lg:py-20 px-5 font-Kanit">
				<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{moredata?.allProduct.map((item) => {
						if (item.productType[0] === data?.productBySlug?.productType[0] && item.slug !== slug) {
							return (
								<div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
									<div>
										<p className="lg:text-2xl md:text-xl uppercase text-gray-900 font-bold">{item.name}</p>
									</div>
									<div>
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

										<div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
											{item?.discountedPercent === 0 ? (<p className="font-bold text-xl "> {item.price} $</p>) : 
											(<React.Fragment>
												<div className='flex'>
												<p className="my-4 lg:text-2xl text-xl font-bold leading-tight font-Kanit text-red-500 mx-4">
													Sale {' '}{item.discountedPrice} $
												</p>
												</div>
											</React.Fragment>)}
										</div>
									</div>
								</div>
							)
						} else {
							return null
						}
					})}
				</div>
			</div>
		</div >
	);
};

export default Productdetail;
