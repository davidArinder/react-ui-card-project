import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
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
    <Card>
      <CardContent>
        <Typography>Opp Name: {oppName}</Typography>
        <Typography>Stage: {stage}</Typography>
        <Typography>Rep Probability: {repProbability}</Typography>
        <Typography>PX Probability: {pilytixProbability}</Typography>
        <Typography>PX Tier: {pilytixTier}</Typography>
        <Typography>Amount: {amount}</Typography>
        <Typography>Product: {product}</Typography>
        <Typography>Sales Rep: {salesRepName}</Typography>
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  );
}
