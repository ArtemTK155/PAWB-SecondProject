import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const axios = require("axios").default;

const useStyles = makeStyles(theme => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
    //marginLeft: theme.spacing(1),
  },
  title: {
    whiteSpace: "nowrap",
    marginTop: theme.spacing(2)
  },
  formControl: {
    minWidth: 120
  },
  text: {
    marginTop: theme.spacing(1)
  }
}));

//
export default function AddModel(props) {
  const url = "http://localhost:4000/api/custom_model";
  //state to hold fields created
  const [fields, setFields] = useState([{ body: null, theType: null }]);
  //state to hold the model name
  const [modelName, setModelName] = useState("");
  const classes = useStyles();

  function onAddModel() {
    let m = [...props._models, modelName];
    props._setModels(m);
  }

  const handleNext = () => {
    console.log(fields);
    postData();
    onAddModel();
  };

  async function postData() {
    try {
      let mName = modelName.replace(/\s/g, ""); //remove spaces
      const response = await axios.post(url, {
        customModelName: mName,
        fields: fields
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeModelName(event) {
    console.log(modelName);
    setModelName(event.target.value);
  }

  function handleChange(i, event) {
    const values = [...fields];
    values[i].body = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ body: null, theType: null });
    console.log("Add Field Pressed");
    console.log(values);
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  function handleChangeSelect(i, event) {
    const values = [...fields];
    values[i].theType = event.target.value;
    setFields(values);
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <div className={classes.title}>
            <Typography variant="h6" gutterBottom>
              Create Model
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6} sm={6}>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              Create{" "}
            </Button>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            label="Model Name"
            value={modelName}
            fullWidth
            autoComplete="fname"
            onChange={e => handleChangeModelName(e)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={6}>
          <div className={classes.button}>
            <Button variant="contained" fullWidth onClick={() => handleAdd()}>
              Add Simple Field
            </Button>
          </div>
          {fields.map((field, idx) => (
            <Grid key={idx} container spacing={3}>
              <Grid key={idx} item xs={6}>
                <div key={`${field}-${idx}`}>
                  <TextField
                    className={classes.text}
                    required
                    fullWidth
                    label="Field"
                    value={field.body || ""}
                    onChange={e => handleChange(idx, e)}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={field.theType || ""}
                    variant="filled"
                    onChange={e => handleChangeSelect(idx, e)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"String"}>String</MenuItem>
                    <MenuItem value={"Number"}>Number</MenuItem>
                    <MenuItem value={"Etc"}>Etc</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => handleRemove(idx)}
                >
                  <HighlightOffIcon color="secondary" />
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <div className={classes.button}>
            <Button variant="contained" fullWidth>
              Add Advanced Field
            </Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
