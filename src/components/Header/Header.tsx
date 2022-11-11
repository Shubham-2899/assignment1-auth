import React, { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import { Link } from "react-router-dom";
import MenuOptions from "./MenuOptions";
import { useUserAuth } from "../../context/UserAuthContext";

const Header = () => {
  const { login, setLogin } = useUserAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken?.length) {
      setLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          <Typography sx={{ fontSize: "2rem", paddingLeft: "8%" }}>
            Assignment 1
          </Typography>
          {login ? (
            <MenuOptions
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              anchorElUser={anchorElUser}
              setAnchorElUser={setAnchorElUser}
            />
          ) : (
            <Button
              sx={{ marginLeft: "auto", color: "white" }}
              variant="contained"
            >
              <Link to="/" className="btn">
                Log In
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
