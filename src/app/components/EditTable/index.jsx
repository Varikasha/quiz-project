"use client";

import "./index.css";

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {defaultQuizzes} from "@/app/db";

const EditTable = () => {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const quizzesFromLocalStorage = JSON.parse(localStorage.getItem("quizzes_db")) || defaultQuizzes;
        setQuizzes(quizzesFromLocalStorage);
    }, []);

    return (
        <div className="table-wrapper">
            <Typography variant="h4" color="inherit" component="h1">
                Редактировать
            </Typography>
            <TableContainer style={{marginTop: 30}} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Таблица викторин">
                    <TableHead>
                        <TableRow style={{borderBottom: "1px solid grey"}}>
                            <TableCell><strong>id</strong></TableCell>
                            <TableCell align="left"><strong>Тема</strong></TableCell>
                            <TableCell align="left"><strong>Предмет</strong></TableCell>
                            <TableCell align="left"><strong>Класс</strong></TableCell>
                            <TableCell align="left"><strong>Описание</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quizzes.map((quiz) => (
                            <TableRow
                                onClick={() => router.push(`/teacher/editQuiz/${quiz.id}`)}
                                key={quiz.id}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { borderRight: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {quiz.id}
                                </TableCell>
                                <TableCell align="left">{quiz.name}</TableCell>
                                <TableCell align="left">{quiz.subject}</TableCell>
                                <TableCell align="left">{quiz.class}</TableCell>
                                <TableCell align="left">{quiz.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {quizzes.length === 0 &&
                    <Typography variant="h6" color="inherit" component="h6">
                        У вас нет викторин
                    </Typography>
                }
            </TableContainer>
        </div>
    );
};

export default EditTable;