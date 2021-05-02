import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography, Button, Container } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { InfoCard } from "@mystiny/ui";
import { useNavigate } from "react-router-dom";
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "./GraphQL/Querie";


const columns = [
  { field: "id", headerName: "รหัสรายการสั่งสินค้า", width: 300, resizable: true },
  {
    field: "status",
    headerName: "สถานะ",
    width: 300,
    resizable: true,
  },
  { field: "firstname", headerName: "ชื่อผู้สั่งสินค้า", width: 300, resizable: true },
  { field: "lastname", headerName: "นามสกุลผู้สั่งสินค้า", width: 300, resizable: true },
  {
    field: "paymentMethod",
    headerName: "รูปแบบการจ่ายเงิน",
    width: 300,
    resizable: true,
  },
];


const Orders = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ORDERS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

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
                  <ListAltIcon color="secondary" fontSize="large" />{" "}
                  Orders
                </Typography>
              </Box>
            }
          >
            <Grid container>
              <Grid item xs={12} align="center">
                <div
                  style={{
                    height: 500,
                    width: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <DataGrid
                    rows={data.allOrder.map((item) => ({
                      id: item._id,
                      status: item.status,
                      firstname: item.user.firstname,
                      lastname: item.user.lastname,
                      paymentMethod: item.paymentMethod
                    }))}
                    columns={columns}
                    pagination
                    pageSize={10}
                    onRowClick={(row) => navigate(`/admin/orders/detail/${row.row.id}`)}
                  />
                </div>
              </Grid>
            </Grid>
          </InfoCard>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Orders;
