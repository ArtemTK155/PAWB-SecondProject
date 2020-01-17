import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  text: {
    marginTop: theme.spacing(1)
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function AddRoute(props) {
  const url = "http://localhost:4000/api/routes";
  //const url2 = "http://localhost:4000/api/custom_model";
  const urlAllModels = "http://localhost:4000/api/custom_model/get_models";

  //const [fields, setFields] = useState([{ body: null, theType: null }]);
  //const [modelName, setModelName] = useState("");
  const [model, setModel] = useState(["Person", "Car", "Test"]);
  const [tasks] = useState(["Create", "GetAll", "Search", "DeleteById"]);
  const [showSearch, setShowSearch] = useState(false);

  const [searchFields] = useState(["F1", "F2", "F3"]);
  const [selectedSearchField, setSelectedSearchField] = useState("");

  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [endpoint, setEndpoint] = useState("");

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      console.log("USE EFFECt ?");
      const result = await axios(urlAllModels);
      //console.log(result.data)
      let v = result.data.map(x => x.customModelName);
      setModel(v);
    }
    fetchData();
    //console.log(model)
  }, []);

  /*
    useEffect(() => {
      setModel(props._models);
      console.log("USE EFFECt ?");
      let models = getAllModels();
      console.log(models.data)
      //setModel(models);
    }, [])
  */
  const handleCreateClick = () => {
    console.log("button pressed");
    postMakeRoute();
  };

  // async function getAllModels() {
  //   try {
  //     const response = await axios.get(urlAllModels);
  //     let v = response.data.map(x => x.customModelName);
  //     //console.log(v);
  //     return v;
  //   } catch (er) {
  //     console.log(er)
  //   }
  // }

  async function postMakeRoute() {
    var type = "";
    try {
      if (selectedTask === "Create") type = "POST";
      if (selectedTask === "GetAll") type = "GET";
      if (selectedTask === "DeleteById") type = "GET";
      if (selectedTask !== "Search") {
        const response = await axios.post(url, {
          endpoint: endpoint,
          model: selectedModel,
          task: selectedTask,
          type: type,
          searchField: selectedSearchField,
          searchValue: "nothing"
        });
        console.log(response);
      } else {
        const response = await axios.post(url, {
          endpoint: endpoint,
          model: selectedModel,
          type: type,
          task: selectedTask,
          searchField: "na",
          searchValue: "na"
        });
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }

    setEndpoint("");
    setSelectedModel("");
    setSelectedSearchField("");
    setSelectedTask("");
  }

  function handleChangeApiEndpoint(event) {
    setEndpoint(event.target.value);
  }

  const handleChangeSelectModel = event => {
    setSelectedModel(event.target.value);
  };

  const handleChangeSelectSearchField = event => {
    setSelectedSearchField(event.target.value);
  };

  const handleChangeSelectTask = event => {
    setSelectedTask(event.target.value);
    if (event.target.value === "Search") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  function ShowSearch(cond) {
    switch (cond) {
      case true:
        return (
          <FormControl
            variant="filled"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel>Search Field</InputLabel>
            <Select
              id="searchField"
              variant="filled"
              value={selectedSearchField}
              onChange={e => handleChangeSelectSearchField(e)}
            >
              {searchFields.map((item, idx) => (
                <MenuItem key={idx} value={item}>{`${item}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case false:
        return <div></div>;
      case 2:
        return 3;
      default:
        return 4;
    }
  }

  // function handleCreate() {
  //   console.log(
  //     {
  //       "endpoint": endpoint,
  //       "model": selectedModel,
  //       "task": selectedTask,
  //       "searchField": selectedSearchField,
  //       "searchValue": "nothing"
  //     }
  //   );
  //   setEndpoint("");
  //   setSelectedModel("");
  //   setSelectedSearchField("");
  //   setSelectedTask("");
  // }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <div className={classes.title}>
            <Typography variant="h6" gutterBottom>
              Create Route
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6} sm={6}>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateClick}
              className={classes.button}
            >
              Create{" "}
            </Button>
          </div>
        </Grid>
      </Grid>

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.text}
              required
              label="Api Endpoint"
              value={endpoint}
              fullWidth
              autoComplete="fname"
              onChange={e => handleChangeApiEndpoint(e)}
            />
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <FormControl
                variant="filled"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel>Model</InputLabel>
                <Select
                  id="selectModel"
                  variant="filled"
                  value={selectedModel}
                  onChange={e => handleChangeSelectModel(e)}
                >
                  {model.map((model, idx) => (
                    <MenuItem key={idx} value={model}>{`${model}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl
                variant="filled"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel>Task</InputLabel>
                <Select
                  id="selectTask"
                  variant="filled"
                  value={selectedTask}
                  onChange={e => handleChangeSelectTask(e)}
                >
                  {tasks.map((task, idx) => (
                    <MenuItem key={idx} value={task}>{`${task}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} sm={3}>
              {ShowSearch(showSearch)}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
