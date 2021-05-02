import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import moment from 'moment'
import { GET_PROMOTIONS } from "../Promotion/GraphQL/Querie";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
  { field: "id", headerName: "รหัสโปรโมชั่น", width: 250, resizable: true, hide: true},
  { field: "name", headerName: "ชื่อโปรโมชั่น", width: 250, resizable: true },
  { field: "description", headerName: "รายละเอียดโปรโมชั่น", width: 250, resizable: true },
  { field: "startDate", headerName: "วันที่เริ่มโปรโมชั่น", width: 150, resizable: true },
  {
    field: "endDate",
    headerName: "วันที่จบโปรโมชั่น",
    width: 150,
    resizable: true,
  },
  {
    field: "product",
    headerName: "สินค้าที่เข้าร่วมรายการ",
    width: 350,
    resizable: true,
  },
];

const Promotion = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PROMOTIONS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
      <DataGrid 
        rows={data.allPromotion.map((item) =>({
          id: item._id,
          name: item.name,
          description: item.description,
          startDate:  moment(new Date(item.startDate)).format('DD/MM/YYYY'),
          endDate:  moment(new Date(item.endDate)).format('DD/MM/YYYY'),
          product: item.product.name
        }))} 
        columns={columns} 
        pagination 
        pageSize={10}
        onRowClick={(row) => navigate(`/admin/promotion/${row.row.id}`)}
        />
    </div>
  );
};
export default Promotion;
