import React, { useState } from "react";
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
import showAsDollars from "../utils/dollarUtils.js";
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
import numberForStars from "../utils/starUtils.js";
import Rating from "@mui/material/Rating";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

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
    handleClose,
  } = props;

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        maxWidth: 1200,
        p: 2,
        border: 1,
      }}
    >
      <Box container="true" display="flex" justifyContent="flex-end">
        <IconButton
          onClick={() => handleClose()}
          // sx={{ top: 3, right: 3, align: "right" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

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
              <TableRow>
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
              <TableRow>
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
                  <Rating
                    value={numberForStars(pilytixTier)}
                    size="small"
                    readOnly
                  />
                </TableCell>
                <TableCell align="right" sx={{ color: "#666666" }}>
                  {showAsDollars.format(amount)}
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
          <Bar
            options={options}
            data={data}
            style={{ maxHeight: 450, overflow: "auto" }}
          />
        </TabPanel>
        <TabPanel value={"two"}>
          <TableContainer sx={{ maxHeight: 450, overflow: "auto" }}>
            <Table>
              <TableBody>
                {pilytixFactorsIncreasingWin !== null ? (
                  pilytixFactorsIncreasingWin.map((winFactor) => (
                    <TableRow key={winFactor.name}>
                      <TableCell sx={{ color: "#666666", fontWeight: "bold" }}>
                        {winFactor.name}
                      </TableCell>
                      <TableCell sx={{ color: "#666666" }}>
                        {winFactor.message}
                      </TableCell>
                      <TableCell
                        sx={{ color: "#666666" }}
                      >{`(${winFactor.weight.description})`}</TableCell>
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
                      <TableCell sx={{ color: "#666666", fontWeight: "bold" }}>
                        {loseFactor.name}
                      </TableCell>
                      <TableCell sx={{ color: "#666666" }}>
                        {loseFactor.message}
                      </TableCell>
                      <TableCell
                        sx={{ color: "#666666" }}
                      >{`(${loseFactor.weight.description})`}</TableCell>
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
        <Button onClick={() => handlePrevOpp(oppId)}>Previous Opp</Button>
        <Button onClick={() => handleNextOpp(oppId)}>Next Opp</Button>
      </Box>
    </Card>
  );
}
