import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../Admin/Orders/GraphQL/Querie';
import { useSession } from '../../context/auth';

const theme = createMuiTheme({
	typography: {
		fontSize: 18,
		fontFamily: 'monospace',
	},
});

const Order = () => {
	const navigate = useNavigate();
	const { loading, error, data } = useQuery(GET_ORDERS);
	const { user } = useSession();
	const userId = data?.allOrder?.filter((id) => id.userId === user?._id);

	const columns = [
		{ field: 'id', headerName: 'Order ID', width: 400 },
		{
			field: 'payment',
			headerName: 'Payment',
			sortable: true,
			width: 200,
		},
		{
			field: 'status',
			headerName: 'Status',
			type: 'text',
			sortable: true,
			width: 300,
		},
	];

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<div className="w-full container mx-auto lg:px-10 font-Kanit">
			<div className="lg:border-2 lg:border-gray-200 lg:p-10 m-5">
				<h1 class="text-black text-3xl lg:text-3xl font-bold leading-tight">Your Orders</h1>
				<div className="flex items-center lg:items-stretch my-5">
					<div className="w-full m-5">
						<div style={{ width: '100%' }}>
							<MuiThemeProvider theme={theme}>
								<DataGrid
									autoHeight
									rows={userId?.map((item) => ({
										id: item._id,
										payment: item.paymentMethod,
										status: item.status
									}))}
									columns={columns}
									pageSize={5}
									onRowClick={(row) => navigate(`/customer/order/${row.row.id}`)}
								/>
							</MuiThemeProvider>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order;
