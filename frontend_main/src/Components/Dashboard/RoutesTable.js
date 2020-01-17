import React from "react";
import { forwardRef, useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const axios = require("axios").default;

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function MaterialTableDemo() {
  const classes = useStyles();
  //const bull = <span className={classes.bullet}>•</span>;
  const urlBase = "http://localhost:5000/api/";
  const urlAllRoutes = "http://localhost:4000/api/routes/get_all_routes";
  const urlGetModels = "http://localhost:4000/api/custom_model/get_models";

  const [endpoints, setEndpoints] = useState([]);
  const [models, setModels] = useState([]);
  const [state] = React.useState({
    columns: [
      { title: "URL", field: "endpoint" },
      { title: "Type", field: "type" }
    ]
  });

  // get a list of models available
  async function getModels() {
    try {
      const response = await axios.get(urlGetModels);
      console.log("api call ");
      setModels(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //life cyclehook to fetch data on component creation
  useEffect(() => {
    async function fetchData() {
      console.log("USE EFFECt ?");
      const result = await axios(urlAllRoutes);
      var res = result;
      //console.log(result.data);
      //let v = result.data.map(x => x.endpoint);
      res.data.forEach(element => {
        element.endpoint = urlBase + element.endpoint;
      });
      //set the state variable
      setEndpoints(result.data);
    }
    fetchData();
    getModels();
  }, []);

  return (
    <MaterialTable
      icons={tableIcons}
      title="Editable Example"
      columns={state.columns}
      data={endpoints}
      actions={[
        {
          icon: AssignmentOutlinedIcon,
          tooltip: "Copy Endpoint",
          onClick: (event, rowData) => {
            const textField = document.createElement("textarea");
            textField.innerText = rowData.endpoint;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            textField.remove();
          }
        }
      ]}
      detailPanel={rowData => {
        let obj = models.find(o => o.customModelName === rowData.model);
        let string = "";
        if (rowData.type === "POST") {
          obj.fields.forEach(element => {
            string = string + element.body + " | ";
          });
        }
        return (
          <div>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                ></Typography>
                <Typography variant="h5" component="h2">
                  {obj.customModelName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Params
                </Typography>
                <Typography variant="body2" component="p">
                  {string}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        );
      }}
      onRowClick={(event, rowData, togglePanel) => {
        togglePanel();
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            resolve();
            setEndpoints(prevState => {
              const data = [...prevState];
              data.push(newData);
              return data;
            });
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            resolve();
            if (oldData) {
              setEndpoints(prevState => {
                const data = [...prevState];
                data[data.indexOf(oldData)] = newData;
                return data;
              });
            }
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            resolve();
            setEndpoints(prevState => {
              const data = [...prevState];
              data.splice(data.indexOf(oldData), 1);
              return data;
            });
          })
      }}
    />
  );
}
