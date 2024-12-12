import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

type Iparticipant = {
  name: string;
  number: string;
  position: string;
};

const participant = [
  {
    name: "Димитриос Власис",
    number: "21180052",
    position: "Frontend, Organization",
  },
  {
    name: "Александър Виденов ",
    number: "20118073",
    position: "Backend",
  },
  {
    name: "Нарин Шаиб",
    number: "21180089",
    position: "Organization, QA",
  },
  {
    name: "Стивън Найденов",
    number: "21180100",
    position: "Organization, QA",
  },
  {
    name: "Деница Георгиева",
    number: "21180124",
    position: "Organization",
  },
];

const Home = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Welcome to <strong>Invoice Manager!</strong>
      </h1>

      <h4>Participants: </h4>
      <div>
        {participant.map((student) => (
          <div>
            <h2>
              <strong>{student.name}</strong>
            </h2>
            <h4>Number: {student.number}</h4>
            <h4>Role: {student.position}</h4>
            <hr />
          </div>
        ))}
      </div>
      <Button
        style={{ width: "200px", marginTop: "100px", textAlign: "center" }}
        variant="contained"
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      >
        Log out
      </Button>
    </div>
  );
};

export default Home;
