import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import { Link } from "react-router-dom";
import MenuOptions from "./MenuOptions";
import { useUserAuth } from "../../context/UserAuthContext";
import Sidebar from "../Sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 200;
const appbarHeight = 65;
const Header = () => {
  const { login, setLogin } = useUserAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
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
          {matches ? (
            <Button onClick={handleDrawerToggle} sx={{ color: "white" }}>
              <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
            </Button>
          ) : (
            <Button onClick={handleDrawerToggle} sx={{ color: "white" }}>
              <MenuIcon sx={{ transform: "scale(2)" }} />
            </Button>
          )}

          {login ? (
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
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
            Products
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
