import React, { useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate
} from "@mui/x-data-grid-generator";
import { v4 as uuidv4 } from "uuid";
import { Autocomplete, TextField, Button } from "@mui/material";

function TextComponent(props) {
  const [value, setValue] = useState("");
  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        value={value}
        onChange={(e, newValue) => {
          if (newValue !== null) {
            setValue(newValue.label);
          } else {
            setValue("");
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
}

export default function BasicEditingGrid(props) {
  const elementRef = useRef();
  const [rows, setRows] = useState([
    {
      id: 1,
      age: randomTraderName(),
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate()
    },
    {
      id: 2,
      name: randomTraderName(),
      age: randomTraderName(),
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate()
    },
    {
      id: 3,
      name: randomTraderName(),
      age: randomTraderName(),
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate()
    },
    {
      id: 4,
      name: randomTraderName(),
      age: randomTraderName(),
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate()
    },
    {
      id: 5,
      name: randomTraderName(),
      age: randomTraderName(),
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate()
    }
  ]);

  function isLastRow(id) {
    const last = rows?.at(-1)?.id;
    let result = last === id ? true : false;
    return result;
  }

  const columns = [
    {
      field: "name",
      headerName: "key",
      width: 240,
      editable: false,
      renderCell: (cellValues) => {
        return <TextComponent />;
      }
    },
    {
      field: "age",
      headerName: "Value",
      type: "text",
      editable: true
    },
    {
      field: "id",
      headerName: "ID",
      type: "text",
      editable: true
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 220,
      editable: false,

      sortable: false,
      renderCell: (cellValues) => {
        return (
          <>
            {isLastRow(cellValues.row.id) ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ background: "blue", marginRight: "10px" }}
                  onClick={(event) => {
                    console.log(cellValues);
                    setRows([...rows, { id: uuidv4(), name: "", value: "" }]);
                    // setRows(rows.filter((row) => row.id !== cellValues.row.id));
                  }}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ background: "red" }}
                  onClick={(event) => {
                    console.log(cellValues);
                    setRows((rows) =>
                      rows.filter((row) => row.id !== cellValues.row.id)
                    );
                    // setRows(rows.filter((row) => row.id !== cellValues.row.id));
                  }}
                >
                  -
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ background: "red" }}
                onClick={(event) => {
                  console.log(cellValues);
                  setRows((rows) =>
                    rows.filter((row) => row.id !== cellValues.row.id)
                  );
                  // setRows(rows.filter((row) => row.id !== cellValues.row.id));
                }}
              >
                -
              </Button>
            )}
          </>
        );
      }
    }
  ];

  return (
    <div style={{ height: 600, width: "70%", margin: "auto" }}>
      <h2>MUI Data Grid Example </h2>
      <br />
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnSelector
        disableColumnMenu
        hideFooterPagination
        // onCellFocusOut={(params, event) => {
        //   console.log(params);
        // }}
        onCellClick={(params, event) => {
          console.log(params);
          if (params.colDef.editable) {
            var dblevent = new MouseEvent("dblclick", {
              view: window,
              bubbles: true,
              cancelable: true
            });

            console.log("dispacting event");
            event.target.dispatchEvent(dblevent);
          }
          // event.current.setColumnNode(params.id, "edit");
        }}
        onEditRowsModelChange={(model) => console.log(model)}
      />
    </div>
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001
  }
];
