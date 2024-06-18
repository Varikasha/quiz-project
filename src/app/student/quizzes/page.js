"use client";
import {Breadcrumbs, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Link from "next/link";
import {useEffect, useState} from "react";
import {defaultQuizzes} from "@/app/db";
import {useRouter} from "next/navigation";

const page = () => {
    const [quizzes, setQuizzes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const quizzesFromLocalStorage = JSON.parse(localStorage.getItem("quizzes_db")) || defaultQuizzes;
        setQuizzes(quizzesFromLocalStorage);
    }, []);

    return (
        <div>
            <div className="container">
                <div style={{padding: 15, backgroundColor: "white", width: "fit-content", marginTop: 60, borderRadius: 7}}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                        >
                            Главная
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/student/"
                        >
                            Ученик
                        </Link>
                        <Typography color="#039be5">Викторины</Typography>
                    </Breadcrumbs>
                </div>
                <div style={{marginTop: 50}}>
                    <Grid container spacing={0}>
                        {quizzes.length === 0 && <Typography gutterBottom variant="h5" component="div">
                            Викторин нет
                        </Typography>}
                        {quizzes.map(quiz => (
                            <Grid onClick={() => router.push(`/student/quizzes/${quiz.id}`)} key={quiz.id} style={{marginBottom: 25}} item xs={12}>
                                <Card>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {quiz.name}
                                            </Typography>
                                            <Typography variant="body1" component="div">
                                                Предмет: {quiz.subject}
                                            </Typography>
                                            <Typography variant="body1" component="div">
                                                Класс: {quiz.class}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {quiz.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default page;