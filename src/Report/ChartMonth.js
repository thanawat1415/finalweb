import React, { useState, useEffect, useContext, createRef } from "react";
import { auth, db, storage, firebaseConfig } from "../config";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { display, height } from "@mui/system";

// /-------------Import pagination-------------/
import TablePagination from "@mui/material/TablePagination";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import TooltipButton from "@mui/material/Tooltip";
import { Padding } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartMonth = () => {
  const [isUsers, setUsers] = useState([]);

  var NumberofMonth = [];
  var msec = 86400000;
  var SumCheckofMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var [Next, setNext] = useState(0);

  const SettimeCurrent = () => {
    for (var i = 1; i < 13; i++) {
      let date = new Date(Date.now() - msec * Next);
      NumberofMonth.push(i + "/" + date.getFullYear());
    }
    return NumberofMonth;
  };
  const SettimeFirebase = () => {
    SettimeCurrent(NumberofMonth);
    for (var i = 0; i < isUsers.length; i++) {
      const DataFirebase = new Date(isUsers[i].regisDate.seconds * 1000);

      let Timeconfirm =
        DataFirebase.getMonth() + 1 + "/" + DataFirebase.getFullYear();

      if (NumberofMonth[0] == Timeconfirm) {
        SumCheckofMonth[0] += 1;
      } else if (NumberofMonth[1] == Timeconfirm) {
        SumCheckofMonth[1] += 1;
      } else if (NumberofMonth[2] == Timeconfirm) {
        SumCheckofMonth[2] += 1;
      } else if (NumberofMonth[3] == Timeconfirm) {
        SumCheckofMonth[3] += 1;
      } else if (NumberofMonth[4] == Timeconfirm) {
        SumCheckofMonth[4] += 1;
      } else if (NumberofMonth[5] == Timeconfirm) {
        SumCheckofMonth[5] += 1;
      } else if (NumberofMonth[6] == Timeconfirm) {
        SumCheckofMonth[6] += 1;
      } else if (NumberofMonth[7] == Timeconfirm) {
        SumCheckofMonth[7] += 1;
      } else if (NumberofMonth[8] == Timeconfirm) {
        SumCheckofMonth[8] += 1;
      } else if (NumberofMonth[9] == Timeconfirm) {
        SumCheckofMonth[9] += 1;
      } else if (NumberofMonth[10] == Timeconfirm) {
        SumCheckofMonth[10] += 1;
      } else if (NumberofMonth[11] == Timeconfirm) {
        SumCheckofMonth[11] += 1;
      }
    }
    return SumCheckofMonth;
  };

  const [Chartdata, setChartdata] = useState({
    labels: [],
    datasets: [],
  });
  const [Chartoption, setChartoption] = useState({});

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
          };
        })
      );
    });

    SettimeFirebase();

    setChartdata({
      labels: [
        NumberofMonth[0],
        NumberofMonth[1],
        NumberofMonth[2],
        NumberofMonth[3],
        NumberofMonth[4],
        NumberofMonth[5],
        NumberofMonth[6],
        NumberofMonth[7],
        NumberofMonth[8],
        NumberofMonth[9],
        NumberofMonth[10],
        NumberofMonth[11],
      ],
      datasets: [
        {
          label: "Month",
          data: [
            SumCheckofMonth[0],
            SumCheckofMonth[1],
            SumCheckofMonth[2],
            SumCheckofMonth[3],
            SumCheckofMonth[4],
            SumCheckofMonth[5],
            SumCheckofMonth[6],
            SumCheckofMonth[7],
            SumCheckofMonth[8],
            SumCheckofMonth[9],
            SumCheckofMonth[10],
            SumCheckofMonth[11],
          ],
          borderColor: "rgba(23, 19, 68, 0.857)",
          backgroundColor: "rgba(34, 26, 125, 0.857)",
        },
      ],
    });

    setChartoption({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
        },
      },
    });
  }, []);

  setTimeout(() => {
    SettimeFirebase();
    setChartdata({
      labels: [
        NumberofMonth[0],
        NumberofMonth[1],
        NumberofMonth[2],
        NumberofMonth[3],
        NumberofMonth[4],
        NumberofMonth[5],
        NumberofMonth[6],
        NumberofMonth[7],
        NumberofMonth[8],
        NumberofMonth[9],
        NumberofMonth[10],
        NumberofMonth[11],
      ],
      datasets: [
        {
          label: "Month",
          data: [
            SumCheckofMonth[0],
            SumCheckofMonth[1],
            SumCheckofMonth[2],
            SumCheckofMonth[3],
            SumCheckofMonth[4],
            SumCheckofMonth[5],
            SumCheckofMonth[6],
            SumCheckofMonth[7],
            SumCheckofMonth[8],
            SumCheckofMonth[9],
            SumCheckofMonth[10],
            SumCheckofMonth[11],
          ],
          borderColor: "rgba(23, 19, 68, 0.857)",
          backgroundColor: "rgba(34, 26, 125, 0.857)",
        },
      ],
    });
  }, 1000);

  return (
    <div
      style={{
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        width: "100%",
        // backdropFilter: "blur(5px)",
        // backgroundColor: "rgba(179, 187, 211, 0.605)",
        backgroundColor: "rgba(255, 255, 255)",
        position: "relative",
        margin: "0 auto",
        height: "100%",
        top: "33px",
        padding: "25px 70px 25px 40px",
        borderRadius: "4px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          fontWeight: "700",
          position: "relative",
          top: "20px",
          left: "10px",
          color: "rgb(70, 73, 90)",
        }}
      >
        Users
      </p>
      <Bar
        style={{ position: "relative", top: "-40px" }}
        width={200}
        height={80}
        options={Chartoption}
        data={Chartdata}
      ></Bar>

      <p
        style={{
          fontWeight: "700",
          position: "relative",
          top: "-85px",
          right: "-1580px",
          color: "rgb(70, 73, 90)",
        }}
      >
        Month
      </p>

      <NavigateNextIcon
        sx={{
          color: "black",
          position: "relative",
          left: "780px",
          bottom: "10px",
          fontSize: "26px",
        }}
        onClick={() => setNext(Next - 365)}
      ></NavigateNextIcon>

      <NavigateBeforeIcon
        sx={{
          color: "black",
          position: "relative",
          left: "680px",
          bottom: "10px",
          fontSize: "26px",
        }}
        onClick={() => setNext(Next + 365)}
      ></NavigateBeforeIcon>
    </div>
  );
};

export default ChartMonth;
