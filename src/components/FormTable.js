import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import './FormTable.css';

const FormTable = ({columns, data, selectedRows, onRowClicked}) => {
  const hdr = columns.map((col, i) => {
    return <th key={i}>{col}</th>;
  });

  const body = data.map((row, i) => {
    return (
      <tr key={i}
          onClick={() => onRowClicked(i)}
          {...(selectedRows.includes(i) && {className:'selected'})}>
        {row.map((cell, j) => {return <td key={j}>{cell}</td>;})}
      </tr>
    );
  });

  return (
    <Table bordered hover>
      <thead>
        <tr>{hdr}</tr>
      </thead>
      <tbody>
        {body}
      </tbody>
    </Table>
  );
}

FormTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRowClicked: PropTypes.func.isRequired
};

export default FormTable;
