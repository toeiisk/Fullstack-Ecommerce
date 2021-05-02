import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImBin } from 'react-icons/im';
import { useSession } from '../../context/auth';
import LinesEllipsis from 'react-lines-ellipsis';
import { EDIT_CART, REMOVE_ITEM } from './Graphql/Mutation';
import { useMutation } from '@apollo/client';
import { ME_QUERY } from '../GraphQL/Querie';
import Hidden from '@material-ui/core/Hidden';

const Cart = () => {
	const { user } = useSession();
	const [productCart, setProductCart] = useState(null);
	const [edittoCart] = useMutation(EDIT_CART);
	const [removeCart] = useMutation(REMOVE_ITEM);
	let total = 0;
	let product = 0;

	const handleAddItem = useCallback(
		async (value) => {
			var test = productCart;
			test[value].amount += 1;
			const obj = {
				productId: test[value].id,
				amount: test[value].amount,
			};
			const variables = {
				productItem: obj,
			};
			try {
				await edittoCart({ variables, refetchQueries: [{ query: ME_QUERY }] });
			} catch (err) {
				console.log(err);
				alert('เกิดข้อผิดพลาด');
			}
		},
		[productCart]
	);

	const handleDelete = useCallback(
		async (value) => {
			var test = productCart;
			const variables = {
				productId: test[value].id,
			};
			try {
				await removeCart({ variables, refetchQueries: [{ query: ME_QUERY }] });
			} catch (err) {
				console.log(err);
				alert('เกิดข้อผิดพลาด');
			}
		},
		[productCart]
	);

	const handleRemoveItem = useCallback(
		async (value) => {
			var test = productCart;
			test[value].amount -= 1;
			const obj = {
				productId: test[value].id,
				amount: test[value].amount,
			};
			const variables = {
				productItem: obj,
			};
			try {
				await edittoCart({ variables, refetchQueries: [{ query: ME_QUERY }] });
			} catch (err) {
				console.log(err);
				alert('เกิดข้อผิดพลาด');
			}
		},
		[productCart]
	);

	useEffect(() => {
		const dataProduct = user?.cartItem?.map((item) => item);
		const detailProduct = user?.cartItemProduct?.map((item) => item);
		let arrayData = [];
		for (var i = 0; i < dataProduct?.length; i++) {
			for (var j = 0; j < detailProduct?.length; j++) {
				if (dataProduct[i].productId === detailProduct[j]._id) {
					const data = {
						id: dataProduct[i].productId,
						name: detailProduct[j].name,
						amount: dataProduct[i].amount,
						image: detailProduct[j].image,
						price:
							detailProduct[j].discountedPercent === 0
								? detailProduct[j].price
								: detailProduct[j].discountedPrice,
					};

					arrayData.push(data);
				}
			}
		}
		setProductCart(arrayData);
	}, [user]);
	const ListItemCard = useMemo(() => {
		return (
			<React.Fragment>
				{productCart?.map((data, index) => (
					<table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
						<thead className="bg-gray-300">
							<tr className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
								<th class="sticky top-0 px-6 py-5 text-red-900 font-semibold lg:text-2xl xs:text-xl uppercase">
									Product
								</th>
								<th class="sticky top-0 px-6 py-3 text-red-900 font-semibold lg:text-2xl xs:text-xl uppercase">
									Price
								</th>
								<th class="sticky top-0 px-6 py-3 text-red-900 font-semibold lg:text-2xl xs:text-xl uppercase">
									Quantity
								</th>
								<th class="sticky top-0 px-6 py-3 text-red-900 font-semibold lg:text-2xl xs:text-xl uppercase">
									Total
								</th>
								<th class="sticky top-0 px-6 py-3 text-red-900 font-semibold lg:text-2xl xs:text-xl uppercase">
									Actions
								</th>
							</tr>
						</thead>
						<tbody class="w-full sm:flex-none">
							<tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
								<td class="py-3 text-center">
									<div class="flex flex-wrap flex-col lg:flex-row justify-center items-center">
										<img
											class="w-24 h-24 object-cover lg:block hidden"
											alt="User avatar"
											src={data.image}
										/>

										<div className="justify-center">
											<div className="lg:block hidden">
												<p class="px-2 text-black lg:text-lg text-sm font-semibold tracking-wide">
													{data.name}
												</p>
											</div>
										</div>

										<div className="justify-center">
											<div className="lg:hidden">
												<LinesEllipsis
													text={data.name}
													className="px-2 text-black text-sm lg:text-lg font-semibold tracking-wide"
													maxLine="2"
													ellipsis="..."
													trimRight
													basedOn="letters"
												/>
											</div>
										</div>
									</div>
								</td>
								<td class="py-3 text-center">
									<p class="text-black text-sm lg:text-lg font-semibold tracking-wide">
										{data.price}
									</p>
								</td>
								<td class="py-3 text-sm lg:text-lg font-semibold text-center">
									<button
										className="rounded-full border-2 border-black mx-3 hover:bg-gray-400"
										onClick={() => handleAddItem(index)}
									>
										<p class="text-black text-sm lg:text-lg font-semibold px-3">+</p>
									</button>
									{data.amount}
									<button
										className="rounded-full border-2 border-black mx-3 hover:bg-gray-400"
										onClick={() => handleRemoveItem(index)}
									>
										<p class="text-black text-sm lg:text-lg font-semibold px-3">-</p>
									</button>
								</td>
								<td class="py-5 text-sm lg:text-lg font-semibold text-center">
									<p class="text-black text-sm lg:text-lg font-semibold tracking-wide">
										{data.price * data.amount}
									</p>
								</td>
								<td className="py-5">
									<div className="flex justify-center items-center">
										<ImBin size={25} onClick={() => handleDelete(index)} />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				))}
			</React.Fragment>
		);
	}, [productCart]);

	if (productCart?.length > 0) {
		productCart?.forEach((item) => {
			total += item.price * item.amount;
			product += item.amount;
		});
	}

	return (
		<div className="min-h-screen">
			<header
				class="bg-fixed bg-no-repeat bg-center bg-cover relative font-Kanit"
				style={{ backgroundImage: 'url(img/bg.jpg)' }}
			>
				<div class="flex items-center justify-center py-20">
					<div class="mx-2 text-center container">
						<h1 class="text-white text-2xl font-bold leading-tight xs:text-5xl md:text-6xl">Your Cart</h1>
					</div>
				</div>
			</header>
			<div class="flex flex-col lg:px-10 font-Kanit py-10 mx-auto container">
				<div class="flex-grow overflow-auto">
					<div>{ListItemCard}</div>
				</div>

				<div className="container mx-auto px-5 py-10 font-Kanit">
					<hr className="py-2" />
					<div className="flex justify-between py-3">
						<h1 className="lg:text-xl text-base font-semibold">Total (X Items): {product}</h1>
						<h1 className="lg:text-xl text-base font-semibold">{total} Bath</h1>
					</div>
					<div className="flex justify-between py-3">
						<h1 className="lg:text-xl text-base font-semibold">Shipping Fee:</h1>
						<h1 className="lg:text-xl text-base font-semibold">Free</h1>
					</div>
					<hr className="py-2" />
					<div className="flex flex-wrap flex-col lg:flex-row justify-between ">
						<h1 className="lg:text-2xl text-xl font-bold text-red-500">Order Total: {total} Bath</h1>
						{productCart?.length === 0 ? (
							<React.Fragment>
								<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full my-5 lg:my-0 w-full lg:w-80">
									Next
								</button>
							</React.Fragment>
						) : (
							<React.Fragment>
								<Link to="/payment">
									<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full my-5 lg:my-0 w-full lg:w-80">
										Next
									</button>
								</Link>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
