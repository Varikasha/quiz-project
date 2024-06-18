"use client";

import styles from "./page.module.css";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {defaultQuizzes} from "@/app/db";
import {Breadcrumbs, Typography} from "@mui/material";
import Link from "next/link";

const page = ({ params }) => {
    const [percent, setPercent] = useState(0);
    const [quiz, setQuiz] = useState({name: ""});

    const router = useRouter();

    const id = params.id;

    useEffect(() => {
        const passed = JSON.parse(localStorage.getItem("student_passed")) || [];
        if (!passed.filter(quiz => quiz.id === id)[0]) {
            router.push(`/student/quizzes/${id}`);
        } else {
            const studentPassed = passed.filter(quiz => quiz.id === id)[0];
            const quizzes = JSON.parse(localStorage.getItem("quizzes_db")) || defaultQuizzes;
            const quizFromLocalStorage = quizzes.filter(quiz => quiz.id === id)[0];
            let correct = 0;
            quizFromLocalStorage.questions.forEach(question => {
                if (question.answers.filter(answer => answer.id === studentPassed.userAnswers[`question${question.id}`])[0].isCorrect) {
                    correct += 1;
                }
            });
            setQuiz(quizFromLocalStorage);
            setPercent(Math.round((correct/quizFromLocalStorage.questions.length) * 100));
        }
    }, []);

    return (
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
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/student/quizzes"
                    >
                        Викторины
                    </Link>
                    <Typography color="#039be5">Результаты {id}</Typography>
                </Breadcrumbs>
            </div>
            <div className={styles.wrapper}>
                <Typography style={{marginBottom: 25}} variant="h4" color="inherit" component="h1">
                    {quiz.name}
                </Typography>
                <Typography style={{marginBottom: 25}} variant="h6" color="inherit" component="h6">
                    Ваш результат - {percent}%
                </Typography>
            </div>
        </div>
    );
};

export default page;