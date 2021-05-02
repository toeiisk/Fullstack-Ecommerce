import React from 'react';
import { Box, Grid, Typography, Container } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StorefrontIcon from '@material-ui/icons/Storefront';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import Warehouse from './Warehouse';
import Promotion from './Promotion';
import { InfoCard } from '@mystiny/ui';
import Totalprice from './Totalprice';
import Customer from './Customer';
import AvgOrder from './AvgOrder';
import { GET_COUNT_CUSTOMER } from '../Orders/GraphQL/Querie'
import { useQuery } from "@apollo/client";


const Dashboard = () => {

	const { loading, error, data } = useQuery(GET_COUNT_CUSTOMER);

	if (loading) return "...Loading";
    if (error) return `Error! ${error}`;
	return (
		<React.Fragment>
			<Container maxWidth="lg">
				<Grid item xs={12} style={{ marginTop: '2%' }}>
					<InfoCard
						title={
							<Box display="flex">
								<Typography
									paragraph
									style={{
										fontWeight: 'bold',
										fontSize: '2em',
										fontFamily: 'monospace',
										marginTop: '2%',
									}}
								>
									<DashboardIcon color="secondary" fontSize="large" /> Dashboard
								</Typography>
							</Box>
						}
					>
						<Grid container spacing={2}>
							<Grid item lg={4} xs={12}>
								<Totalprice />
							</Grid>
							<Grid item lg={4} xs={12}>
								<Customer customer={data.allUsersCount}/>
							</Grid>
							<Grid item lg={4} xs={12}>
								<AvgOrder />
							</Grid>
						</Grid>
					</InfoCard>
				</Grid>
				<Grid item xs={12} style={{ marginTop: '2%' }}>
					<InfoCard
						title={
							<Box display="flex">
								<Typography
									paragraph
									style={{
										fontWeight: 'bold',
										fontSize: '2em',
										fontFamily: 'monospace',
										marginTop: '2%',
									}}
								>
									<StorefrontIcon color="secondary" fontSize="large" /> Warehouse
								</Typography>
							</Box>
						}
					>
						<Grid container>
							<Grid item xs={12} align="center">
								<Warehouse />
							</Grid>
						</Grid>
					</InfoCard>
				</Grid>
				<Grid item xs={12} style={{ marginTop: '2%' }}>
					<InfoCard
						title={
							<Box display="flex">
								<Typography
									paragraph
									style={{
										fontWeight: 'bold',
										fontSize: '2em',
										fontFamily: 'monospace',
										marginTop: '2%',
									}}
								>
									<TrendingDownIcon color="secondary" fontSize="large" /> Promotions
								</Typography>
							</Box>
						}
					>
						<Grid container>
							<Grid item xs={12} align="center">
								<Promotion />
							</Grid>
						</Grid>
					</InfoCard>
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Dashboard;
