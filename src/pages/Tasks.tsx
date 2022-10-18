import {
  Box,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
};

export default function Transactions() {
  const userID = JSON.parse(localStorage.getItem("user-logado") as string);
  const [tasks, setTask] = useState<Task[]>([]);
  const [hasUpdate, setHasUpdate] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log("Meu ID: " + userID);

  useEffect(() => {
    async function getTasks() {
      const { data }: AxiosResponse<Task[]> = await axios.get(
        process.env.REACT_APP_URL + `user/${userID}/tasks`
      );
      console.log(data);
      setTask(data);
    }
    if (hasUpdate) {
      getTasks();
      setHasUpdate(false);
    }
  }, [hasUpdate]);

  async function createNewTask() {
    const newTask = {
      title,
      description,
    };

    const response: AxiosResponse<Task[]> = await axios.post(
      process.env.REACT_APP_URL + `user/${userID}/tasks`,
      newTask
    );
    setHasUpdate(true);
    console.log(response.data);
  }

  return (
    <Box display="flex" flexDirection="column" gap="40px">
      <Box display="flex" flexDirection="column" gap="16px">
        <TextField
          label="Tittle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          type="text"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={createNewTask} variant="outlined">
          Criar Transação
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent="space-evenly"
        sx={{ backgroundColor: "red" }}
      ></Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row: Task) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
