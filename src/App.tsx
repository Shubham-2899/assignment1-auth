import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import "../src/styles/App.scss";
import Header from "./components/Header/Header";
import MTable from "./components/Home/Mtable";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <Container>
      <UserAuthContextProvider>
        <Header />
        <Routes>
          <Route path="/home" element={<MTable />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
    </Container>
  );
}

export default App;
