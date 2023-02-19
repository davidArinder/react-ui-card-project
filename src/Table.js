import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as opportunities from "./opportunities.json";
import Modal from "@mui/material/Modal";
import OppCard from "./Components/OppCard.jsx";
import showAsPercent from "./utils/percentUtils.js";
import showAsDollars from "./utils/dollarUtils.js";
import Rating from "@mui/material/Rating";
import numberForStars from "./utils/starUtils";
import "./styles.css";
import { styled } from "@mui/material/styles";

// Development time: ~10 hours
// David Arinder
// david.arinder@gmail.com
// I verify that the work done for this take-home assignment is my own.

const StyledHeadCell = styled(TableCell)(() => ({
  color: "#666666",
  fontWeight: "bold",
}));

const StyledCell = styled(TableCell)(() => ({
  color: "#666666",
}));

export default function BasicTable() {
  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;

  const handleRowClick = (event, row) => {
    setRowState(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextOpp = () => {
    for (let i = 0; i < data.length; i++) {
      if (
        data.indexOf(data[i]) !== data.length - 1 &&
        data[i].oppId === rowState.oppId
      ) {
        setRowState(data[i + 1]);
      }
    }
  };

  const handlePrevOpp = () => {
    for (let i = 0; i < data.length; i++) {
      if (data.indexOf(data[i]) !== 0 && data[i].oppId === rowState.oppId) {
        setRowState(data[i - 1]);
      }
    }
  };

  const handleLeftKey = (oppId) => {
    handlePrevOpp(oppId);
  };

  const handleRightKey = (oppId) => {
    handleNextOpp(oppId);
  };

  const [open, setOpen] = useState(false);
  const [rowState, setRowState] = useState([{}]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {data.map((row) => (
            <TableRow
              onClick={(event) => handleRowClick(event, row)}
              key={row.oppId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover={true}
            >
              <StyledCell component="th" scope="row">
                {row.oppName}
              </StyledCell>
              <StyledCell align="left">{row.stage}</StyledCell>
              <StyledCell align="right">
                {showAsPercent(row.repProbability)}
              </StyledCell>
              <StyledCell align="right">
                {showAsPercent(row.pilytixProbability)}
              </StyledCell>
              <StyledCell align="left">
                <Rating
                  value={numberForStars(row.pilytixTier)}
                  size="small"
                  readOnly
                />
              </StyledCell>
              <StyledCell align="right">
                {showAsDollars.format(row.amount)}
              </StyledCell>
              <StyledCell align="left">{row.product}</StyledCell>
              <StyledCell align="left">{row.salesRepName}</StyledCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose}>
        <div
          m={1}
          display="flex"
          style={{
            outline: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 37) {
              handleLeftKey(rowState.oppId);
            } else if (e.keyCode === 39) {
              handleRightKey(rowState.oppId);
            }
          }}
        >
          <OppCard
            key={rowState.oppId}
            oppName={rowState.oppName}
            stage={rowState.stage}
            repProbability={rowState.repProbability}
            pilytixProbability={rowState.pilytixProbability}
            pilytixTier={rowState.pilytixTier}
            amount={rowState.amount}
            product={rowState.product}
            salesRepName={rowState.salesRepName}
            probabilityHistory={rowState.probabilityHistory}
            pilytixFactorsIncreasingWin={rowState.pilytixFactorsIncreasingWin}
            pilytixFactorsDecreasingWin={rowState.pilytixFactorsDecreasingWin}
            handlePrevOpp={handlePrevOpp}
            handleNextOpp={handleNextOpp}
            handleClose={handleClose}
          />
        </div>
      </Modal>
    </TableContainer>
  );
}
