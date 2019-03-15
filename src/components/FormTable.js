import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

const FormTable = ({columnNames, data}) => {
  const hdr = columnNames.map((col, i) => {
    return <th key={i}>{col}</th>;
  });

  const body = data.map((row, i) => {
    return (
      <tr key={i}>
        {row.map((cell, j) => {return <td key={j}>{cell}</td>;})}
      </tr>
    );
  });

  return (
    <Table striped bordered hover>
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
  data: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default FormTable;
