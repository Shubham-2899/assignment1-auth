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
import "./header-styles.scss";
const drawerWidth = 200;

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
    let authToken = localStorage.getItem("Auth Token");
    if (authToken?.length) {
      setLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar classes={{ root: "appbar" }}>
        <Toolbar sx={{ paddingLeft: "0px" }}>
          {matches ? (
            <Button onClick={handleDrawerToggle}>
              <AddBusinessRoundedIcon className="header-icon" />
            </Button>
          ) : (
            <Button onClick={handleDrawerToggle}>
              <MenuIcon className="header-icon" />
            </Button>
          )}

          {login ? (
            <Box
              component="nav"
              sx={{
                width: { sm: drawerWidth, md: "0px" },
                flexShrink: { sm: 0 },
              }}
            >
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
                classes={{ paper: "MuiDrawer-paper" }}
              >
                <Sidebar handleDrawerToggle={handleDrawerToggle} />
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
                classes={{ paper: "MuiDrawer-paper" }}
                open
              >
                <Sidebar handleDrawerToggle={handleDrawerToggle} />
              </Drawer>
            </Box>
          ) : null}
          <Typography
            variant="body1"
            sx={{ fontSize: "2rem", paddingLeft: "10px" }}
          >
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
