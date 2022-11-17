import { List, ListItem } from "@mui/material";
import React from "react";
import { sidebarData } from "./SidebarData";
import ComponentWithIcon from "./ComponentWithIcon";
import { NavLink } from "react-router-dom";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div>
      <List>
        {sidebarData.map((itam, index) => (
          <ListItem key={itam.name} disablePadding>
            <NavLink to={itam.route} className="linkSidebar">
              <div className="icon">
                <ComponentWithIcon icon={itam.icon} />
              </div>
              <div className="link_text">{itam.name}</div>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
