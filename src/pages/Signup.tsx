import { Box, Button, Paper, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<Number>();
  const navigate = useNavigate();

  const testEmailRegex = /@/;

  const onSubmit = async () => {
    if (!name || name.length < 3) {
      return alert("Digite um nome valido");
    }
    if (confirmPassword != password) {
      return alert("As senhas nao coincidem");
    }
    if (!password || !confirmPassword) {
      return alert("Digite uma senha");
    }
    if (!cpf) {
      return alert("Digite um CPF válido");
    }
    if (!email) {
      return alert("Digite um e-mail válido");
    }
    if (!age) {
      return alert("Digite uma idade válida");
    }
    const newUser = {
      name: name,
      password: password,
      cpf: cpf,
      email: email,
      age: age,
    };

    try {
      console.log("===BODY===", newUser);
      const data: AxiosResponse = await axios.post(
        process.env.REACT_APP_URL + "user",
        newUser
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
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
        <Box display="flex" flexDirection="column" gap={1} padding="40px">
          <TextField
            id="outlined-name"
            label="Name"
            value={name}
            helperText={!name ? "Digite o seu nome" : ""}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-name"
            type="password"
            label="Password"
            value={password}
            helperText={!password ? "Digite uma senha" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="outlined-name"
            type="password"
            label="Confirm Password"
            color={password === confirmPassword ? "success" : "primary"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={
              password != confirmPassword ? "As senhas não coincidem" : ""
            }
            error={password != confirmPassword}
          />
          <TextField
            id="outlined-cpf"
            label="CPF"
            value={cpf}
            helperText={!cpf ? "Digite o seu CPF" : ""}
            onChange={(e) => setCpf(e.target.value)}
          />
          <TextField
            id="outlined-email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={
              !testEmailRegex.test(email) ? "Digite um e-mail válido" : ""
            }
          />
          <TextField
            type="number"
            id="outlined-age"
            label="Age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
          <Button variant="outlined" onClick={onSubmit}>
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
