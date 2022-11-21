import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { ForgotPassword } from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Signin from "./components/SignupSignin/Signin";
import Signup from "./components/SignupSignin/Signup";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <Container>
      <UserAuthContextProvider>
        <Header />
        <Routes>
          {/* <Route path="/home" element={<MTable />} /> */}
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserAuthContextProvider>
    </Container>
  );
}

export default App;
