import React, { useState, useEffect, useRef } from "react";
import { auth, db, storage, firebaseConfig } from "../config";
import "./ManagememberAddUser.scss";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Today, TodayTwoTone } from "@mui/icons-material";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagememberAddUser = (props) => {
  
  // /-------------Function Validate-------------/
  const onSubmit = (data) => {
    console.log(data);
    userInfo = data;
    // setuserInfo(data);
    AddUsers();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [Birthday, setBirthday] = React.useState(null);
  let [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
    uid: "",
    username: "",
    age: "",
    weight: "",
    height: "",
    imageUrl: "",
  });

  const [Gender, setGender] = React.useState("");
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const AddUsers = async (e) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        userInfo.email,
        userInfo.password
      );
      await CreateUser(user, userInfo);
    } catch (error) {
      throw error;
    }
    setuserInfo({
      ...userInfo,
      email: "",
      password: "",
      username: "",
      age: "",
      weight: "",
      height: "",
      imageUrl: null,
    });
    setpreviewurl(null);
    handleClose();
    console.log("CreateSuccess!");
  };

  let CreateUser = async (user, additionalData) => {
    if (!user) return;
    const userRef = db.collection("users").doc(`${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, uid } = user;
      const { username, age, weight, height, regisDate, imageUrl } =
        additionalData;
      try {
        await userRef.set({
          username,
          email,
          age: Birthday,
          weight,
          height,
          imageUrl: fileUrl,
          uid,
          regisDate: new Date(),
          report: false,
          gender: Gender,
        });
      } catch (error) {
        console.log("this is problem", error);
      }
    }
  };

  // ------------------  Dialog --------------------
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // ------------------- Preview Image --------------------
  const [file, setFile] = useState();
  const [previewurl, setpreviewurl] = useState();
  const filePickerRef = useRef();
  const [fileUrl, setFileUrl] = React.useState(null);

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

  const pickedHandler = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const storageRef = firebaseConfig.storage().ref("Users");
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file); //put data to storage
    setFileUrl(await fileRef.getDownloadURL());
  };

  function pickedImageHandler() {
    filePickerRef.current.click();
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <PersonAddAlt1Icon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="Adduser"
      >
        <DialogTitle style={{ backgroundColor: "rgb(255, 255, 255)" }}>
          <p
            className=""
            style={{
              fontWeight: "700",
              color: "rgb(66, 87, 230)",
              margin: "0",
            }}
          >
            Add User
          </p>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "rgb(255, 255, 255)" }}>
          <DialogContentText id="Adduser">
            <div className="containerALL">
              <div className="containerImage">
                <div className="form-controll center">
                  <input
                    id={props.id}
                    ref={filePickerRef}
                    style={{ display: "none" }}
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={pickedHandler}
                  ></input>

                  <div className={`image-upload ${props.center && "center"}`}>
                    <div className="imageupload">
                      {previewurl && <img src={previewurl} alt="preview"></img>}
                      {!previewurl && (
                        <div
                          className="center"
                          style={{ position: "absolute" }}
                        >
                          <IconButton onClick={pickedImageHandler}>
                            <AddPhotoAlternateIcon />
                          </IconButton>
                        </div>
                      )}
                      {previewurl && (
                        <div
                          className="center"
                          style={{ position: "absolute" }}
                        >
                          <IconButton onClick={pickedImageHandler}>
                            <EditIcon />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="containerForm d-flex flex-wrap ">
                <form
                  className="d-flex flex-wrap"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextField
                    type="email"
                    id="email"
                    name="email"
                    autoFocus
                    // value={userInfo.email}
                    // onChange={onChangeValue}
                    label="email"
                    {...register("email", {
                      required: "Required",
                      minLength: {
                        value: 11,
                        message: "You can enter a minimum of 11 characters.",
                      },
                      maxLength: {
                        value: 20,
                        message: "You can enter a maximum of 20 characters.",
                      },
                      pattern: {
                        value: /^[A-Za-z@.0-9]+$/i,
                        message: "English or Number and no special characters.",
                      },
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />

                  <TextField
                    type={"password"}
                    id="password"
                    name="password"
                    // value={userInfo.password}
                    // onChange={onChangeValue}
                    label="password"
                    {...register("password", {
                      required: "Required",
                      minLength: {
                        value: 6,
                        message: "You can enter a minimum of 6 characters.",
                      },
                      maxLength: {
                        value: 10,
                        message: "You can enter a maximum of 10 characters.",
                      },
                      pattern: {
                        value: /^[A-Za-z0-9]+$/i,
                        message: "English or Number and no special characters.",
                      },
                    })}
                    error={!!errors?.password}
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <TextField
                    type={"text"}
                    id="username"
                    name="username"
                    // value={userInfo.username}
                    // onChange={onChangeValue}
                    label="username"
                    {...register("username", {
                      required: "Required",
                      maxLength: {
                        value: 10,
                        message: "You can enter a maximum of 10 characters.",
                      },
                      pattern: {
                        value: /^[A-Za-z0-9]+$/i,
                        message: "English or Number and no special characters.",
                      },
                    })}
                    error={!!errors?.username}
                    helperText={
                      errors?.username ? errors.username.message : null
                    }
                    style={{
                      width: "60%",
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  />
                  <Box
                    sx={{
                      width: "37.3%",
                      marginBottom: "10px",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns} required>
                      <DatePicker
                        required
                        id="Birthday"
                        label="Birthday"
                        value={Birthday}
                        onChange={(newValue) => {
                          setBirthday(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>

                  <TextField
                    type={"weight"}
                    id="weight"
                    name="weight"
                    // value={userInfo.weight}
                    // onChange={onChangeValue}
                    label="weight"
                    {...register("weight", {
                      required: "Required",
                      maxLength: {
                        value: 3,
                        message: "You can enter a maximum of 3 number.",
                      },
                      pattern: {
                        value: /\d+/,
                        message: "Number Only.",
                      },
                    })}
                    error={!!errors?.weight}
                    helperText={errors?.weight ? errors.weight.message : null}
                    style={{
                      width: "32%",
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  />
                  <TextField
                    type={"height"}
                    id="height"
                    name="height"
                    // value={userInfo.height}
                    // onChange={onChangeValue}
                    label="height"
                    {...register("height", {
                      required: "Required",
                      maxLength: {
                        value: 3,
                        message: "You can enter a maximum of 3 number.",
                      },
                      pattern: {
                        value: /\d+/,
                        message: "Number Only.",
                      },
                    })}
                    error={!!errors?.height}
                    helperText={errors?.height ? errors.height.message : null}
                    style={{
                      width: "32%",
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  />
                  <Box
                    sx={{
                      width: "30.7%",
                      marginBottom: "10px",
                      position: "relative",
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select
                        required
                        labelId="gender"
                        id="gender"
                        label="gender"
                        value={Gender}
                        onChange={handleChange}
                      >
                        <MenuItem value={"ผู้ชาย"}>ผู้ชาย</MenuItem>
                        <MenuItem value={"ผู้หญิง"}>ผู้หญิง</MenuItem>
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
                      style={{ fontWeight: "500", color: "rgb(66, 87, 230)" }}
                      onClick={handleClose}
                    >
                      close
                    </Button>
                    <Button
                      style={{ fontWeight: "500", color: "rgb(66, 87, 230)" }}
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
  );
};

export default ManagememberAddUser;
