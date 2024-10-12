import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
function TodoListInput() {
  const [todos, setTodos] = useState({ desc: "", date: "", priority: "" });
  const [todoList, setTodoList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { field: "desc", filter: true, sortable: true },
    { field: "date", filter: true },
    {
      field: "priority",
      filter: true,
      cellStyle: (params) =>
        params.value === "Important" ? { color: "red" } : { color: "black" },
    },
  ]);
  const addTodo = () => {
    setTodoList([...todoList, todos]);
  };
  const handleDelete = () => {
    setTodoList(
      todoList.filter(
        (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
      )
    );
  };
  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    setTodos({ ...todos, date: formattedDate.toString() });
  };

  return (
    <>
      <div style={{ marginTop: "2%" }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            label="Description"
            value={todos.desc}
            onChange={(e) => setTodos({ ...todos, desc: e.target.value })}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={(newDate) => handleDateChange(newDate)} />
          </LocalizationProvider>

          <TextField
            label="Priority"
            value={todos.priority}
            onChange={(e) => setTodos({ ...todos, priority: e.target.value })}
          />
          {console.log(todos)}
          <Button onClick={addTodo} variant="outlined">
            Add
          </Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete
          </Button>
        </Stack>
      </div>
      <div
        className="ag-theme-material"
        style={{
          width: 700,
          height: 500,
          //border: "solid",
          marginLeft: "25%",
          marginTop: "2%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todoList}
          columnDefs={columnDefs}
          rowSelection="single"
        />
      </div>
    </>
  );
}

export default TodoListInput;
