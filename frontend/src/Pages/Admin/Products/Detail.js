import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  makeStyles,
  Container,
} from "@material-ui/core";
import { InfoCard } from "@mystiny/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { green } from "@material-ui/core/colors";
import DetailsIcon from "@material-ui/icons/Details";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProductForm from "./Product-form";
import {GET_PRODUCT} from './GraphQL/Querie'

const useStyles = makeStyles((theme) => ({
  create: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

const ProfuctDetailPage = () => {
 
  const navigate = useNavigate();
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
      variables: {
          id
      },
      fetchPolicy: 'cache-and-network'
  });

  if (loading) return "...Loading";
  if (error) return `Error! ${error}`;
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
                  <DetailsIcon color="secondary" fontSize="large" /> Update
                  Product
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
            <ProductForm mode={'update'} defauldata={data.productById} />
          </InfoCard>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default ProfuctDetailPage;
