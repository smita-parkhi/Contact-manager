import react, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';

import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

import {Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography} from '@material-ui/core';

import "./index.component.scss"
  
export default function DataTable({data, showActions,
  deleteContactCallback, editContactCallback, tableHeaders,
  activeContactType}) {

  const handleDelete = (row) => {
    deleteContactCallback(row)
  }

  const handleEditClick = (row) => {
    editContactCallback(row)
  }

  const TableEmptyState = () => (
    <div className="table-empty-state">
      <Typography>No Data Found</Typography>
    </div>
  )

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table" className="contact-table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((column) => (
                <TableCell key={column}>
                  {column}
                </TableCell>
              ))}
              {showActions && <TableCell key='Actions'>
                Actions
              </TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length ?data
              .map((row) => {
                const contactDetails = Object.values(row)
                return (
                  <TableRow hover key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <div>
                        {row.personalContact && activeContactType !== 'business' && <p className="contact-number">
                          <PersonIcon style={{ color: "slategray", fontSize: 24 }} />
                          <span>{row.personalContact}</span>
                        </p>}
                        {row.businessContact && activeContactType !== 'personal' && <p className="contact-number">
                          <BusinessCenterIcon style={{ color: "slategray", fontSize: 24 }} />
                          <span>{row.businessContact}</span>
                        </p>}
                      </div>
                    </TableCell>
                    <TableCell className="action-icons">
                        <EditIcon
                          style={{ color: "cornflowerblue", fontSize: 28 }}
                          onClick={()=> handleEditClick(row)}
                        />
                        <DeleteIcon
                          style={{ color: "tomato", fontSize: 28 }}
                          onClick={()=> handleDelete(row)}
                        />
                    </TableCell>
                  </TableRow>
                );
                
              }): null}
          </TableBody>
        </Table>
        {!data.length && <TableEmptyState />}
      </TableContainer>
    </Paper>
  );
}
