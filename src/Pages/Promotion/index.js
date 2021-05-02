import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GET_ACTIVE_PROMOTIONS, GET_PROMOTIONS } from '../Admin/Promotion/GraphQL/Querie';
import { useQuery } from '@apollo/client';
import LinesEllipsis from 'react-lines-ellipsis';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { useNavigate } from "react-router-dom";
import { nativeTouchData } from 'react-dom/cjs/react-dom-test-utils.production.min';

const useStyles = makeStyles({});

const Promotion = () => {
	const { loading, error, data } = useQuery(GET_ACTIVE_PROMOTIONS);
	const classes = useStyles();
	const navigate = useNavigate();
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<React.Fragment>
			<header
				class="bg-fixed bg-no-repeat bg-center bg-cover relative font-Kanit"
				style={{ backgroundImage: 'url(img/bg.jpg)' }}
			>
				<div class="flex flex-col items-center justify-center py-20 container mx-auto">
					<h1 data-aos="fade-right"
						data-aos-duration="1000"
						data-aos-easing="ease-in-sine" class="text-white font-bold leading-tight lg:text-8xl text-5xl">Sale!!</h1>
					<img className="object-contain h-96" src="/img/hero3.png" alt="image hero" />
				</div>
			</header>
			<div class="container mx-auto py-10 px-5 min-h-screen font-Kanit">
				<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
					{data.activePromotions.map((item) => (
						<React.Fragment>
							<div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl items-center">
								<div>
									<p className="lg:text-2xl md:text-xl uppercase text-gray-900 font-bold">
										{item.product.name}
									</p>
								</div>
								<div className="py-3">
									<img
										src={item.product.image}
										alt="gpro"
										className="w-full object-cover object-center"
									/>
								</div>
								<div className="grid gap-5">
									<div className="flex flex-col md:flex-col justify-between items-center text-gray-900">
										<p className="font-bold text-2xl text-red-500">
											{item.product.price - (item.product.price * item.discount) / 100} ฿
										</p>
										<div className="flex justify-evenly items-center">
											<p className="font-bold text-xl text-gray-500 line-through mx-2">
												{item.product.price} ฿
											</p>
											<p className="bg-gray-500 text-white text-center text-sm font-bold py-1 px-1 rounded-lg">
												-{item.discount}%
											</p>
										</div>
									</div>
									<p className="uppercase text-md text-gray-400 text-center">
										<LinesEllipsis
											text={item.description}
											maxLine="3"
											ellipsis="..."
											trimRight
											basedOn="letters"
										/>
									</p>
									<button class="tracking-wider border-2 border-gray-300 hover:bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full w-full py-2" onClick={() => navigate(`/product/${item.product.slug}`)}>
										Read more...
									</button>
								</div>
							</div>
						</React.Fragment>
					))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Promotion;
