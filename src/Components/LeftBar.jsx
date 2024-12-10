import {
  Dashboard,
  Inventory2,
  ModeNight,
  Person,
  Receipt,
  Store,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";
import Items from "../Pages/Items";
import Customers from "../Pages/Customers";
import Invoices from "../Pages/Invoices";
import Traders from "../Pages/Traders";
import {Route, Router, Routes } from "react-router-dom";




function LeftBar({mode,setMode}) {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  const navigate = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, "", path);
  };

  return (
    <Box 
     flex={1} p={2} 
     sx={{display : { xs: "none", sm: "block" }}}
     bgcolor={"background.default"} color={"text.primary"}
    >
      <Box position='fixed'>
        
      <List>
      
          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <Dashboard/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href='/Items'>
              <ListItemIcon>
                <Inventory2/>
              </ListItemIcon>
              <ListItemText primary="Items" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <Person/>
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <Receipt/>
              </ListItemIcon>
              <ListItemText primary="Invoices" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <Store/>
              </ListItemIcon>
              <ListItemText primary="Traders" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <ModeNight/>
              </ListItemIcon>
            </ListItemButton>
            <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
          </ListItem>
        </List>
        
        </Box>
      </Box> 
  );
}

export default LeftBar;
