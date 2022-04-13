import React, { useState, useEffect, useContext, createRef } from "react";
import { AuthContext } from "../components/Auth";
import { auth, db, storage, firebaseConfig } from "../config";
import { Redirect, Link } from "react-router-dom";
import ManagememberEasy from "./ManagememberEasy";
import ManagememberModerate from "./ManagememberModerate";
import ManagememberStrenuous from "./ManagememberStrenuous";
import "./Managememberrating.scss"

// /-------------Import Icon-------------/
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

// /-------------Import Nav-------------/
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

// /-------------Import Tabs-------------/
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// -------------------- Funtion Tabs -----------------------------------------------------------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// -------------------- Funtion Nav -----------------------------------------------------------------------------
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

/////////////////////////////////////////////////////////// Main function /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Managememberrating = (props) => {
  {
    /* --------------- function Tabs------------------------- */
  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  {
    /* Nav ------------------------------------------- */
  }
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
    <body>
      <div className="BackGroundManageRating">
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
              <div className="nameprojectNav">Easy Excersice</div>

              <Tooltip title="Logout">
                <IconButton
                  onClick={() => firebaseConfig.auth().signOut()}
                  sx={{
                    color: "aliceblue",
                    position: "absolute",
                    right: "20px",
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
              <div
                className=""
                style={{
                  fontsize: "60px",
                  fontWeight: "500",
                  color: "aliceblue",
                  fontFamily: "Satisfy,cursive",
                }}
              >
                Manage Rating
              </div>
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
                      <AssignmentIndOutlinedIcon sx={{ fontSize: 35, color:"Highlight" }} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Link>

            <Link to="/managememberrating" style={{ textDecoration: "none" }}>
              <List className="ManagememberRating">
                {["Manage Rating"].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      <SportsScoreIcon sx={{ fontSize: 35, color:"Highlight" }} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Link>

            <Link to="/memberreport" style={{ textDecoration: "none" }}>
              <List className="ManagememberMemberNav">
                {["Member Report"].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      <AutoGraphOutlinedIcon sx={{ fontSize: 35, color:"Highlight" }} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Link>

            <Divider />
          </Drawer>

          {/* --------------- Nave เนื้อหา ------------------------- */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            <DrawerHeader />
            <Typography>
              <Box
                sx={{
                  margin: "0 auto",
                  width: "93.3%",
                  position: "relative",
                  top: "-55px",
                  zIndex: "2000",
                  // backgroundColor: "ButtonHighlight",
                }}
              >
                <Box
                  sx={{
                    borderBottom: 0,
                    borderColor: "divider",
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="secondary"
                    indicatorColor="secondary"
                    centered
                  >
                    <Tab label="Mild" {...a11yProps(0)} />
                    <Tab label="Moderate" {...a11yProps(1)} />
                    <Tab label="Strenuous" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <ManagememberEasy></ManagememberEasy>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ManagememberModerate></ManagememberModerate>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ManagememberStrenuous></ManagememberStrenuous>
                </TabPanel>
              </Box>
            </Typography>
          </Box>
        </Box>
      </div>
    </body>
  );
};

export default Managememberrating;
