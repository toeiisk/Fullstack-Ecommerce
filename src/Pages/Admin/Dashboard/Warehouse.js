import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useNavigate } from "react-router-dom";
import { GET_PRODUCTS } from "../Products/GraphQL/Querie";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {
    boxAdmin: {},
    display: "flex",
    "& div.MuiDataGrid-cell": {
      color: "white",
    },
    "& div.MuiDataGrid-colCellTitle": {
      color: "black",
    },
    "& div.MuiToolbar-root": {
      color: "white",
    },
    "& div.MuiTablePagination-actions": {
      color: "white",
    },
    "& div.MuiIconButton-label": {
      color: "white",
    },
    "& div.MuiDataGrid-colCellWrapper": {
      backgroundColor: "white",
    },
  },
}));

const columns = [
  {
    field: "id",
    headerName: "รหัสสินต้า",
    width: 150,
    resizable: true,
    hide: true,
  },
  { field: "name", headerName: "ชื่อสินค้า", width: 250, resizable: true },
  {
    field: "productType",
    headerName: "ประเภทสินค้า",
    width: 200,
    resizable: true,
  },
  {
    field: "description",
    headerName: "รายละเอียดสินค้า",
    width: 500,
    resizable: true,
  },
  {
    field: "amount",
    headerName: "จำนวนสินค้า",
    width: 230,
    resizable: true,
  },
];

const WareHouse = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
      <DataGrid
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
  );
};
export default WareHouse;
