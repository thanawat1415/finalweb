import React, { useState, useEffect, useContext, createRef } from "react";
import { AuthContext } from "../components/Auth";
import { auth, db, storage, firebaseConfig } from "../config";
import { Redirect, Link } from "react-router-dom";
import ManagememberAddUser from "../Managemember/ManagememberAddUser";
import { Key, Numbers } from "@mui/icons-material";
import { id } from "date-fns/locale";

const Feedback = () => {
  /* Fetch to HTML ------------------------------------------- */

  const [userInfo, setuserInfo] = useState({
    question1: Number,
    question2: Number,
    question3: Number,
    question4: Number,
    question5: Number,
  });

  const [isUsers, setUsers] = useState([]);

  // const [isOpen, setisOpen] = useState(false);
  // const [isEdit, setEdit] = useState(null);

  useEffect(() => {
    db.collection("report").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.flatMap((doc) => {
          return {
            id: doc.id,
            question1: doc.data().question1,
            question2: doc.data().question2,
            question3: doc.data().question3,
            question4: doc.data().question4,
            question5: doc.data().question5,
          };
        })
      );
    });
  }, []);

  /* function combind array ------------------------------------------- */
  const ArrQuestion1 = [];
  const ArrQuestion2 = [];
  const ArrQuestion3 = [];
  const ArrQuestion4 = [];
  const ArrQuestion5 = [];

  let Question1 = 0;
  let Question2 = 0;
  let Question3 = 0;
  let Question4 = 0;
  let Question5 = 0;

  isUsers.forEach((e) => {
    // console.log(e.question1);
    ArrQuestion1.push(e.question1);
    ArrQuestion2.push(e.question2);
    ArrQuestion3.push(e.question3);
    ArrQuestion4.push(e.question4);
    ArrQuestion5.push(e.question5);
  });
  // console.log(ArrQuestion1);

  ArrQuestion1.forEach((e) => {
    Question1 = Question1 + e;
  });
  ArrQuestion2.forEach((e) => {
    Question2 = Question2 + e;
  });
  ArrQuestion3.forEach((e) => {
    Question3 = Question3 + e;
  });
  ArrQuestion4.forEach((e) => {
    Question4 = Question4 + e;
  });
  ArrQuestion5.forEach((e) => {
    Question5 = Question5 + e;
  });
  /* function ทศนิยม2ตำแหน่ง ------------------------------------------- */


  /* function filtered mapped ------------------------------------------- */
  const mapped = isUsers.flatMap((obj, index) => obj.type);
  const filtered = mapped.filter(
    (type, index) => mapped.indexOf(type) === index
  );

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div
        style={{
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          color: "rgba(0, 0, 0, 0.87)",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          width: "90%",
          // backdropFilter: "blur(5px)",
          // backgroundColor: "rgba(179, 187, 211, 0.605)",
          backgroundColor: "rgba(255, 255, 255)",
          position: "relative",
          margin: "0 auto",
          height: "100%",
          top: "33px",
          padding: "25px 25px",
          borderRadius: "4px",
          display: "flex",
        }}
      >
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">รายการประมิน</th>
              <th scope="col">จำนวนผู้ตอบคำถาม</th>
              <th scope="col">ระดับคะแนนเฉลี่ย</th>
            </tr>
          </thead>

          <tbody>
            {filtered.flatMap((items) => (
              <>
                <tr>
                  <th scope="row">1</th>
                  <td>แอปพลิเคชันใช้งานง่าย</td>
                  <td>{isUsers.length}</td>
                  <td>{(Question1 / isUsers.length).toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>แอปพลิเคชันมีความเสถียร</td>
                  <td>{isUsers.length}</td>
                  <td>{(Question2 / isUsers.length).toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>ความสวยงาม</td>
                  <td>{isUsers.length}</td>
                  <td>{(Question3 / isUsers.length).toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>ความน่าใช้งาน</td>
                  <td>{isUsers.length}</td>
                  <td>{(Question4 / isUsers.length).toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>ภาพรวมของแอปพลิเคชัน Easy exercise</td>
                  <td>{isUsers.length}</td>
                  <td>{(Question5 / isUsers.length).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="3">คะแนนเฉลี่ยรวมทั้งหมด</td>
                  <td>
                    {((Question1 / isUsers.length +
                      Question2 / isUsers.length +
                      Question3 / isUsers.length +
                      Question4 / isUsers.length +
                      Question5 / isUsers.length) / 5).toFixed(2) }
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Feedback;
