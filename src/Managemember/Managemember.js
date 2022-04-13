import React, { useState, useEffect, useContext, createRef } from "react";
import { AuthContext } from "../components/Auth";
import { auth, db, storage, firebaseConfig } from "../config";
import { Redirect, Link } from "react-router-dom";
import "./Managemember.scss";
import ManagememberAddUser from "./ManagememberAddUser";

// /-------------Import Icon-------------/
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
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
import InputAdornment from "@mui/material/InputAdornment";

// /-------------Import Table-------------/
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

// /-------------Import Dialog-------------/
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

// /-------------Import Dropdown-------------/
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// /-------------Import Age To TimeStamp-------------/
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

// /-------------Import Validate-------------/
import { useForm } from "react-hook-form";
import { CompressOutlined } from "@mui/icons-material";
import Input from "@mui/material/Input";
import { FormHelperText } from "@mui/material";

// -------------------- Funtion Dialog Edit --------------------
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// -------------------- Funtion Head DataTable -----------------

function createData(name, email, avatar, manage) {
  return {
    name,
    email,
    avatar,
    manage,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: true,
    label: "Avatar",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "Manage",
    numeric: true,
    disablePadding: false,
    label: "Manage",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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

/////////////////////////////////////////////////////////// Main function /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Managemember = (props) => {
  // /-------------function Dropdown-------------/
  const [Gender, setGender] = React.useState("");
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  // ------------------Function  DialogEdit open and close --------------------
  const [Openn, setOpenn] = React.useState(false);
  const handleClickOpen = () => {
    setOpenn(true);
  };
  const handleClose = () => {
    setOpenn(false);
  };

  // -------------------- Funtion Head Toolbar DataTable -----------------
  const [Search, setSearch] = useState("");

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {/* <input
          placeholder="..."
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        ></input> */}

        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          ></Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add User">
            <IconButton>
              <ManagememberAddUser />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  {
    /*Function Table ------------------------------------------- */
  }
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("desc");

  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = isUsers.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  {
    /* Fetch to HTML ------------------------------------------- */
  }
  let [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
    uid: "",
    username: "",
    age: "",
    weight: "",
    height: "",
    imageUrl: "",
    gender: "",
  });

  const [isUsers, setUsers] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [isEdit, setEdit] = useState(null);

  console.log(userInfo);
  // console.log(date);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            email: doc.data().email,
            uid: doc.data().uid,
            password: doc.data().password,
            username: doc.data().username,
            age: doc.data().age,
            weight: doc.data().weight,
            height: doc.data().height,
            imageUrl: doc.data().imageUrl,
            regisDate: doc.data().regisDate,
            gender: doc.data().gender,
          };
        })
      );
    });
  }, []);

  var age;
  var datetest = "";

  const settime = () => {
    let date = new Date(userInfo.age.seconds * 1000);
    datetest =
      date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    // console.log("test-1", datetest);
  };

  const selectweek = () => {
    settime();
    var dob = new Date(datetest);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    age = Math.abs(year - 1970);
    // console.log("test-1", month_diff);
  };
  selectweek();

  ///////////////////onchangeInput//////////////////////////

  const onChangeValue = (e) => {
    selectweek();
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  /* function Image ----------------------------------------------------------------------------------------------------- */

  const [fileUrl, setFileUrl] = useState(null);
  const [previewurl, setpreviewurl] = useState(null);
  const FilePickerRef = createRef();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const storageRef = firebaseConfig.storage().ref("Users");
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file); //put data to storage
    setFileUrl(await fileRef.getDownloadURL());
  };
  // ------------------- Preview Image --------------------
  const [file, setFile] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpreviewurl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedImageHandler = () => {
    FilePickerRef.current.click();
  };

  {
    /* Edit ------------------------------------------------------------------------------------------------------------------- */
  }
  const EditUser = (items) => {
    // setisOpen(true);
    setEdit(items.id);
    setuserInfo({
      ...userInfo,
      username: items.username,
      age: items.age,
      weight: items.weight,
      height: items.height,
      imageUrl: items.imageUrl,
      gender: items.gender,
    });
  };

  const SaveEditUser = (event) => {
    event.preventDefault();
    try {
      if (fileUrl === null && Birthday === null) {
        db.collection("users").doc(isEdit).update({
          username: userInfo.username,
          weight: userInfo.weight,
          height: userInfo.height,
          imageUrl: userInfo.imageUrl,
          gender: userInfo.gender,
        });
        setFileUrl(null);
        setpreviewurl(null);
      } else if (fileUrl === null && Birthday != null) {
        db.collection("users").doc(isEdit).update({
          username: userInfo.username,
          age: Birthday,
          weight: userInfo.weight,
          height: userInfo.height,
          imageUrl: userInfo.imageUrl,
          gender: userInfo.gender,
        });
        setFileUrl(null);
        setpreviewurl(null);
      } else if (fileUrl != null && Birthday === null) {
        db.collection("users").doc(isEdit).update({
          username: userInfo.username,
          weight: userInfo.weight,
          height: userInfo.height,
          imageUrl: fileUrl,
          gender: userInfo.gender,
        });
        setFileUrl(null);
        setpreviewurl(null);
      } else if (fileUrl != null && Birthday != null) {
        db.collection("users").doc(isEdit).update({
          username: userInfo.username,
          age: Birthday,
          weight: userInfo.weight,
          height: userInfo.height,
          imageUrl: fileUrl,
          gender: userInfo.gender,
        });
        setFileUrl(null);
        setpreviewurl(null);
      } else {
        db.collection("users").doc(isEdit).update({
          username: userInfo.username,
          weight: userInfo.weight,
          height: userInfo.height,
          imageUrl: fileUrl,
          gender: userInfo.gender,
        });
        setFileUrl(null);
        setpreviewurl(null);
      }
      setEdit(null);
      setuserInfo({
        ...userInfo,
        username: "",
        age: "",
        weight: "",
        height: "",
        imageUrl: "",
      });
    } catch (error) {
      throw error;
    }

    if (fileUrl === null) {
      db.collection("mildranking").doc(isEdit).update({
        userRank: userInfo.username,
        imagePro: userInfo.imageUrl,
      });
    } else {
      db.collection("mildranking").doc(isEdit).update({
        userRank: userInfo.username,
        imagePro: fileUrl,
      });
    }

    if (fileUrl === null) {
      db.collection("moderrateranking").doc(isEdit).update({
        userRank: userInfo.username,
        imagePro: userInfo.imageUrl,
      });
    } else {
      db.collection("moderrateranking").doc(isEdit).update({
        userRank: userInfo.username,
        imagePro: fileUrl,
      });
    }

    if (fileUrl === null) {
      db.collection("strenuousranking").doc(isEdit).update({
        userRank: userInfo.username,
        imagePro: userInfo.imageUrl,
      });
    } else {
      db.collection("strenuousranking").doc(isEdit).update({
        userRank: userInfo.username,
        imagePro: fileUrl,
      });
    }
    handleClose();
  };

  // /-------------function birthday-------------/
  const [Birthday, setBirthday] = useState(null);
  // console.log(Birthday);
  {
    /* Delete ------------------------------------------------------------------------------------------------------------- */
  }

  const Delete = (id) => {
    db.collection("users")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deletedusers!", res);
      });
    db.collection("mildranking")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deletedmildranking!", res);
      });
    db.collection("moderrateranking")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deletedmoderrateranking!", res);
      });
    db.collection("strenuousranking")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deletedstrenuousranking!", res);
      });
    db.collection("report")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deletedreport!", res);
      });
  };

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <body>
      <div className="BackGroundManagemember">
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
                Manage Member
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
                      <AssignmentIndOutlinedIcon
                        sx={{ fontSize: 35, color: "Highlight" }}
                      />
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
                      <SportsScoreIcon
                        sx={{ fontSize: 35, color: "Highlight" }}
                      />
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
                      <AutoGraphOutlinedIcon
                        sx={{ fontSize: 35, color: "Highlight" }}
                      />
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
                  width: "100%",
                }}
              >
                <Paper
                  sx={{
                    width: "90%",
                    // backdropFilter: "blur(5px)",
                    // backgroundColor: "rgba(179, 187, 211, 0.605)",

                    backgroundColor: "rgba(255, 255, 255)",
                    position: "relative",
                    margin: "0 auto",
                    height: "570px",
                    top: "50px",
                    padding: "25px 25px",
                  }}
                >
                  <EnhancedTableToolbar numSelected={selected.length} />

                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="Edituser"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={isUsers.length}
                      />
                      <TableBody>
                        {stableSort(isUsers, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.name}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox"></TableCell>

                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding=""
                                >
                                  <div
                                    style={{
                                      position: "relative",
                                      width: "32px",
                                      height: "32px",
                                      display: "flex",
                                      borderRadius: "50px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: "-7.5px",
                                        left: "-17px",
                                        width: "47px",
                                        height: "47px",
                                        borderRadius: "50px",
                                      }}
                                    >
                                      <img
                                        src={row.imageUrl}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "50px",
                                          objectFit: "cover",
                                        }}
                                      ></img>
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell align="right">
                                  {row.username}
                                </TableCell>

                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">
                                  {/* -------------------Dialog Edit Page --------------------------------------- */}
                                  <div>
                                    <Tooltip title="Edit">
                                      <IconButton
                                        sx={{
                                          color: "aliceblue",
                                          position: "absolute ",
                                          right: "75px",
                                        }}
                                      >
                                        <EditIcon
                                          onClick={() => {
                                            EditUser(row);
                                            handleClickOpen();
                                          }}
                                          sx={{
                                            position: "absolute",
                                            fontSize: 25,
                                            color: "rgb(47, 52, 201)",
                                          }}
                                        />
                                      </IconButton>
                                    </Tooltip>

                                    <Dialog
                                      open={Openn}
                                      TransitionComponent={Transition}
                                      keepMounted
                                      onClose={handleClose}
                                      aria-describedby="Edituser"
                                    >
                                      <DialogTitle
                                        style={{
                                          backgroundColor: "rgb(255, 255, 255)",
                                        }}
                                      >
                                        <p
                                          className=""
                                          style={{
                                            fontWeight: "700",
                                            color: "rgb(66, 87, 230)",
                                            margin: "0",
                                          }}
                                        >
                                          Edit User
                                        </p>
                                      </DialogTitle>
                                      <DialogContent
                                        style={{
                                          backgroundColor: "rgb(255, 255, 255)",
                                        }}
                                      >
                                        <DialogContentText id="Edituser">
                                          <div
                                            className="containerALL"
                                            style={{ height: "auto" }}
                                          >
                                            <div className="containerImage">
                                              <input
                                                id={props.id}
                                                ref={FilePickerRef}
                                                style={{ display: "none" }}
                                                type="file"
                                                accept=".jpg,.png,.jpeg"
                                                onChange={onFileChange}
                                              ></input>

                                              <div
                                                className={`imageupload ${
                                                  props.center && "center"
                                                }`}
                                              >
                                                {previewurl && (
                                                  <img src={previewurl}></img>
                                                )}

                                                {previewurl === null && (
                                                  <img
                                                    src={userInfo.imageUrl}
                                                  ></img>
                                                )}

                                                {!previewurl && (
                                                  <div
                                                    className="center"
                                                    style={{
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    <IconButton
                                                      onClick={
                                                        pickedImageHandler
                                                      }
                                                    >
                                                      <AddPhotoAlternateIcon />
                                                    </IconButton>
                                                  </div>
                                                )}

                                                {previewurl && (
                                                  <div
                                                    className="center"
                                                    style={{
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    <IconButton
                                                      onClick={
                                                        pickedImageHandler
                                                      }
                                                    >
                                                      <EditIcon />
                                                    </IconButton>
                                                  </div>
                                                )}
                                              </div>
                                            </div>

                                            <div
                                              className="containerFormEdit "
                                              style={{
                                                position: "relative",
                                                display: "flex",
                                                flexWrap: "wrap",
                                                width: "450px",
                                                height: "auto",
                                                padding: "25px 25px 25px 25px",
                                              }}
                                            >
                                              <form
                                                className="d-flex flex-wrap"
                                                onSubmit={SaveEditUser}
                                              >
                                                <TextField
                                                  type={"text"}
                                                  id="username"
                                                  name="username"
                                                  value={userInfo.username}
                                                  onChange={onChangeValue}
                                                  label="username"
                                                  required
                                                  error={
                                                    userInfo.username.length >
                                                    10
                                                  }
                                                  helperText={
                                                    userInfo.username.length >
                                                    10
                                                      ? "You can enter a maximum of 10 characters."
                                                      : ""
                                                  }
                                                  style={{
                                                    width: "35%",
                                                    marginBottom: "10px",
                                                    marginRight: "10px",
                                                  }}
                                                />

                                                <Box
                                                  sx={{
                                                    width: "38%",
                                                    marginRight: "10px",
                                                    marginBottom: "10px",
                                                  }}
                                                >
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDateFns}
                                                  >
                                                    <DatePicker
                                                      id="Birthday"
                                                      label="Birthday"
                                                      value={Birthday}
                                                      onChange={(newValue) => {
                                                        setBirthday(newValue);
                                                      }}
                                                      renderInput={(params) => (
                                                        <TextField
                                                          {...params}
                                                        />
                                                      )}
                                                    />
                                                  </LocalizationProvider>
                                                </Box>

                                                <TextField
                                                  disabled
                                                  id="age"
                                                  name="age"
                                                  value={age}
                                                  label="age"
                                                  InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        (yr)
                                                      </InputAdornment>
                                                    ),
                                                  }}
                                                  style={{
                                                    width: "21.7%",
                                                    marginBottom: "10px",
                                                  }}
                                                />

                                                <TextField
                                                  required
                                                  type="number"
                                                  id="weight"
                                                  name="weight"
                                                  value={userInfo.weight}
                                                  onChange={onChangeValue}
                                                  label="weight"
                                                  InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        (kg)
                                                      </InputAdornment>
                                                    ),
                                                  }}
                                                  error={
                                                    userInfo.weight.length > 3
                                                  }
                                                  helperText={
                                                    userInfo.weight.length > 3
                                                      ? "Please enter actual weight."
                                                      : ""
                                                  }
                                                  style={{
                                                    width: "50%",
                                                    marginBottom: "10px",
                                                    marginRight: "10px",
                                                  }}
                                                />
                                                <TextField
                                                  required
                                                  type="number"
                                                  id="height"
                                                  name="height"
                                                  value={userInfo.height}
                                                  onChange={onChangeValue}
                                                  label="height"
                                                  InputProps={{
                                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                        (cm)
                                                      </InputAdornment>
                                                    ),
                                                  }}
                                                  error={
                                                    userInfo.height.length > 3
                                                  }
                                                  helperText={
                                                    userInfo.height.length > 3
                                                      ? "Please enter actual weight."
                                                      : ""
                                                  }
                                                  style={{
                                                    width: "47%",
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                                <Box
                                                  sx={{
                                                    width: "99.5%",
                                                    marginBottom: "10px",
                                                  }}
                                                >
                                                  <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">
                                                      Gender
                                                    </InputLabel>
                                                    <Select
                                                      required
                                                      labelId="demo-simple-select-label"
                                                      id="gender"
                                                      name="gender"
                                                      value={userInfo.gender}
                                                      label="gender"
                                                      onChange={onChangeValue}
                                                    >
                                                      <MenuItem
                                                        value={"ผู้ชาย"}
                                                      >
                                                        ผู้ชาย
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"ผู้หญิง"}
                                                      >
                                                        ผู้หญิง
                                                      </MenuItem>
                                                    </Select>
                                                  </FormControl>
                                                </Box>
                                                <div
                                                  style={{
                                                    position: "relative",
                                                    top: "17px",
                                                    display: "flex",
                                                    left: "270px",
                                                  }}
                                                >
                                                  <Button
                                                    style={{
                                                      fontWeight: "500",
                                                      color: "rgb(66, 87, 230)",
                                                    }}
                                                    onClick={handleClose}
                                                  >
                                                    close
                                                  </Button>
                                                  <Button
                                                    style={{
                                                      fontWeight: "500",
                                                      color: "rgb(66, 87, 230)",
                                                    }}
                                                    type="submit"
                                                  >
                                                    Submit
                                                  </Button>
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                        </DialogContentText>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                  {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={() => Delete(row.id)}
                                      sx={{
                                        color: "aliceblue",
                                        position: "relative",
                                        top: "-4px",
                                      }}
                                    >
                                      <DeleteIcon
                                        sx={{
                                          position: "absolute",
                                          fontSize: 25,
                                          color: "rgb(224, 43, 43)",
                                        }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    style={{
                      position: "relative",
                      top: "25px",
                      alignItems: "center",
                    }}
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={isUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>
            </Typography>
          </Box>
        </Box>
      </div>
    </body>
  );
};

export default Managemember;
