"use client";

import {
    Box,
    Breadcrumbs, Button,
    FormControlLabel,
    Radio,
    RadioGroup, styled,
    Tab,
    Tabs,
    Typography,
    useRadioGroup
} from "@mui/material";
import Link from "next/link";
import {useEffect, useState} from "react";
import {defaultQuizzes} from "@/app/db";
import {useRouter} from "next/navigation";

import styles from "./page.module.css";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            className={styles.question}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{paddingLeft: 25}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }),
);

function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

const page = ({ params }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [quiz, setQuiz] = useState({
        name: "",
        questions: []
    });
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        const student_passed = JSON.parse(localStorage.getItem("student_passed")) || [];
        let isPassed = false;
        student_passed.forEach(passedItem => {
            if (passedItem.id === id) {
                isPassed = true;
            }
        });
        const quizzes = JSON.parse(localStorage.getItem("quizzes_db")) || defaultQuizzes;
        if (!quizzes.filter(quiz => quiz.id === id)[0]) {
            router.push("/student/quizzes/");
        } else if (isPassed) {
            router.push(`/student/quizzes/passed/${id}`);
        } else {
            const quizFromLocalStorage = quizzes.filter(quiz => quiz.id === id)[0];
            const obj = {};
            quizFromLocalStorage.questions.forEach(question => {
                obj[`question${question.id}`] = null;
            });
            setUserAnswers(obj);
            console.log(obj);
            setQuiz(quizFromLocalStorage);
        }
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
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/student/quizzes"
                        >
                            Викторины
                        </Link>
                        <Typography color="#039be5">{id}</Typography>
                    </Breadcrumbs>
                </div>
                <div className={styles.wrapper}>
                    <Typography style={{marginBottom: 25}} variant="h4" color="inherit" component="h1">
                        {quiz.name}
                    </Typography>
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 270 }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            {quiz.questions.map(question => <Tab key={question.id} label={`Вопрос #${question.number}`} id={`vertical-tab-${question.number - 1}`} aria-controls={`vertical-tabpanel-${question.number - 1}`} />)}
                        </Tabs>
                        {quiz.questions.map(question => (
                            <TabPanel key={question.id} value={value} index={question.number - 1}>
                                <Typography variant="h6" color="inherit" component="h6">
                                    {question.valueOfQuestion}
                                </Typography>
                                <RadioGroup
                                    onChange={e => {
                                        const newAnswers = JSON.parse(JSON.stringify(userAnswers));
                                        newAnswers[`question${question.id}`] = e.target.value;
                                        setUserAnswers(newAnswers);
                                    }}
                                    value={userAnswers[`question${question.id}`]}
                                    name={`radio-${question.id}`}
                                >
                                    {question.answers.map(answer => <MyFormControlLabel key={answer.id} value={answer.id} label={answer.valueOfAnswer} control={<Radio />} />)}
                                </RadioGroup>
                                {quiz.questions.length - question.number === 0 ?
                                    <Button disabled={
                                        (function () {
                                            let ok = true;
                                            quiz.questions.forEach(question => {
                                                if (userAnswers[`question${question.id}`] === null) {
                                                    ok = false;
                                                } else {
                                                    if (ok !== false) {
                                                        ok = true;
                                                    }
                                                }
                                            });
                                            return !ok;
                                        })()
                                    } onClick={() => {
                                        const passed = JSON.parse(localStorage.getItem("student_passed")) || [];
                                        passed.push({
                                            id,
                                            userAnswers
                                        });
                                        localStorage.setItem("student_passed", JSON.stringify(passed));
                                        router.push(`/student/quizzes/passed/${id}`);
                                    }} style={{marginTop: 20}} variant="contained">Отправить</Button>
                                    :
                                    <Button onClick={() => {
                                        setValue(question.number);
                                    }} disabled={userAnswers[`question${question.id}`] === null} style={{marginTop: 20}} variant="contained">Далее</Button>
                                }
                            </TabPanel>
                        ))}
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default page;