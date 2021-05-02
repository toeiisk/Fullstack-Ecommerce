import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography, Button, Container } from "@material-ui/core";
import { InfoCard } from "@mystiny/ui";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useNavigate } from "react-router-dom";
import ProductForm from './Product-form'
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

const CreateProducts = () => {
  const navigate = useNavigate();
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
                  <NoteAddIcon color="secondary" fontSize="large" /> Add
                  Products
                </Typography>
              </Box>
            }
            actionTopRight={
              <React.Fragment>
                <Button
                  startIcon={<ArrowBackIcon />}
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate(-1)}
                >
                  ย้อนกลับ
                </Button>
              </React.Fragment>
            }
          >
                <ProductForm />
          </InfoCard>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default CreateProducts;
