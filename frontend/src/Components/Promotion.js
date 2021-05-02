import React from 'react';
import { Link } from 'react-router-dom';

const Promotion = () => {
	return (
		<>
			<div
				class="min-w-screen flex items-center justify-center bg-fixed bg-cover bg-no-repeat"
				style={{ backgroundColor: '#1b1b1b' }}
			>
				<div class="w-full px-5 lg:py-20 py-10 md:py-19 text-gray-800">
					<div class="w-full max-w-6xl mx-auto pb-5">
						<div class="-mx-3 md:flex items-center mt-5">
							<div class="px-3 md:w-2/3 mb-10 md:mb-0">
								<h1 class="text-5xl lg:text-8xl font-bold font-Mitr mb-5 leading-tight text-red-500">
									SALE!!
								</h1>
								<h3 class="mb-7 leading-tight text-xl font-Mitr text-white">
									Go Shop now!!
								</h3>
								<div>
									<Link to="/promotion">
										<button class="block w-50 bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 transition-colors text-white rounded-lg px-3 py-2 font-semibold font-Mitr shadow-lg">
											Shop Now
										</button>
									</Link>
								</div>
							</div>
							<div class="px-3 md:w-1/3">
								<div className="flex w-full justify-center">
									<img className="object-contain" src="/img/hero4.png" alt="image promotion" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Promotion;
