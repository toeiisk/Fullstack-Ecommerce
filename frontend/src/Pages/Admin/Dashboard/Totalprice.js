import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { GET_PRODUCTS } from '../Products/GraphQL/Querie'
import { useQuery } from '@apollo/client'

const TotalProfit = (props) => {

    const { loading, error, data } = useQuery(GET_PRODUCTS);
    var number = 0
  


    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    for (var i = 0; i < data.allProduct?.length; i++) {
        number += data.allProduct[i].totalEarning
   }

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
                            TOTAL PROFIT
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            ${number}
                    </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: indigo[600],
                                height: 56,
                                width: 56
                            }}
                        >
                            <AttachMoneyIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TotalProfit;