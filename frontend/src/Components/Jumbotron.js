import React from 'react';

const Jumbotron = () => {
	return (
		<div
			className="w-full text-black bg-center bg-cover bg-fixed bg-no-repeat "
			style={{ backgroundColor: '#181818' }}
		>
			<div className="container flex flex-wrap flex-col px-5 mx-auto lg:flex-row lg:py-20 py-5">
				<div className="flex flex-col w-full justify-center text-center md:text-left lg:w-2/4 sm:mt-8 items-center uppercase ">
					<h1
						data-aos="fade-right"
						data-aos-duration="1000"
						data-aos-easing="ease-in-sine"
						className="my-4 lg:text-8xl  text-5xl font-bold leading-tight font-Mitr text-white"
					>
						epic gear for
					</h1>
					<h1
						data-aos="fade-right"
						data-aos-delay="100"
						data-aos-duration="1000"
						data-aos-easing="ease-in-sine"
						className="my-4 lg:text-8xl  text-5xl font-bold leading-tight font-Mitr text-red-500"
					>
						best gamers
					</h1>
				</div>
				<div className="flex w-full justify-center lg:w-2/4">
					<img src="/img/hero1.png" alt="image hero" />
				</div>
			</div>
		</div>
	);
};

export default Jumbotron;
