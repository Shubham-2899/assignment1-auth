import { Container } from "@mui/material";
import "./App.scss";
import Header from "./components/Header/Header";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { useEffect } from "react";
import { logoutChannel } from "./components/Header/MenuOptions";
import Routes from "./Routes";

function App() {
  useEffect(() => {
    const logoutAllTabs = () => {
      logoutChannel.onmessage = () => {
        window.location.reload();
        logoutChannel.close();
      };
    };
    logoutAllTabs();
  }, []);

  return (
    <Container>
      <UserAuthContextProvider>
        <Header />
        <Routes />
      </UserAuthContextProvider>
    </Container>
  );
}

export default App;
