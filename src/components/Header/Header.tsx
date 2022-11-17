import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Toolbar,
  Typography,
} from "@mui/material";

import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import { Link } from "react-router-dom";
import MenuOptions from "./MenuOptions";
import { useUserAuth } from "../../context/UserAuthContext";
import Sidebar from "../Sidebar/Sidebar";
const drawerWidth = 200;
const appbarHeight = 65;
const Header = () => {
  const { login, setLogin } = useUserAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      <AppBar sx={{ background: "#063970", height: appbarHeight }}>
        <Toolbar>
          <Button onClick={handleDrawerToggle}>
            <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          </Button>

          {login ? (
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    marginTop: `${appbarHeight}px`,
                  },
                }}
              >
                <Sidebar />
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    marginTop: `${appbarHeight}px`,
                  },
                }}
                open
              >
                <Sidebar />
              </Drawer>
            </Box>
          ) : null}
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
