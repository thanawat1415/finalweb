import React, { useState, useEffect, useContext, createRef } from "react";
import { AuthContext } from "../components/Auth";
import { auth, db, storage, firebaseConfig } from "../config";
import { Redirect, Link } from "react-router-dom";
import ManagememberAddUser from "../Managemember/ManagememberAddUser";

// /-------------Import Icon-------------/
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// /-------------Import Nav-------------/

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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
import { visuallyHidden } from "@mui/utils";

// -------------------- Funtion Head DataTable -----------------

function createData(ranking, name, score, avatar) {
  return {
    ranking,
    name,
    score,
    avatar,
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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    id: "ranking",
    numeric: false,
    disablePadding: true,
    label: "Ranking",
  },
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
    id: "score",
    numeric: true,
    disablePadding: false,
    label: "Score",
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

/////////////////////////////////////////////////////////// Main function /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ManagememberModerate = () => {
  // -------------------- Funtion Head Toolbar DataTable -----------------

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
          <IconButton onClick={Resetscore}>
            <RestartAltIcon />
          </IconButton>
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  let Resetscore = () => {
    db.collection("moderrateranking")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            sumScoreRank: 0,
          });
        });
      });
    console.log("Reset Success!");
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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
    /* Fetch to HTML ------------------------------------------- */
  }
  const [userInfo, setuserInfo] = useState({
    imagePro: "",
    sumScoreRank: Number,
    userRank: "",
  });

  const [isUsers, setUsers] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [isEdit, setEdit] = useState(null);

  useEffect(() => {
    db.collection("moderrateranking")
      .orderBy("sumScoreRank", "desc")
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              imagePro: doc.data().imagePro,
              sumScoreRank: doc.data().sumScoreRank,
              userRank: doc.data().userRank,
            };
          })
        );
      });
  }, []);

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          // backdropFilter: "blur(5px)",
          // backgroundColor: "rgba(179, 187, 211, 0.605)",
          backgroundColor: "rgba(255, 255, 255)",
          position: "relative",
          margin: "0 auto",
          height: "100%",
          top: "33px",
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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

                      <TableCell align="left">{index + 1 + page * 5}</TableCell>

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
                              src={row.imagePro}
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

                      <TableCell align="right">{row.userRank}</TableCell>

                      <TableCell align="right">{row.sumScoreRank}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          style={{
            position: "relative",
            top: "17px",
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
  );
};

export default ManagememberModerate;
