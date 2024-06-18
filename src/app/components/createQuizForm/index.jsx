"use client";

import "./index.css";
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    FormControl, FormControlLabel, FormLabel,
    Grid,
    IconButton,
    Input,
    InputLabel,
    MenuItem, Radio, RadioGroup,
    Select,
    Stack, Switch,
    TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {defaultQuizzes} from "@/app/db";

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const createQuizForm = () => {
    const [questions, setQuestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const initialFormData = {
        name: "",
        subject: "",
        class: "",
        description: ""
    };
    const [formData, setFormData] = useState(initialFormData);

    const onFormSubmit = e => {
        e.preventDefault();
        if (formData.name.trim() && formData.description.trim() && questions.length > 0) {
            const quizObject = {
                id: makeid(10),
                name: formData.name.trim(),
                subject: formData.subject,
                class: formData.class,
                description: formData.description.trim(),
                questions,
                editAllow: true,
                removeAllow: true
            };
            const quizzes = JSON.parse(localStorage.getItem("quizzes_db")) || defaultQuizzes;
            console.log(quizzes);
            quizzes.push(quizObject);
            localStorage.setItem("quizzes_db", JSON.stringify(quizzes));
            localStorage.setItem("teacher_draft", null);
            setFormData(initialFormData);
            setQuestions([]);
        }
    };

    const addQuestion = () => {
        const newQuestions = JSON.parse(JSON.stringify(questions));
        newQuestions.push(
            {
                id: makeid(5),
                number: newQuestions.length + 1,
                valueOfQuestion: "",
                answers: [],
                typeOfAnswers: "radio"
            }
        );
        setQuestions(newQuestions);
    };

    const removeQuestion = () => {
        const newQuestions = JSON.parse(JSON.stringify(questions));
        newQuestions.pop();
        setQuestions(newQuestions);
    };

    const addAnswer = (id) => {
        const newQuestions = JSON.parse(JSON.stringify(questions))
            .map(question => {
            if (question.id === id) {
                question.answers.push({
                    id: makeid(5),
                    valueOfAnswer: "",
                    isCorrect: false,
                    number: question.answers.length + 1
                });
            }
            return question;
        });
        setQuestions(newQuestions);
    };

    const removeAnswer = (id) => {
        const newQuestions = JSON.parse(JSON.stringify(questions));
        setQuestions(newQuestions.map(question => {
            if (question.id === id) {
                question.answers.pop();
            }
            return question;
        }));
    };

    const onFormChange = e => {
        const newFormData = JSON.parse(JSON.stringify(formData));
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    };

    const onQuestionChange = (e, id) => {
        const newQuestions = JSON.parse(JSON.stringify(questions)).map(question => {
            if (question.id === id) {
                question[e.target.name] = e.target.value;
            }
            return question;
        });
        setQuestions(newQuestions);
    };

    const onAnswerChange = (e, questionId, answerId, isSwitch=false) => {
        const newQuestions = JSON.parse(JSON.stringify(questions)).map(question => {
            if (question.id === questionId) {
                question.answers.forEach(answer => {
                   if (answer.id === answerId) {
                       if (!isSwitch) {
                           answer[e.target.name] = e.target.value;
                       } else {
                           answer[e.target.name] = e.target.checked;
                       }
                   }
                   return answer;
                });
            }
            return question;
        });
        setQuestions(newQuestions);
    };

    const No = () => {
        setOpen(false);
        localStorage.setItem("teacher_draft", null);
        setSaving(true);
    };

    const Yes = () => {
        setOpen(false);
        const data = JSON.parse(localStorage.getItem("teacher_draft")) || null;
        setQuestions(data.questions);
        setFormData(data.formData);
        setSaving(true);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("teacher_draft"));
        if (data === null) {
            return setSaving(true);
        }
        const condition = data.formData.class !== "" || data.formData.description !== "" || data.formData.subject !== "" || data.formData.name !== "" || data.questions.length !== 0;
        if (condition) {
            setOpen(true);
        } else {
            setSaving(true);
        }
    }, []);

    useEffect(() => {
        if (open !== true && saving === true) {
            localStorage.setItem("teacher_draft", JSON.stringify({
                formData,
                questions
            }));
        }
    }, [formData, open, questions, saving]);

    return (
        <div className="createQuizForm-wrapper">
            <Dialog
                open={open}
                onClose={No}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Черновик"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        У вас есть сохранённый черновик викторины. Хотите продолжить с того же места?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={No}>Нет</Button>
                    <Button onClick={Yes}>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
            <form onSubmit={onFormSubmit}>
                <Typography variant="h4" color="inherit" component="h1">
                    Создать викторину
                </Typography>
                <Grid container spacing={7}>
                    <Grid item><TextField required value={formData.name} onChange={onFormChange} name="name" id="quizName" label="Тема" variant="standard" /></Grid>
                    <Grid item>
                        <FormControl required sx={{minWidth: 100}}>
                            <Select
                                id="quizSubject"
                                name="subject"
                                onChange={onFormChange}
                                value={formData.subject}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <em>Выберите предмет</em>
                                </MenuItem>
                                <MenuItem value={"Алгебра"}>Алгебра</MenuItem>
                                <MenuItem value={"Геометрия"}>Геометрия</MenuItem>
                                <MenuItem value={"Русский язык"}>Русский язык</MenuItem>
                                <MenuItem value={"Литература"}>Литература</MenuItem>
                                <MenuItem value={"Физика"}>Физика</MenuItem>
                                <MenuItem value={"Химия"}>Химия</MenuItem>
                                <MenuItem value={"Биология"}>Биология</MenuItem>
                                <MenuItem value={"Астрономия"}>Астрономия</MenuItem>
                                <MenuItem value={"ОБЖ"}>ОБЖ</MenuItem>
                                <MenuItem value={"История"}>История</MenuItem>
                                <MenuItem value={"Обществознание"}>Обществознание</MenuItem>
                                <MenuItem value={"География"}>География</MenuItem>
                                <MenuItem value={"Физическая культура"}>Физическая культура</MenuItem>
                                <MenuItem value={"Музыка"}>Музыка</MenuItem>
                                <MenuItem value={"Искусство"}>Искусство</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl required sx={{minWidth: 80}}>
                            <Select
                                id="quizClass"
                                name="class"
                                onChange={onFormChange}
                                value={formData.class}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <em>Выберите класс</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="quizDescription"
                            label="Описание"
                            multiline
                            maxRows={4}
                            name="description"
                            onChange={onFormChange}
                            value={formData.description}
                        />
                    </Grid>
                </Grid>
                <div className="quizQuestions">
                    <Typography variant="h5" color="inherit" component="h4">
                        Вопросы
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={addQuestion} aria-label="plus" color="success">
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={removeQuestion} aria-label="minus" color="error">
                            <RemoveIcon />
                        </IconButton>
                    </Stack>
                    {questions.map(question => (
                        <div key={question.id} className="quizQuestion">
                            <Typography variant="h5" color="inherit" component="h5">
                                #{question.number}
                            </Typography>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor={`question_input_${question.id}`}>Вопрос</InputLabel>
                                <Input
                                    name="valueOfQuestion"
                                    value={question.valueOfQuestion}
                                    onChange={e => onQuestionChange(e, question.id)}
                                    id={`question_input_${question.id}`}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel id={`typeOfAnswers_${question.id}_Label`}>Тип ответов</FormLabel>
                                <RadioGroup
                                    row
                                    value={question.typeOfAnswers}
                                    aria-labelledby="typeofanswers"
                                    name={`typeOfAnswers`}
                                    onChange={e => onQuestionChange(e, question.id)}
                                >
                                    <FormControlLabel checked value="radio" control={<Radio />} label="Выбор одного" />
                                </RadioGroup>
                            </FormControl>
                            <Typography variant="h6" color="inherit" component="h6">
                                Ответы
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <IconButton onClick={() => addAnswer(question.id)} aria-label="plus" color="success">
                                    <AddIcon />
                                </IconButton>
                                <IconButton onClick={() => removeAnswer(question.id)} aria-label="minus" color="error">
                                    <RemoveIcon />
                                </IconButton>
                            </Stack>
                            {question.answers.map(answer => (
                                <div key={answer.id}>
                                    <Stack direction="row" spacing={1}>
                                        <TextField name="valueOfAnswer" onChange={e => onAnswerChange(e, question.id, answer.id)} value={answer.valueOfAnswer} id={`question_${question.id}_answer_${answer.id}`} label={`Ответ #${answer.number}`} variant="standard" />
                                        <FormControlLabel
                                            style={{marginTop: 20}}
                                            onChange={e =>
                                                {
                                                    onAnswerChange(e, question.id, answer.id, true);
                                                }
                                            }
                                            name="isCorrect"
                                            checked={!!answer.isCorrect}
                                            control={<Switch />}
                                            label="Правильный ответ"
                                        />
                                    </Stack>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <Button style={{marginTop: 20}} type="submit" variant="contained">Отправить</Button>
            </form>
        </div>
    );
};

export default createQuizForm;