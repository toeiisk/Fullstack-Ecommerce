import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Button,
  InputBase,
  FormControl,
  TextField as MuiTExtField,
} from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Radio, Select } from "final-form-material-ui";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import moment from "moment";
import { GET_PRODUCTS } from "../Products/GraphQL/Querie";
import { CREATE_PROMOTION, UPDATE_PROMOTION } from "./GraphQL/Mutation";
import { useQuery } from "@apollo/client";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PROMOTIONS } from "./GraphQL/Querie";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  cardheght: {
    maxWidth: 400,
  },
  media: {
    height: 300,
  },
}));

const PromotionForm = (props) => {
  const { mode, defaultdata } = props;
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [productId, setProductId] = useState("");
  const [createPromotion] = useMutation(CREATE_PROMOTION);
  const [updatePromotion] = useMutation(UPDATE_PROMOTION);
  const navigate = useNavigate();
  const {id} = useParams()

  const normalizeNumber = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, "");
    let number = parseFloat(onlyNums);
    return number;
  };

  const onChange = (event, value) => {
    setProductId(value._id);
  };
  
  useEffect(() => {
    if(mode === 'update'){
      setProductId(defaultdata.product._id)
    }
    else{
      return null
    }
  }, [])

  const CreateProductSubmit = useCallback(
    async (value) => {
      const variables = {
        record: {
          name: value.name,
          description: value.description,
          discount: value.discount,
          productId: productId,
          startDate: value.startDate,
          endDate: value.endDate,
        },
      };
      try {
        await createPromotion({
          variables,
          refetchQueries: [{ query: GET_PROMOTIONS }],
        });
        alert("บันทึกข้อมูลสำเร็จ");
        navigate(`/admin/promotions`);
      } catch (err) {
        console.log(err);
        alert("เกิดข้อผิดพลาด");
      }
    },
    [productId]
  );

  const UpdateProductSubmit = useCallback(
    async (value) => {
      const variables = {
        id: id,
        record: {
          name: value.name,
          description: value.description,
          discount: value.discount,
          productId: productId,
          startDate: value.startDate,
          endDate: value.endDate,
        },
      };
      try {
        await updatePromotion({
          variables,
          refetchQueries: [{ query: GET_PROMOTIONS }],
        });
        alert("บันทึกข้อมูลสำเร็จ");
        navigate(`/admin/promotions`);
      } catch (err) {
        console.log(err);
        alert("เกิดข้อผิดพลาด");
      }
    },
    [productId]
  );


  const onSubmit = mode === 'update' ? UpdateProductSubmit : CreateProductSubmit;

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  
  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <form
            className={classes.root}
            noValidate
            autoComplete="true"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {mode === "update" ? (
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="ชื่อ"
                    variant="outlined"
                    style={{ width: "100%" }}
                    initialValue={defaultdata.name}
                  />
                ) : (
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="ชื่อ"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                {mode === "update" ? (
                  <Field
                    fullWidth
                    required
                    name="description"
                    component={TextField}
                    type="text"
                    label="รายละเอียด"
                    variant="outlined"
                    style={{ width: "100%" }}
                    initialValue={defaultdata.description}
                  />
                ) : (
                  <Field
                    fullWidth
                    required
                    name="description"
                    component={TextField}
                    type="text"
                    label="รายละเอียด"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                {mode === "update" ? (
                  <Field
                    fullWidth
                    required
                    name="discount"
                    component={TextField}
                    type="text"
                    label="จำนวนการลด (%)"
                    variant="outlined"
                    style={{ width: "100%" }}
                    parse={normalizeNumber}
                    initialValue={defaultdata.discount}
                  />
                ) : (
                  <Field
                    fullWidth
                    required
                    name="discount"
                    component={TextField}
                    type="text"
                    label="จำนวนการลด (%)"
                    variant="outlined"
                    style={{ width: "100%" }}
                    parse={normalizeNumber}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                {mode === "update" ? (
                  <FormControl style={{ width: "100%" }}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={data.allProduct}
                      getOptionLabel={(option) => option.name}
                      style={{ width: "100%" }}
                      onChange={onChange}
                      defaultValue={data.allProduct.find(element => element.name === defaultdata.product.name)}
                      renderInput={(params) => (
                        <MuiTExtField
                          {...params}
                          label="สินค้าที่จะลดราคา"
                          variant="outlined"
                          style={{ width: "100%" }}
                        />
                      )}
                    />
                  </FormControl>
                ) : (
                  <FormControl style={{ width: "100%" }}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={data.allProduct}
                      getOptionLabel={(option) => option.name}
                      style={{ width: "100%" }}
                      onChange={onChange}
                      renderInput={(params) => (
                        <MuiTExtField
                          {...params}
                          label="สินค้าที่จะลดราคา"
                          variant="outlined"
                          style={{ width: "100%" }}
                        />
                      )}
                    />
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={6}>
                <Field
                  id="date"
                  type="date"
                  label="วันที่เริ่มลดราคาสินค้า"
                  variant="outlined"
                  style={{ width: "100%" }}
                  required={true}
                  component={TextField}
                  name="startDate"
                  defaultValue={`${moment(new Date()).format("YYYY-MM-DD")}`}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  id="date"
                  type="date"
                  label="วันที่หยุดลดราคาสินค้า"
                  variant="outlined"
                  style={{ width: "100%" }}
                  required={true}
                  component={TextField}
                  name="endDate"
                  defaultValue={`${moment(new Date()).format("YYYY-MM-DD")}`}
                />
              </Grid>

              <Grid item xs={12} align="center">
                <Button
                  startIcon={<SaveAltIcon />}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  บันทึกข้อมูล
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </React.Fragment>
  );
};

export default PromotionForm;
