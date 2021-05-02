import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  makeStyles,
  Container,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from "@material-ui/core";
import { InfoCard } from "@mystiny/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { green } from "@material-ui/core/colors";
import DetailsIcon from "@material-ui/icons/Details";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { GET_PROMOTION } from './GraphQL/Querie'
import PromotionForm from './Promotion-form'
import image from '../../../images/joy.png'
const useStyles = makeStyles((theme) => ({
  create: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  card: {
    maxWidth: 345,
  },
}));

const PromotionDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROMOTION, {
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
                  Promotion
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
            <PromotionForm mode={'update'} defaultdata={data.promotionById} />
          </InfoCard>

        </Grid>
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
                  <DetailsIcon color="secondary" fontSize="large" /> Products using this Promotion
                </Typography>
              </Box>
            }
          >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={data.promotionById.product.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.promotionById.product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {data.promotionById.product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary"  onClick={() => navigate(`/admin/product/${data.promotionById.product._id}`)}>
                  See Product
                </Button>
              </CardActions>
            </Card>

          </InfoCard>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default PromotionDetail;
