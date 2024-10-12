import { useState } from "react";
import "./App.css";
import TodoListInput from "./TodoListInput";
import Home from "./Home";
import { Container, Tab, Tabs } from "@mui/material";
import { CssBaseline } from "@mui/material";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Container maxWidth="xl">
      <CssBaseline>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Home" />
          <Tab label="Todos" />
        </Tabs>
        {console.log(selectedTab)}
        {selectedTab === 0 ? <Home /> : <TodoListInput />}
      </CssBaseline>
    </Container>
  );
}

export default App;
