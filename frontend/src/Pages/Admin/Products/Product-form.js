import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  Button,
  Chip,
  CardMedia,
  CardActionArea,
  Card,
  Fab,
  TextField as MuiTExtField,
} from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Radio, Select } from "final-form-material-ui";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT, UPDATE_PRODUCT} from "./GraphQL/Mutation";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import blue from "@material-ui/core/colors/blue";
import { GET_PRODUCTS } from './GraphQL/Querie'
import { useNavigate, useParams } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { storage } from '../../../firebase/firebase'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
    objectFit: "cover",
  },
  input: {
    display: "none",
  },
  button: {
    color: blue[900],
    margin: 10,
  },
}));

const ProductForm = (props) => {
  const { mode, defauldata } = props;
  const navigate = useNavigate();
  const classes = useStyles();
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [selectFile, setSelectFile] = useState(null);
  const [testImage, setTestest] = useState(null)
  const [url, setURL] = useState("");
  const [stateUpload, setStateUpload] = useState("initial");
  const [productType, setProductType] = useState("");
  const test = [{ name: "Mouse", id: '1' }, { name: "Keyboard", id: '2' }, { name: "Headphones", id: '3' }, { name: "Sound card", id: '4' }, { name: "Monitor", id: '5' }, { name: "Microphone", id: '6' }, { name: "Mouse pad", id: '7' }, { name: "Game controller", id: '8' }, { name: "Chair", id: '9' }, { name: "Headset stand", id: '10' }];
  const  {id} = useParams() 
  const UploadFile = (event) => {
    var file = event.target.files[0];
    setTestest(file)
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setSelectFile([reader.result]);
    }.bind(this);

    setSelectFile(event.target.files[0]);
    setStateUpload("uploaded");
  };


  const onChange = (event, value) => {
    setProductType(value.name);
  };

  useEffect(() => {
    if (mode === 'update') {
      setProductType(defauldata.productType[0])
      setStateUpload('uploaded')
      setSelectFile(defauldata.image)
      setURL(defauldata.image)
    }
    else {
      return null
    }
  }, [productType])

  const UploadImagetoFirebase = useCallback(async () => {
    if (testImage === null) {
      return alert("อัพโหลดรูปภาพไม่สำเร็จ");
    }
    const uploadTask = storage.ref(`/images/${testImage.name}`).put(testImage);
    await uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(testImage.name)
        .getDownloadURL()
        .then((url) => {
          setTestest(null);
          setURL(url);
          alert("อัพโหลดรูปภาพสำเร็จ");
        })
        .catch(() => {
          alert("อัพโหลดรูปภาพไม่สำเร็จ");
        })

    });

  }, [testImage])

  const CreateProductSubmit = useCallback(
    async (value) => {
      const variables = {
        id: id,
        record: {
          name: value.name,
          description: value.description,
          price: value.price,
          amount: value.amount,
          productType: productType,
          image: url,
        },
      };
      try {
        await createProduct({ variables, refetchQueries: [{ query: GET_PRODUCTS }] });
        alert("บันทึกข้อมูลสำเร็จ");
        navigate(`/admin/products`)
      } catch (err) {
        console.log(err);
        alert("เกิดข้อผิดพลาด");
      }
    },
    [selectFile, productType, url]
  );

  const UpdateProductSubmit = useCallback(
    async (value) => {
      const variables = {
        id: id,
        record: {
          name: value.name,
          description: value.description,
          price: value.price,
          amount: value.amount,
          productType: productType,
          image: url,
        },
      };
      try {
        await updateProduct({ variables, refetchQueries: [{ query: GET_PRODUCTS }] });
        alert("บันทึกข้อมูลสำเร็จ");
        navigate(`/admin/products`)
      } catch (err) {
        console.log(err);
        alert("เกิดข้อผิดพลาด");
      }
    },
    [selectFile, productType, url]
  );

  const onSubmit = mode === 'update' ?  UpdateProductSubmit : CreateProductSubmit;

  const normalizeNumber = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, "");
    let number = parseFloat(onlyNums);
    return number;
  };


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
              <Grid item xs={12} align="center">
                <Card className={classes.cardheght}>
                  <CardActionArea>
                    {stateUpload === "uploaded" ? (
                      <CardMedia className={classes.media} image={selectFile} />
                    ) : (
                      <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                      />
                    )}
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} align="center">
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={UploadFile}
                />
                <label htmlFor="contained-button-file">
                  <Fab component="span" className={classes.button}>
                    <AddPhotoAlternateIcon />
                  </Fab>
                </label>
                <Button
                  startIcon={<CloudUploadIcon />}
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={UploadImagetoFirebase}
                >
                  อัพโหลดรูปภาพ
                </Button>
              </Grid>
              <Grid item xs={6}>
                {mode === "update" ? (
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="ชื่อสินค้า"
                    variant="outlined"
                    style={{ width: "100%" }}
                    initialValue={defauldata.name}
                  />
                ) : (
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="ชื่อสินค้า"
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
                    label="คำอธิบาย"
                    variant="outlined"
                    style={{ width: "100%" }}
                    initialValue={defauldata.description}
                    multiline
                    rows={5}
                  />
                ) : (
                  <Field
                    fullWidth
                    required
                    name="description"
                    component={TextField}
                    type="text"
                    label="คำอธิบาย"
                    variant="outlined"
                    style={{ width: "100%" }}
                    multiline
                    rows={5}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                {mode === "update" ? (
                  <Field
                    fullWidth
                    required
                    name="price"
                    component={TextField}
                    type="text"
                    label="ราคา"
                    variant="outlined"
                    style={{ width: "100%" }}
                    parse={normalizeNumber}
                    initialValue={defauldata.price}
                  />
                ) : (
                  <Field
                    fullWidth
                    required
                    name="price"
                    component={TextField}
                    type="text"
                    label="ราคา"
                    variant="outlined"
                    style={{ width: "100%" }}
                    parse={normalizeNumber}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                {mode === "update" ? (
                  <Field
                    fullWidth
                    required
                    name="amount"
                    component={TextField}
                    type="text"
                    label="จำนวน"
                    variant="outlined"
                    style={{ width: "100%" }}
                    parse={normalizeNumber}
                    initialValue={defauldata.amount}
                  />
                ) : (
                  <Field
                    fullWidth
                    required
                    name="amount"
                    component={TextField}
                    type="text"
                    label="จำนวน"
                    variant="outlined"
                    style={{ width: "100%" }}
                    parse={normalizeNumber}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {mode === "update" ? (
                  <FormControl style={{ width: "100%" }}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={test}
                      getOptionLabel={(option) => option.name}
                      style={{ width: "100%" }}
                      onChange={onChange}
                      defaultValue={test.find(element => element.name === defauldata.productType[0])}
                      renderInput={(params) => (
                        <MuiTExtField
                          {...params}
                          label="ประเภทสินค้า"
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
                      options={test}
                      getOptionLabel={(option) => option.name}
                      style={{ width: "100%" }}
                      onChange={onChange}
                      renderInput={(params) => (
                        <MuiTExtField
                          {...params}
                          label="ประเภทสินค้า"
                          variant="outlined"
                          style={{ width: "100%" }}
                        />
                      )}
                    />
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  startIcon={<SaveAltIcon />}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={submitting}
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

export default ProductForm;
