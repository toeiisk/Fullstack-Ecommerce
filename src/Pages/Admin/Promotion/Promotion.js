import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography, Button, Container } from "@material-ui/core";
import { InfoCard } from "@mystiny/ui";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import Promotion from "../Dashboard/Promotion";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { GET_PROMOTIONS } from "./GraphQL/Querie";
import { useQuery } from "@apollo/client";

const Promotions = () => {
  let navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PROMOTIONS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <React.Fragment>
      <Container maxWidth="lg" className="min-h-screen">
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
                  <TrendingDownIcon color="secondary" fontSize="large" />{" "}
                  Promotions
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
                  onClick={() => navigate("/admin/promotion/create")}
                >
                  เพิ่มโปรโมชั่น
                </Button>
              </React.Fragment>
            }
          >
            <Grid container>
              <Grid item xs={12} align="center">
                <Promotion  />
              </Grid>
            </Grid>
          </InfoCard>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Promotions;
