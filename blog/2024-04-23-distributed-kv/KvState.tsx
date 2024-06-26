import {Box, Button, Grid, IconButton, Input, Paper, TextField, Tooltip} from "@mui/material";
import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import PlusOneIcon from '@mui/icons-material/PlusOne';

const host = "https://demokv.aravinda-kumar.com";

// write an api to get the data from the server using fetch
async function getData() {
  const response = await fetch(`${host}/state`);
  const data = await response.json();
  return data;
}

async function putKey(key: string, value: string) {
  await fetch(`${host}/kv/${key}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      value: value
    })
  });
}

async function addNode() {
  await fetch(`${host}/kv/add`, {
    method: 'PUT'
  });
}

interface NodeProps {
  data: Record<string, string>
  id: number
}

function Node(props: NodeProps) {
  return (
    <Paper >
      <Box sx={{width: "100%", border: "1px solid black", padding: 1}}>
        <Box sx={{margin: "auto", width: "fit-content"}}>Node {props.id}</Box>
      </Box>
      {
        Object.entries(props.data).map(([key, value]) => {
          return (
            <Box key={key}>
              <Box sx={{padding: "2px", backgroundColor: "white", float: "left", width: "50%", border: "1px solid black"}}>{key}</Box>
              <Box sx={{padding: "2px", backgroundColor: "white", float: "left", width: "50%", border: "1px solid black"}}>{value}</Box>
            </Box>
          )
        })
      }
    </Paper>
  )
}

export enum DemoType {
  Replication = 1,
  Scaling,
}

interface KvStateProps {
  demoType: DemoType
}

export function KvState(props: KvStateProps) {
  const [data, setData] = React.useState<Array<Record<string, string>>>([]);
  const [key, setKey] = React.useState<string>("");
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);
  return (
    <Paper sx={{ width: '100%', backgroundColor: 'lightgrey', padding: 2 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1}} >
        {
          props.demoType === DemoType.Replication && (
            <>
              <Grid item xs={4} >
                <TextField color="success" placeholder="Key" sx={{ width: "100%", margin: "0 10px 10px 0"}} value={key} onChange={(e) => setKey(e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField color="success" placeholder="Value" sx={{  width: "100%", margin: "0 10px 10px 0"}} value={value} onChange={(e) => setValue(e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <Button color="success" variant="contained" sx={{ width: "100%", height: "85%" }} onClick={
                  () => {
                    putKey(key, value).then(() => {
                      getData().then((data) => {
                        setData(data);
                        setKey("");
                        setValue("");
                      });
                    });
                  }} disabled={key === "" || value === ""}>
                  SET
                </Button>
              </Grid>
            </>
          )
        }
        {
          props.demoType === DemoType.Scaling && (
            <>
              <Grid item xs={10} />
              <Grid item xs={1}>
                <IconButton sx={{ width: "100%", height: "85%" }} onClick={
                  () => {
                    addNode().then(() => {
                      setData([...data, {}]);
                    });
                  }
                }>
                  <Tooltip title={"Add Node"}>
                    <PlusOneIcon color="success"/>
                  </Tooltip>
                </IconButton>
              </Grid>
            </>
          )
        }
        <Grid item xs={1}>
          <IconButton sx={{ width: "100%", height: "85%" }} onClick={
            () => {
              getData().then((data) => {
                setData(data);
              });
            }
          }>
            <Tooltip title={"Refresh Cluster State"}>
              <RefreshIcon color="info"/>
            </Tooltip>
          </IconButton>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {
            data.map((nodeData, index) => (
              <Grid item xs={3} key={index}>
                <Node data={nodeData} id={index}/>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Paper>
  );
}