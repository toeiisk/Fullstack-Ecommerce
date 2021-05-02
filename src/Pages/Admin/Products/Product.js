import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography, Button, Container } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { InfoCard } from "@mystiny/ui";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { GET_PRODUCTS } from "./GraphQL/Querie";
import { useQuery } from "@apollo/client";


const columns = [
  { field: "id", headerName: "รหัสสินต้า", width: 150, resizable: true,  hide: true },
  { field: "name", headerName: "ชื่อสินค้า", width: 350, resizable: true },
  { field: "productType", headerName: "ประเภทสินค้า", width: 200, resizable: true },
  {
    field: "description",
    headerName: "รายละเอียดสินค้า",
    width: 470,
    resizable: true,
  },
  {
    field: "amount",
    headerName: "จำนวนสินค้า",
    width: 150,
    resizable: true,
  },
];

const Products = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid item xs={12} className="min-h-screen py-10">
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
                  <CardGiftcardIcon color="secondary" fontSize="large" />{" "}
                  Products
                </Typography>
              </Box>
            }
            actionTopRight={
              <React.Fragment>
                <Button
                  startIcon={<AddShoppingCartIcon />}
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate("/admin/product/create")}
                >
                  เพิ่มสินค้า
                </Button>
              </React.Fragment>
            }
          >
            <Grid container>
              <Grid item xs={12} align="center">
                <div style={{width: '100%'}}>
                  <DataGrid
                  autoHeight
                    rows={data.allProduct.map((item) => ({
                      id: item._id,
                      name: item.name,
                      description: item.description,
                      amount: item.amount,
                      productType: item.productType.toString(),
                    }))}
                    columns={columns}
                    pagination
                    pageSize={10}
                    onRowClick={(row) => navigate(`/admin/product/${row.row.id}`)}
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
export default Products;
