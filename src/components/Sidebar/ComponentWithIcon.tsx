import React from "react";
import { Home, Dashboard, Inventory } from "@mui/icons-material";

type Props = {
  icon: string;
};

const ComponentWithIcon = ({ icon }: Props) => {
  switch (icon) {
    case "Home":
      return <Home />;
    case "Dashboard":
      return <Dashboard />;
    case "Inventory":
      return <Inventory />;
    default:
      return null;
  }
};

export default ComponentWithIcon;
