import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";

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

  console.log("probhis: ", probabilityHistory);

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
        <Typography>
          Probability History:
          {probabilityHistory.map((prob) => {
            // {
            //   console.log("prob: ", prob.daysAgo);
            // }
            {
              <Typography>{prob.daysAgo}</Typography>;
            }
          })}
        </Typography>
      </CardContent>
    </Card>
  );
}
