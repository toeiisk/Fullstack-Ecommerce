import React, { useEffect, useState, useCallback } from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    makeStyles,
    Container,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
} from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import { InfoCard } from "@mystiny/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import DetailsIcon from "@material-ui/icons/Details";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { GET_ORDER,GET_ORDERS} from './GraphQL/Querie'
import { UPDATE_STATUS } from "./GraphQL/Mutation";
import { useMutation } from "@apollo/client";
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    chip:{
        backgroundColor: green[400],
    },
    cancel: {
        backgroundColor: red[400],
    }
});

const DetailOrders = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    let { id } = useParams();
    const [updateOrder] = useMutation(UPDATE_STATUS);
    let total = 0
    const { loading, error, data } = useQuery(GET_ORDER, {
        variables: {
            id
        },
        fetchPolicy: 'cache-and-network',
    });


    const CancelOrder= useCallback(
        async () => {
          const variables = {
            orderId: id,
            orderStatus: 'CANCEL'
          };
          try {
            await updateOrder({ variables, refetchQueries: [{ query: GET_ORDERS }] });
            alert("บันทึกข้อมูลสำเร็จ");
            navigate('/admin/orders')
            
          } catch (err) {
            console.log(err);
            alert("เกิดข้อผิดพลาด");
          }
        },
        []
      );

    const ConfirmOrder = useCallback(
        async () => {
          const variables = {
            orderId: id,
            orderStatus: 'COMPLETE'
          };
          try {
            await updateOrder({ variables, refetchQueries: [{ query: GET_ORDERS }] });
            alert("บันทึกข้อมูลสำเร็จ");
            navigate('/admin/orders')
            
          } catch (err) {
            console.log(err);
            alert("เกิดข้อผิดพลาด");
          }
        },
        []
      );

    if (loading) return "...Loading";
    if (error) return `Error! ${error}`;

    if (data.orderById.productItem?.length > 0) {
        data.orderById.productItem?.forEach(item => {
            total += item.discountedPercent === 0 ? item.price * item.amount : item.discountedPrice * item.amount
        })
    }



    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Grid item xs={12} style={{ marginTop: "2%" }}>
                    <InfoCard
                        title={
                            <Box display="flex">
                                <Typography
                                    paragraph
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "2em",
                                        fontFamily: "monospace",
                                        marginTop: "2%",
                                    }}
                                >
                                    <DetailsIcon color="secondary" fontSize="large" /> Order Detail{' '}
                                    {data.orderById.status === 'WAIT' ? (
                                        <Chip
                                        icon={<AutorenewIcon />}
                                        label="WAIT"
                                        color="secondary"
                                        />
                                    ):
                                    data.orderById.status === 'CANCEL' ?
                                    (
                                        <Chip
                                        icon={<CheckIcon />}
                                        label="CANCEL"
                                        className={classes.cancel}
                                        color="primary"
                                        />
                                    ):
                                    (
                                        <Chip
                                            icon={<CheckIcon />}
                                            label="CONFIRM"
                                            className={classes.chip}
                                            color="primary"
                                        />
                                    )}
                                </Typography>
                            </Box>
                        }
                        actionTopRight={
                            <React.Fragment>
                                <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    onClick={ConfirmOrder}
                                    disabled = {data.orderById.status === 'COMPLETE' || data.orderById.status === 'CANCEL'}
                                >
                                    ยืนยันรายการสั่งสินค้า
                                </Button>
                                {'   '}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    onClick={CancelOrder}
                                    disabled = {data.orderById.status === 'COMPLETE'|| data.orderById.status === 'CANCEL'}
                                >
                                    ยกเลิกรายการสั่งสินค้า
                                </Button>
                                {'   '}
                                <Button
                                    startIcon={<ArrowBackIcon />}
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={() => navigate(-1)}
                                >
                                    ย้อนกลับ
                                </Button>
                                </Box>
                            </React.Fragment>
                        }
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="standard-basic"
                                    label="รหัสออร์เดอร์"
                                    defaultValue={data.orderById._id}
                                    InputProps={{
                                        readOnly: true,
                                    }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-disabled"
                                    label="ชื่อ"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={data.orderById.user.firstname}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-disabled"
                                    label="นามสกุล"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={data.orderById.user.lastname}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-disabled"
                                    label="เบอร์โทร"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={data.orderById.user.phone}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-disabled"
                                    label="ที่อยู่"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    defaultValue={data.orderById.user.address}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Divider />
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" colSpan={3}>
                                                    รายละเอียดสินค้า
                                                </TableCell>
                                                <TableCell align="right">ราคา</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>ชื่อสินค้า</TableCell>
                                                <TableCell align="right">จำนวน</TableCell>
                                                <TableCell align="right">ราคาสินค้า</TableCell>
                                                <TableCell align="right">ราคารวม</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.orderById.productItem.map((row) => (
                                                <TableRow key={row._id}>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell align="right">{row.amount}</TableCell>
                                                    <TableCell align="right">{row.discountedPercent === 0 ? row.price : row.discountedPrice}</TableCell>
                                                    <TableCell align="right">{row.discountedPercent === 0 ? row.amount * row.price : row.amount * row.discountedPrice}</TableCell>
                                                </TableRow>
                                            ))}

                                            <TableRow>
                                                <TableCell rowSpan={3} />
                                                <TableCell colSpan={2}>Subtotal</TableCell>
                                                <TableCell align="right">{total}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Tax</TableCell>
                                                <TableCell align="right">7 %</TableCell>
                                                <TableCell align="right">{(total * 0.07).toFixed(2)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={2}>Total</TableCell>
                                                <TableCell align="right">{(total + total * 0.07).toFixed(2)}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </InfoCard>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default DetailOrders