import { Mail, Notifications, Pets } from "@mui/icons-material";
import logo from '../Assets/logo.jpg.webp';
import user from '../Assets/user.jpg';
import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  Badge,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  background: "white",
  margin: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

function Navbar() {
  const [anchorEl,setAnchorEl] = React.useState(false);

  const handleClose=()=>{
    setAnchorEl(null);
  }
  const handleOpen=(ev)=>{
    setAnchorEl(ev.currentTarget);
  }
    

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Debtors Accounting
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="Search..."/>
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={user}
            onClick={handleOpen}
          />
        </Icons>
        <UserBox onClick={handleOpen}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="/Assets/logo.jpg.webp"
          />
          <Typography variant="span">John</Typography>
        </UserBox >
      </StyledToolbar>
      <Menu
        id="user-menu"
        aria-label="user-button"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
