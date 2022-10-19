import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export interface IResponseUser {
  name: string;
  password: string;
  cpf: string;
  email: string;
  age: number;
  id: string;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Login = () => {
  console.log("===Process env===", process.env.REACT_APP_URL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const testEmailRegex = /@/;

  const onSubmit = async () => {
    if (!email) {
      return alert("Insira um e-mail");
    }
    if (!password) {
      return alert("Insira uma senha");
    }
    const userLogin = {
      email,
      password,
    };

    try {
      console.log("===BODY===", userLogin);
      const { data }: AxiosResponse<IResponseUser[]> = await axios.get(
        process.env.REACT_APP_URL + "user"
      );
      console.log(data);
      const userFound = data.find(
        (user) =>
          user.email === userLogin.email && user.password === userLogin.password
      );

      if (!userFound) {
        return alert("Usuario ou senha invalido");
      }

      localStorage.setItem("user-logado", JSON.stringify(userFound.id));
      alert("Deu certo");
      navigate("/tasks");
    } catch (error) {
      alert("Usuario não encontrado\nEfetue seu cadastro");
      navigate("/signup");
      return;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "300px",
        width: "100vw",
        height: "100vh",
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "30vw",
        }}
        elevation={24}
      >
        <Box display="flex" flexDirection="column" gap={2} padding="40px">
          <TextField
            id="outlined-email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={
              !testEmailRegex.test(email) ? "Digite um e-mail válido" : ""
            }
            error={email.length > 1 ? !testEmailRegex.test(email) : false}
          />
          <TextField
            id="outlined-password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={onSubmit}>
            Login
          </Button>
          <Button variant="contained" onClick={() => navigate("/signup")}>
            SignUp
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
