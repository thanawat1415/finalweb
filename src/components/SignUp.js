import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../config";
import { Link } from "react-router-dom";
import "./SignUp.scss";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { blue, purple } from "@mui/material/colors";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const AddUser = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[600]),
    backgroundColor: blue[800],
    "&:hover": {
      backgroundColor: blue[500],
    },
  }));

  return (
    <body>
      <div className="BackGround">
        <div className="container">
          <p className="nameproject">Easy Excersice</p>

          <form className="form" onSubmit={AddUser}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <Stack spacing={0} direction="row">
              <ColorButton
                className="buttonSingup"
                type="submit"
                variant="contained"
              >
                SignUp
              </ColorButton>
            </Stack>
            <p className="p2"> Already have an account?</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button className="buttonlogin" color="primary">
                login
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </body>
  );
};

export default SignUp;
