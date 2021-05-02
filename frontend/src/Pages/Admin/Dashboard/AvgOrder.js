import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { GET_ORDERS } from '../Orders/GraphQL/Querie';
import { useQuery } from '@apollo/client'

const AvgOrder = (props) => {

  const { loading, error, data } = useQuery(GET_ORDERS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL ORDER
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {data.allOrder.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <ShoppingBasketIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
  ;

export default AvgOrder;