import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import showAsPercent from "../utils/percentUtils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function OppCard(props) {
  const {
    oppId,
    oppName,
    stage,
    repProbability,
    pilytixProbability,
    pilytixTier,
    amount,
    product,
    salesRepName,
    probabilityHistory,
    pilytixFactorsIncreasingWin,
    pilytixFactorsDecreasingWin,
    handlePrevOpp,
    handleNextOpp,
  } = props;

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLeftKey = () => {
    console.log("left up");
    if (e.keyCode === 37) {
      console.log("left");
      handlePrevOpp(oppId);
    }
  };

  const handleRightKey = () => {
    if (e.keyCode === 39) {
      handlePrevOpp(oppId);
    }
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Probability History",
      },
    },
  };

  let labels, pxProb, repProb;
  if (probabilityHistory !== null) {
    labels = probabilityHistory.map((prob) => `${prob.daysAgo} days ago`);
    pxProb = probabilityHistory.map((prob) => prob.pilytixProb);
    repProb = probabilityHistory.map((prob) => prob.repProb);
  }

  const noInfo = "No Information";

  const data = {
    labels,
    datasets: [
      {
        label: "PX Probability",
        labels: labels,
        data: pxProb,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Rep Probability",
        data: labels,
        data: repProb,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Card
      sx={{
        maxHeight: 850,
        maxWidth: 850,
      }}
    >
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value={"one"} label="Probability history" />
          <Tab value={"two"} label="Win Factors" />
          <Tab value={"three"} label="Loss Factors" />
        </Tabs>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ margin: "5px" }}>
                <TableCell
                  align="left"
                  sx={{ color: "#666666", fontWeight: "bold" }}
                >
                  Opp Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "#666666", fontWeight: "bold" }}
                >
                  Opp Stage
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "#666666", fontWeight: "bold" }}
                >
                  Rep Probability
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "#666666", fontWeight: "bold" }}
                >
                  PX Probability
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "#666666", fontWeight: "bold" }}
                >
                  PX Tier
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "#666666", fontWeight: "bold" }}
                >
                  Amount
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "#666666", fontWeight: "bold" }}
                >
                  Product
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "#666666", fontWeight: "bold" }}
                >
                  Sales Rep
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: "#666666" }}>
                  {oppName}
                </TableCell>
                <TableCell align="left" sx={{ color: "#666666" }}>
                  {stage}
                </TableCell>
                <TableCell align="right" sx={{ color: "#666666" }}>
                  {showAsPercent(repProbability)}
                </TableCell>
                <TableCell align="right" sx={{ color: "#666666" }}>
                  {showAsPercent(pilytixProbability)}
                </TableCell>
                <TableCell align="left" sx={{ color: "#666666" }}>
                  {pilytixTier}
                </TableCell>
                <TableCell align="right" sx={{ color: "#666666" }}>
                  {amount}
                </TableCell>
                <TableCell align="left" sx={{ color: "#666666" }}>
                  {product}
                </TableCell>
                <TableCell align="left" sx={{ color: "#666666" }}>
                  {salesRepName}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TabPanel value={"one"}>
          <Bar options={options} data={data} />
        </TabPanel>
        <TabPanel value={"two"}>
          <TableContainer sx={{ maxHeight: 450, overflow: "auto" }}>
            <Table>
              <TableBody>
                {pilytixFactorsIncreasingWin !== null ? (
                  pilytixFactorsIncreasingWin.map((winFactor) => (
                    <TableRow key={winFactor.name}>
                      <TableCell sx={{ color: "#666666" }}>
                        {winFactor.name}
                      </TableCell>
                      <TableCell sx={{ color: "#666666" }}>
                        {winFactor.message}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell sx={{ color: "#666666" }}>{noInfo}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={"three"}>
          <TableContainer sx={{ maxHeight: 450, overflow: "auto" }}>
            <Table>
              <TableBody>
                {pilytixFactorsDecreasingWin !== null ? (
                  pilytixFactorsDecreasingWin.map((loseFactor) => (
                    <TableRow key={loseFactor.name}>
                      <TableCell sx={{ color: "#666666" }}>
                        {loseFactor.name}
                      </TableCell>
                      <TableCell sx={{ color: "#666666" }}>
                        {loseFactor.message}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell sx={{ color: "#666666" }}>{noInfo}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
      <Box display="flex" justifyContent="space-between">
        <Button
          onClick={() => handlePrevOpp(oppId)}
          onKeyDown={(e) => {
            console.log("e: ", e);
          }}
        >
          Previous Opp
        </Button>
        <Button
          onClick={() => handleNextOpp(oppId)}
          onKeyDown={() => handleRightKey()}
        >
          Next Opp
        </Button>
      </Box>
    </Card>
  );
}
