import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { GET_ORDER } from '../Admin/Orders/GraphQL/Querie'
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';

const theme = createMuiTheme({
	typography: {
		fontSize: 18,
		fontFamily: "monospace"
	},
});

const Orderdetail = () => {

	const { id } = useParams()
	var total = 0
	const { loading, error, data } = useQuery(GET_ORDER, {
		variables: {
			id
		},
		fetchPolicy: 'cache-and-network'
	});

	if (loading) return "...Loading";
	if (error) return `Error! ${error}`;

	for (let i = 0; i < data.orderById.productItem.length; i++) {
		let value = data.orderById.productItem[i].discountedPercent === 0 ? data.orderById.productItem[i].amount * data.orderById.productItem[i].price : data.orderById.productItem[i].amount * data.orderById.productItem[i].discountedPrice
		total += value
	}

	const columns = [
		{ field: 'id', hide: 'true' },
		{ field: 'product', headerName: 'Product', sortable: true, width: 400 },
		{ field: 'amount', headerName: 'Amount', sortable: true, width: 250 },
		{ field: 'price', headerName: 'Price', sortable: true, width: 250 },
	];

	return (
		<div className="w-full container mx-auto lg:px-10 font-Kanit">
			<h1 class="text-black text-lg lg:text-3xl font-bold leading-tight underline">Orders #{id}</h1>
			<div className="flex items-center lg:items-stretch my-5">
				<div className="bg-white shadow-lg w-full p-5 rounded-lg">
					<p class="text-black lg:text-lg text-sm font-semibold tracking-wide my-3">
						Payment Date: 23/4/2021
					</p>
					<p class="text-black lg:text-lg text-sm font-semibold tracking-wide my-3">
						Payment Type: {data.orderById.paymentMethod}
					</p>
					<p class="text-black lg:text-lg text-sm font-semibold tracking-wide my-3">
						Visa: XXXXXXXXXXXXXXXXXXX
					</p>
					<hr className="border-2 bg-gray-400 my-5" />
					<div style={{ width: '100%' }}>
						<MuiThemeProvider theme={theme}>
							<DataGrid autoHeight rows={data.orderById.productItem.map((item) => ({
								id: item._id,
								product: item.name,
								amount: item.amount,
								price: item.discountedPercent === 0 ? item.amount * item.price : item.amount * item.discountedPrice
							}))}
								columns={columns}
								pageSize={5} />
						</MuiThemeProvider>
					</div>
					<p class="text-black lg:text-lg text-sm font-semibold tracking-wide my-3 text-right">
						Total Price: {total} $
					</p>
					<hr className="border-2 bg-gray-400 my-5" />
					<div className="flex text-center items-center ">
						<p class="text-black lg:text-lg text-sm font-semibold tracking-wide my-3">Status: </p>
						{data.orderById.status === 'WAIT' ? (
							<p class="text-black lg:text-md text-sm font-semibold tracking-wide bg-red-300 rounded-full px-5 py-2 mx-5">
								wait
							</p>
						) : (
							<p class="text-black lg:text-md text-sm font-semibold tracking-wide bg-green-300 rounded-full px-5 py-2 mx-5">
								success
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Orderdetail;
