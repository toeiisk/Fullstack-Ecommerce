import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { useNavigate } from 'react-router-dom';
// ICONS
import { IconContext } from 'react-icons';
import { ImCreditCard } from 'react-icons/im';
import { useSession } from '../../context/auth';
import { PaymentSet } from '../../context/payment';


const Payment = () => {
	const navigate = useNavigate();
	const { user } = useSession()
	const { DataPayment } = PaymentSet()
	const [nameholder, setNameholder] = React.useState('');
	const [cardnumber, setCardnumber] = React.useState('');
	const [expireend, setExpireend] = React.useState('');
	const [cvccode, setcvccode] = React.useState('');
	const [productCart, setProductCart] = useState(null)

	const handleSubmit = useCallback(() => {
		const obj = {
			nameholder: nameholder,
			cardnumber: cardnumber,
			expireend: expireend,
			cvccode: cvccode,
			paymedthod: 'CreditCard'
		}
		if (obj.nameholder === '' && obj.cardnumber === '' && obj.expireend === '' && obj.cardnumber === '') {
			return (
				alert('กรอกรายละเอียดบัตรเครดิตให้ครบทุกช่อง')
			)
		} else {
			DataPayment(obj)
			navigate(`/checkout`)
		}
	});
	let total = 0
	let product = 0

	useEffect(() => {
		const dataProduct = user?.cartItem?.map((item) => (item))
		const detailProduct = user?.cartItemProduct?.map((item) => (item))
		let arrayData = []
		for (var i = 0; i < dataProduct?.length; i++) {
			for (var j = 0; j < detailProduct?.length; j++) {
				if (dataProduct[i].productId === detailProduct[j]._id) {
					const data = {
						id: dataProduct[i].productId,
						name: detailProduct[j].name,
						amount: dataProduct[i].amount,
						image: detailProduct[j].image,
						price: detailProduct[j].discountedPercent === 0 ? detailProduct[j].price: detailProduct[j].discountedPrice,
					}
					
					arrayData.push(data)
				}
			}
		}
		setProductCart(arrayData)
	}, [user])

	if (productCart?.length > 0) {
		productCart?.forEach(item => {
			total += (item.price * item.amount)
			product += item.amount
		})
	}

	return (
		<div className="min-h-screen font-Kanit">
			<header
				class="bg-fixed bg-no-repeat bg-center bg-cover relative font-Kanit"
				style={{ backgroundImage: 'url(img/bg.jpg)' }}
			>
				<div class="flex items-center justify-center py-20">
					<div class="mx-2 text-center container">
						<h1 class="text-white text-2xl font-bold leading-tight xs:text-5xl md:text-6xl">Payment</h1>
					</div>
				</div>
			</header>
			<div className="container flex flex-col mx-auto lg:flex-row text-black py-5 lg:py-10">
				<div className="flex flex-col w-full text-left lg:p-10 p-5">
					<div className="border-2 border-gray-200 p-5 w-52">
						<IconContext.Provider value={{ size: '35px' }}>
							<div className="flex justify-center py-2">
								<ImCreditCard />
							</div>
						</IconContext.Provider>
						<div className="flex">
							<Checkbox
								defaultChecked
								size="small"
								inputProps={{ 'aria-label': 'checkbox with small size' }}
							/>
							<p class="text-black lg:text-md text-sm font-semibold tracking-wide px-3">
								Pay with credit card
							</p>
						</div>
					</div>

					<secion id="Carddetail">
						<div className="divide-y-4 divide-red-300 my-5">
							<h1 class="text-black text-2xl font-bold leading-tight">Payment Details</h1>
							<hr className="mt-2" />
						</div>
						<div className="py-2 text-left lg:mx-3">
							<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">Cardholder Name</p>
							<input
								type="text"
								className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 my-2 rounded-lg focus:border-gray-700 "
								placeholder="Holder Name"
								required
								onChange={(e) => setNameholder(e.target.value)}
							/>
						</div>
						<div className="py-2 text-left lg:mx-3">
							<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">Card Number</p>
							<input
								type="text"
								className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 my-2 rounded-lg focus:border-gray-700 "
								placeholder="Card Number"
								required
								onChange={(e) => setCardnumber(e.target.value)}
							/>
						</div>

						<div className="flex flex-col lg:flex-row justify-between py-2 text-left">
							<div className="row w-full py-2 text-left lg:mx-3">
								<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">Expires End</p>
								<input
									type="text"
									className="w-full border-2 border-gray-100 focus:outline-none bg-gray-100 block py-2 px-4 my-2 rounded-lg focus:border-gray-700 "
									placeholder="Expires End"
									required
									onChange={(e) => setExpireend(e.target.value)}
								/>
							</div>

							<div className="row w-full py-2 text-left lg:mx-3">
								<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">CVC Code</p>
								<input
									type="text"
									className="w-full border-2 border-gray-100 focus:outline-none bg-gray-100 block py-2 px-4 my-2 rounded-lg focus:border-gray-700 "
									placeholder="CVC Code"
									required
									onChange={(e) => setcvccode(e.target.value)}
								/>
							</div>
						</div>
						<div className="my-2">
							<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full w-full" onClick={handleSubmit}>
								Next
							</button>
						</div>
						<div className="my-2">
							<button
								class="hover:bg-red-300 bg-red-500 text-white font-bold py-3 px-4 rounded-full w-full"
								onClick={() => navigate(-1)}
							>
								Cancel
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
									<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">จำนวน: {data.amount}</p>
									<p class="text-black lg:text-lg text-sm font-semibold tracking-wide">Price: {data.price * data.amount}</p>
								</div>
							</div>
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
		</div>
	);
};

export default Payment;
