import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSession } from '../../context/auth';
import { PaymentSet } from '../../context/payment';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from './GraphQL/Mutation';
import { EMPTY_CART } from '../Cart/Graphql/Mutation';
import React, { useCallback, useState, useEffect } from 'react';
import { ME_QUERY } from '../GraphQL/Querie';
import { GET_ORDERS } from '../Admin/Orders/GraphQL/Querie';

const Checkout = () => {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const { user } = useSession();
	const { paymentForm } = PaymentSet();
	const [createOrder] = useMutation(CREATE_ORDER);
	const [removeCart] = useMutation(EMPTY_CART);
	const [order, setOrder] = useState([]);
	const [empty, setEmpty] = useState(false);
	const [productCart, setProductCart] = useState(null);
	const handleOpen = useCallback(async () => {
		const variables = {
			paymentMethod: paymentForm.paymedthod,
			productItem: order,
		};
		try {
			await createOrder({ variables });
			await removeCart({ refetchQueries: [{ query: ME_QUERY }, { query: GET_ORDERS }] });
			setOpen(true);
			setEmpty(true);
		} catch (err) {
			console.log(err);
			alert('เกิดข้อผิดพลาด');
		}
	});

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

	useEffect(() => {
		const dataProduct = user?.cartItem?.map((item) => item);
		const detailProduct = user?.cartItemProduct?.map((item) => item);
		let arrayData = [];
		for (var i = 0; i < dataProduct?.length; i++) {
			for (var j = 0; j < detailProduct?.length; j++) {
				if (dataProduct[i].productId === detailProduct[j]._id) {
					const data = {
						productId: dataProduct[i].productId,
						amount: dataProduct[i].amount,
					};
					arrayData.push(data);
				}
			}
		}
		setOrder(arrayData);
	}, [user]);

	const handleClose = () => {
		setOpen(false);
		navigate('/customer/order');
	};
	let total = 0;
	let product = 0;

	if (productCart?.length > 0) {
		productCart?.forEach((item) => {
			total += item.price * item.amount;
			product += item.amount;
		});
	}
	return (
		<div className="min-h-screen font-Kanit">
			<header
				class="bg-fixed bg-no-repeat bg-center bg-cover relative font-Kanit"
				style={{ backgroundImage: 'url(img/bg.jpg)' }}
			>
				<div class="flex items-center justify-center py-20">
					<div class="mx-2 text-center container">
						<h1 class="text-white text-2xl font-bold leading-tight xs:text-5xl md:text-6xl">Checkout</h1>
					</div>
				</div>
			</header>
			<div className="container flex flex-col mx-auto lg:flex-row text-black py-5 lg:py-10">
				<div className="flex flex-col w-full text-left lg:p-10 p-5">
					<section id="Address">
						<div className="divide-y-4 divide-red-300 mb-5">
							<h1 class="text-black text-2xl font-bold leading-tight ">Shipping Details</h1>
							<hr className="mt-2" />
						</div>
						<div className="py-2">
							<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">
								{user?.firstname} {user?.firstname}
							</p>
							<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">{user?.phone}</p>
							<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">{user?.email}</p>
							<p class="text-black lg:text-lg text-sm font-semibold tracking-wide mt-2 leading-tight">
								ที่อยู่ {user?.address}
							</p>
						</div>
					</section>

					<secion id="Carddetail">
						<div className="divide-y-4 divide-red-300 my-5">
							<h1 class="text-black text-2xl font-bold leading-tight">Payment Details</h1>
							<hr className="mt-2" />
						</div>
						<div className="py-5">
							<h1 class="text-black text-xl font-bold leading-tight">Visa {paymentForm?.cardnumber}</h1>
						</div>
						<div className="py-5">
							{empty ? (
								<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full w-full cursor-not-allowed">
									Purchase
								</button>
							) : (
								<button
									class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full w-full"
									onClick={handleOpen}
								>
									Purchase
								</button>
							)}
						</div>
						<div className="my-2">
							<button
								class="hover:bg-red-300 bg-red-500 text-white font-bold py-3 px-4 rounded-full w-full"
								onClick={() => navigate(-1)}
							>
								Back
							</button>
						</div>
					</secion>
				</div>

				<div className="flex flex-col w-full text-left lg:p-10 p-5">
					<div className="divide-y-4 divide-red-300 mb-5">
						<h1 class="text-red-500 text-2xl font-bold leading-tight ">Your orders</h1>
						<hr className="mt-2" />
					</div>
					<div className="overflow-auto h-96">
						{productCart?.map((data, index) => (
							<React.Fragment>
								<div className="border-2 border-red-400 p-5 my-2 rounded-lg">
									<div className="flex flex-wrap flex-col lg:flex-row items-center">
										<img
											class="w-24 h-24 object-cover lg:block hidden"
											alt="User avatar"
											src={data.image}
										/>
										<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">
											{data.name}
										</p>
									</div>
									<hr className="border-2 border-red-400 my-3" />
									<div className="flex justify-between">
										<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">
											จำนวน: {data.amount}
										</p>
										<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">
											Price: {data.amount * data.price}
										</p>
									</div>
								</div>
							</React.Fragment>
						))}
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
						<h1 className="lg:text-2xl text-xl font-bold text-red-500">Order Total: {total} Bath</h1>
					</div>
				</div>
			</div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className="flex items-center justify-center"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className="border-2 border-gray-300 bg-white p-10 text-center font-Kanit">
						<div className="flex items-center justify-center py-5">
							<img class="w-24 h-24 object-cover" alt="User avatar" src="img/icon-true.png" />
						</div>
						<h1 className="lg:text-4xl text-xl font-bold text-green-600">Congratulations.</h1>
						<h1 className="lg:text-4xl text-xl font-bold text-green-600">Your order is accepted</h1>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default Checkout;
