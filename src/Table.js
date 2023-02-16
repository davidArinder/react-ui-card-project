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

  const handleNextOpp = (oppId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].oppId === oppId) {
        setRowState(data[i + 1]);
      }
    }
  };

  const handlePrevOpp = (oppId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].oppId === oppId) {
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
          {data.map((row) => (
            <TableRow
              onClick={(event) => handleRowClick(event, row)}
              key={row.oppId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.oppName}
              </TableCell>
              <TableCell align="left">{row.stage}</TableCell>
              <TableCell align="right">{row.repProbability}</TableCell>
              <TableCell align="right">{row.pilytixProbability}</TableCell>
              <TableCell align="left">{row.pilytixTier}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="left">{row.product}</TableCell>
              <TableCell align="left">{row.salesRepName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose}>
        <div>
          <Button onClick={() => handlePrevOpp(rowState.oppId)}>
            Previous
          </Button>
          <Button onClick={() => handleNextOpp(rowState.oppId)}>Next</Button>
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
          />
        </div>
      </Modal>
    </TableContainer>
  );
}
