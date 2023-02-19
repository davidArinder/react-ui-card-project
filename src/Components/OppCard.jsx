import React from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import { styled } from "@mui/material/styles";

const StyledHeadCell = styled(TableCell)(({}) => ({
  color: "#666666",
  fontWeight: "bold",
}));

const StyledCell = styled(TableCell)(({}) => ({
  color: "#666666",
}));

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
        <IconButton onClick={() => handleClose()}>
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
                <StyledHeadCell align="left">Opp Name</StyledHeadCell>
                <StyledHeadCell align="left">Opp Stage</StyledHeadCell>
                <StyledHeadCell align="right">Rep Probability</StyledHeadCell>
                <StyledHeadCell align="right">PX Probability</StyledHeadCell>
                <StyledHeadCell align="left">PX Tier</StyledHeadCell>
                <StyledHeadCell align="right">Amount</StyledHeadCell>
                <StyledHeadCell align="left">Product</StyledHeadCell>
                <StyledHeadCell align="left">Sales Rep</StyledHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledCell component="th" scope="row">
                  {oppName}
                </StyledCell>
                <StyledCell align="left">{stage}</StyledCell>
                <StyledCell align="right">
                  {showAsPercent(repProbability)}
                </StyledCell>
                <StyledCell align="right">
                  {showAsPercent(pilytixProbability)}
                </StyledCell>
                <StyledCell align="left">
                  <Rating
                    value={numberForStars(pilytixTier)}
                    size="small"
                    readOnly
                  />
                </StyledCell>
                <StyledCell align="right">
                  {showAsDollars.format(amount)}
                </StyledCell>
                <StyledCell align="left">{product}</StyledCell>
                <StyledCell align="left">{salesRepName}</StyledCell>
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
                      <StyledHeadCell>{winFactor.name}</StyledHeadCell>
                      <StyledCell>{winFactor.message}</StyledCell>
                      <StyledCell>{`(${winFactor.weight.description})`}</StyledCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledCell>{noInfo}</StyledCell>
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
                      <StyledHeadCell>{loseFactor.name}</StyledHeadCell>
                      <StyledCell>{loseFactor.message}</StyledCell>
                      <StyledCell>{`(${loseFactor.weight.description})`}</StyledCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledCell>{noInfo}</StyledCell>
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
