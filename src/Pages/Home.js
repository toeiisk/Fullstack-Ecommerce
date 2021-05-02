import React from 'react';

//COMPONENTS
import Jumbotron from '../Components/Jumbotron';
import Category from '../Components/Category';
import Promotion from '../Components/Promotion';

const Home = () => {
	return (
		<>
			<Jumbotron />
			<Category />
			<Promotion />
		</>
	);
};

export default Home;
