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
import { Card, Button } from "@mui/material";
import OppCard from "./Components/OppCard.jsx";
import Box from "@mui/material/Box";
import showAsPercent from "./utils/percentUtils.js";
import showAsDollars from "./utils/dollarUtils.js";

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

  const [open, setOpen] = useState(false);
  const [rowState, setRowState] = useState([{}]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ color: "#666666" }}>
              Opp Name
            </TableCell>
            <TableCell align="left" sx={{ color: "#666666" }}>
              Opp Stage
            </TableCell>
            <TableCell align="right" sx={{ color: "#666666" }}>
              Rep Probability
            </TableCell>
            <TableCell align="right" sx={{ color: "#666666" }}>
              PX Probability
            </TableCell>
            <TableCell align="left" sx={{ color: "#666666" }}>
              PX Tier
            </TableCell>
            <TableCell align="right" sx={{ color: "#666666" }}>
              Amount
            </TableCell>
            <TableCell align="left" sx={{ color: "#666666" }}>
              Product
            </TableCell>
            <TableCell align="left" sx={{ color: "#666666" }}>
              Sales Rep
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              onClick={(event) => handleRowClick(event, row)}
              key={row.oppId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ color: "#666666" }}>
                {row.oppName}
              </TableCell>
              <TableCell align="left" sx={{ color: "#666666" }}>
                {row.stage}
              </TableCell>
              <TableCell align="right" sx={{ color: "#666666" }}>
                {showAsPercent(row.repProbability)}
              </TableCell>
              <TableCell align="right" sx={{ color: "#666666" }}>
                {showAsPercent(row.pilytixProbability)}
              </TableCell>
              <TableCell align="left" sx={{ color: "#666666" }}>
                {row.pilytixTier}
              </TableCell>
              <TableCell align="right" sx={{ color: "#666666" }}>
                {showAsDollars.format(row.amount)}
              </TableCell>
              <TableCell align="left" sx={{ color: "#666666" }}>
                {row.product}
              </TableCell>
              <TableCell align="left" sx={{ color: "#666666" }}>
                {row.salesRepName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose}>
        {/* Modal content or something instead? */}
        <div>
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
          />
        </div>
      </Modal>
    </TableContainer>
  );
}
