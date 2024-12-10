import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { IUser } from "../interfaces/IUser";
import { login } from "../services/UserService";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const [userData, setUserData] = useState<IUser>({
    username: "",
    password: "",
  });
  const [error, setError] = useState(" ");

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setError(" ");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData) {
      try {
        const response = await login(userData);
        const userToken = JSON.stringify(response.access_token);

        localStorage.setItem("user", userToken);
        navigate("/");
      } catch {
        setError("Wrong name or password!");
      }
    }
  };

  return (
    <form
      style={{ margin: " 50px auto", width: "400px" }}
      className="edit-form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <TextField
        label="Name"
        name="username"
        value={userData.username}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={userData.password}
        onChange={handleChange}
        fullWidth
      />
      <div style={{ color: " red" }}>{error.length > 0 && error}</div>
      {/* ... other fields for middleName, lastName, etc. ... */}
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
};

export default Login;
