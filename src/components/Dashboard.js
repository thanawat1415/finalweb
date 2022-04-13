import React, { useContext } from "react";
import { AuthContext } from "./Auth";
import Nav from "../Navber/Nav";
import { Redirect, Link } from "react-router-dom";

const DashBoard = () => {
  const { currentUser } = useContext(AuthContext);
  const Readfuntion = () => {
    console.log(currentUser);
  };

  return (
    <>
      <br></br>
      <br></br>
      <button onClick={Readfuntion}> Status Logged In </button>
      <div className="containercard">
        <div
          routerLinkActive="router-link-active"
          className="card card rgb"
          data-tilt
          data-tilt-glare
          data-tilt-max-glare="1.5"
        >
          <div className="card-image"></div>
          <div className="card-text">
            <h2>จัดการข้อมูลสมาชิก</h2>
            <span>
              You can manage your member's information in this section of the
              menu.
            </span>
          </div>
          <p>
            You are logged in - <Link to="/managemember">Managenemberpage</Link>
          </p>
        </div>

        <div className="card card rgb">
          <div className="card-image"></div>
          <div className="card-text">
            <h2>จัดการระบบจัดอันดับ</h2>
            <span>
              You can deal with the rating system by editing user information or
              resetting the score in the game.
            </span>
            <p></p>
          </div>
        </div>
        <div className="card card rgb ">
          <div className="card-image"></div>
          <div className="card-text">
            <h2>รายงานสมาชิก</h2>
            <span>
              You can view a user's access data, which can be viewed on a weekly
              or monthly basis.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
