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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartWeekly = () => {
  const [isUsers, setUsers] = useState([]);

  var Week = [];
  var msec = 86400000;
  var days = [0, 0, 0, 0, 0, 0, 0];
  let LinkdatetoWeek;
  // var day1 = -1;
  // var user = -1;
  // var func = -1;
  // var func1 = -1;

  var [NextPage, setNextPage] = useState(0);

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
    console.log(isUsers);

    setChartdata({
      labels: [Week[0], Week[1], Week[2], Week[3], Week[4], Week[5], Week[6]],
      datasets: [
        {
          label: "Weekly",
          data: [days[0], days[1], days[2], days[3], days[4], days[5], days[6]],
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

  var SettimeCurrent = () => {
    for (var i = 6; i >= 0; i--) {
      let date = new Date(Date.now() - (msec * i + msec * NextPage));
      console.log(date);
      Week.push(
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    }
    // for (var i = 6; i >= 0; i--) {
    //   if (i == -1) {
    //     break;
    //   }
    //   let date = new Date(Date.now() - msec * i + msec * NextPage);
    //   LinkdatetoWeek = date;
    //   console.log(LinkdatetoWeek);
    // }
    // Week.push(
    //   LinkdatetoWeek.getDate() +
    //     "/" +
    //     (LinkdatetoWeek.getMonth() + 1) +
    //     "/" +
    //     LinkdatetoWeek.getFullYear()
    // );

    return Week;
  };

  const SettimeFirebase = () => {
    SettimeCurrent();
    for (var i = 0; i < isUsers.length; i++) {
      const DataFirebase = new Date(isUsers[i].regisDate.seconds * 1000);
      let Timeconfirm =
        DataFirebase.getDate() +
        "/" +
        (DataFirebase.getMonth() + 1) +
        "/" +
        DataFirebase.getFullYear();

      if (Week[0] == Timeconfirm) {
        days[0] += 1;
      } else if (Week[1] == Timeconfirm) {
        days[1] += 1;
      } else if (Week[2] == Timeconfirm) {
        days[2] += 1;
      } else if (Week[3] == Timeconfirm) {
        days[3] += 1;
      } else if (Week[4] == Timeconfirm) {
        days[4] += 1;
      } else if (Week[5] == Timeconfirm) {
        days[5] += 1;
      } else if (Week[6] == Timeconfirm) {
        days[6] += 1;
      }
    }
    return days;
  };

  const [Chartdata, setChartdata] = useState({
    datasets: [SettimeFirebase()],
  });
  const [Chartoption, setChartoption] = useState({});

  setTimeout(() => {
    setChartdata({
      labels: [Week[0], Week[1], Week[2], Week[3], Week[4], Week[5], Week[6]],
      datasets: [
        {
          label: "Weekly",
          data: [days[0], days[1], days[2], days[3], days[4], days[5], days[6]],
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
        Week
      </p>

      <NavigateNextIcon
        sx={{
          color: "black",
          position: "relative",
          left: "780px",
          bottom: "10px",
          fontSize: "26px",
        }}
        onClick={() => setNextPage(NextPage - 7)}
      ></NavigateNextIcon>

      <NavigateBeforeIcon
        sx={{
          color: "black",
          position: "relative",
          left: "680px",
          bottom: "10px",
          fontSize: "26px",
        }}
        onClick={() => setNextPage(NextPage + 7)}
      ></NavigateBeforeIcon>
    </div>
  );
};

export default ChartWeekly;
