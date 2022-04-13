import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import firebaseConfig from "../config";
import "./Nav.scss";

import CardTravelIcon from "@mui/icons-material/CardTravel";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Tooltip from "@mui/material/Tooltip";
import { color } from "@mui/system";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Nav = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* --------------- Nave ด้านบน------------------------- */}
        <AppBar position="fixed" open={open}>
          <Toolbar className="HeaderNavX">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div className="nameprojectNav">Easy Calorie burn</div>
            <Tooltip title="Logout">
              <IconButton
                onClick={() => firebaseConfig.auth().signOut()}
                sx={{
                  color: "aliceblue",
                  position: "relative",
                  right: "-1100px",
                }}
              >
                <LogoutIcon sx={{ fontSize: 30, color: "aliceblue" }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        {/* --------------- Nave ด้านข้าง ------------------------- */}
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className="HeaderNavY">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          
          <Link to="/managemember" style={{ textDecoration: "none" }}>
            <List className="ManagememberMemberNav">
              {["Manage Member"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    <AssignmentIndOutlinedIcon sx={{ fontSize: 35 }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Link>

          <List className="ManagememberRating">
            {["Manage Rating"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <AutoGraphOutlinedIcon sx={{ fontSize: 35 }} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        {/* --------------- Nave เนื้อหา ------------------------- */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          <Typography paragraph></Typography>
        </Box>
      </Box>
    </>
  );
};

export default Nav;
