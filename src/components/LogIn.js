import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import { Link } from "react-router-dom";
import "./LogIn.scss";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { blue, purple } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

// /-------------Import Validate-------------/
import { useForm } from "react-hook-form";

const LogIn = () => {
  // ----------function validate
  const onSubmit = (data) => {
    // console.log(data);
    Email = data.Email;
    Password = data.Password;
    Submit();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ----------function submitform
  var [Email, setEmail] = useState("");
  var [Password, setPassword] = useState("");

  console.log("Email:", Email, "Password: ", Password);

  const Submit = (e) => {
    let email = Email;
    let password = Password;
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };
  // const Submit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = e.target.elements;
  //   try {
  //     firebaseConfig
  //       .auth()
  //       .signInWithEmailAndPassword(email.value, password.value);
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // ----------function still login
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/managemember" />;
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[600]),
    backgroundColor: blue[800],
    "&:hover": {
      backgroundColor: blue[500],
    },
  }));
  // onChange={handleSubmit(onSubmit)}
  // onSubmit={Submit}
  return (
    <>
      <div className="BackGround">
        <div className="container">
          <p className="nameproject">Easy Excersice</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ position: "relative", top: "30px" }}
          >
            <TextField
              id="Email"
              type="email"
              label="Email"
              autoComplete="Email"
              name="Email"
              autoFocus
              // value={Email}
              // onChange={(e) => setEmail(e.target.value)}
              {...register("Email", {
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
              error={!!errors?.Email}
              helperText={errors?.Email ? errors.Email.message : null}
              style={{
                position: "relative",
                left: "30px",
                width: "87%",
                marginBottom: "15px",
              }}
            />
            <TextField
              type="Password"
              id="Password"
              label="Password"
              autoComplete="Password"
              name="Password"
              // value={Password}
              // onChange={(e) => setPassword(e.target.value)}
              {...register("Password", {
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
              error={!!errors?.Password}
              helperText={errors?.Password ? errors.Password.message : null}
              style={{
                position: "relative",
                left: "30px",
                width: "87%",
                marginBottom: "10px",
              }}
            />
            <ColorButton
              className="button"
              type="submit"
              style={{ position: "relative", left: "380px", top: "20px" }}
            >
              Login
            </ColorButton>
          </form>

          {/* <form className="form" onSubmit={Submit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control" />
            </div>

            <ColorButton className="button" type="submit" variant="contained">
              Login
            </ColorButton>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default LogIn;
