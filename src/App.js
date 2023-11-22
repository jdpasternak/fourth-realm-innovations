import { Box, Container } from "@mui/material";
import "./App.css";
import ApplicationContextProvider from "./ContextProvider";
import Nav from "./components/Nav";
import { useContext } from "react";
import ApplicationContext from "./Context";

const MainPage = () => {
  const { currentPage } = useContext(ApplicationContext);

  return <Container>{currentPage}</Container>;
};

function App() {
  return (
    <ApplicationContextProvider>
      <Box>
        <Nav />
        <MainPage />
      </Box>
    </ApplicationContextProvider>
  );
}

export default App;
