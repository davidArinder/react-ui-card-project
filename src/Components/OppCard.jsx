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
  } = props;

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
    <Card sx={{ margin: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Opp Name</TableCell>
              <TableCell align="left">Opp Stage</TableCell>
              <TableCell align="right">Rep Probability</TableCell>
              <TableCell align="right">PX Probability</TableCell>
              <TableCell align="left">PX Tier</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="left">Sales Rep</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              // onClick={(event) => handleRowClick(event, row)}
              // key={row.oppId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {oppName}
              </TableCell>
              <TableCell align="left">{stage}</TableCell>
              <TableCell align="right">{repProbability}</TableCell>
              <TableCell align="right">{pilytixProbability}</TableCell>
              <TableCell align="left">{pilytixTier}</TableCell>
              <TableCell align="right">{amount}</TableCell>
              <TableCell align="left">{product}</TableCell>
              <TableCell align="left">{salesRepName}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Bar options={options} data={data} />
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <TableContainer>
            <Table>
              <TableBody>
                {pilytixFactorsIncreasingWin !== null ? (
                  pilytixFactorsIncreasingWin.map((winFactor) => (
                    <TableRow key={winFactor.name}>
                      <TableCell>{winFactor.name}</TableCell>
                      <TableCell>{winFactor.message}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={6}>
          <TableContainer>
            <Table>
              <TableBody>
                {pilytixFactorsDecreasingWin !== null ? (
                  pilytixFactorsDecreasingWin.map((loseFactor) => (
                    <TableRow key={loseFactor.name}>
                      <TableCell>{loseFactor.name}</TableCell>
                      <TableCell>{loseFactor.message}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Card>
  );
}
