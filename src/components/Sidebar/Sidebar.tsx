import { List, ListItem } from "@mui/material";
import React from "react";
import { sidebarData } from "./SidebarData";
import IconWrapper from "./IconWrapper";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar-styles.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutChannel } from "../Header/MenuOptions";
import {
  resetDeletedProductIds,
  resetOwnFilters,
} from "../../redux/features/productsSlice";
import { useUserAuth } from "../../context/UserAuthContext";
import { useAppDispatch } from "../../hooks/reduxHooks";

type Props = {
  handleDrawerToggle: () => void;
};

const Sidebar = ({ handleDrawerToggle }: Props) => {
  const { logOut, setLogin } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogOut = async () => {
    try {
      logoutChannel.postMessage("Logout");
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

  return (
    <div>
      <List>
        {sidebarData.map((itam, index) => (
          <ListItem
            key={itam.name}
            disablePadding
            onClick={handleDrawerToggle}
            className="list-item"
          >
            <NavLink to={itam.route} className="linkSidebar">
              <div className="icon">
                <IconWrapper icon={itam.icon} />
              </div>
              <div className="link_text">{itam.name}</div>
            </NavLink>
          </ListItem>
        ))}
        <ListItem
          className="linkSidebar"
          sx={{
            color: "rgb(85,26,139)",
            cursor: "pointer",
          }}
          onClick={handleLogOut}
        >
          <div className="icon">
            <LogoutIcon />
          </div>
          <div className="link_text">Logout</div>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
