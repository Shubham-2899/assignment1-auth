import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  resetDeletedProductIds,
  resetOwnFilters,
} from "../../redux/features/productsSlice";

type Props = {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElUser: HTMLElement | null;
  handleCloseUserMenu: () => void;
  setAnchorElUser: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

const MenuOptions = ({
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
  setAnchorElUser,
}: Props) => {
  const { logOut, user, login, setLogin } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogOut = async () => {
    try {
      await logOut();
      localStorage.removeItem("Auth Token");
      localStorage.removeItem("user");
      dispatch(resetDeletedProductIds());
      dispatch(resetOwnFilters());
      setLogin(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAnchorElUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {login ? (
        <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User" src={require("../../Images/avatar.png")} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{user?.displayName}</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogOut();
              }}
            >
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : null}
    </>
  );
};

export default MenuOptions;
