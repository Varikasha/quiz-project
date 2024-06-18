import "./index.css";
import {Alert, Button, Grid, Snackbar, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import teacher from "@/app/teacher/page";

const SettingsFormTeacher = () => {
    const [open, setOpen] = useState(false);

    const initialSettings = {
        surname: "",
        name: "",
        patronymic: ""
    };
    const [settings, setSettings] = useState(initialSettings);

    const onFormSubmit = e => {
        e.preventDefault();
        if (settings.name.trim() && settings.surname.trim() && settings.patronymic.trim()) {
            localStorage.setItem("teacher_settings", JSON.stringify({surname: settings.surname.trim(), name: settings.name.trim(), patronymic: settings.patronymic.trim()}));
            setOpen(true);
        }
    };

    const onFormChange = e => {
        const newSettings = JSON.parse(JSON.stringify(settings));
        newSettings[e.target.name] = e.target.value;
        setSettings(newSettings);
    };

    useEffect(() => {
        const settingsFromLocalStorage = JSON.parse(localStorage.getItem("teacher_settings")) || {surname: "Иванов", name: "Иван", patronymic: "Иванович"};
        if (!localStorage.getItem("teacher_settings")) {
            localStorage.setItem("teacher_settings", JSON.stringify({surname: "Иванов", name: "Иван", patronymic: "Иванович"}));
        }
        setSettings(settingsFromLocalStorage);
    }, []);

    return (
        <div className="settings-wrapper">
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            >
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    Данные изменены
                </Alert>
            </Snackbar>
            <form onSubmit={onFormSubmit}>
                <Typography variant="h4" color="inherit" component="h1">
                    Настройки
                </Typography>
                <Grid container>
                    <Grid xs={4} item><TextField required onChange={onFormChange} value={settings.surname} name="surname" label="Фамилия" variant="standard" /></Grid>
                    <Grid xs={4} item><TextField required onChange={onFormChange} value={settings.name} name="name" label="Имя" variant="standard" /></Grid>
                    <Grid xs={4} item><TextField required onChange={onFormChange} value={settings.patronymic} name="patronymic" label="Отчество" variant="standard" /></Grid>
                </Grid>
                <Button style={{marginTop: 20}} type="submit" variant="contained">Отправить</Button>
            </form>
        </div>
    );
};

const SettingsFormStudent = () => {
    const [open, setOpen] = useState(false);

    const initialSettings = {
        surname: "",
        name: "",
        patronymic: ""
    };
    const [settings, setSettings] = useState(initialSettings);

    const onFormSubmit = e => {
        e.preventDefault();
        if (settings.name.trim() && settings.surname.trim() && settings.patronymic.trim()) {
            localStorage.setItem("student_settings", JSON.stringify({surname: settings.surname.trim(), name: settings.name.trim(), patronymic: settings.patronymic.trim()}));
            setOpen(true);
        }
    };

    const onFormChange = e => {
        const newSettings = JSON.parse(JSON.stringify(settings));
        newSettings[e.target.name] = e.target.value;
        setSettings(newSettings);
    };

    useEffect(() => {
        const settingsFromLocalStorage = JSON.parse(localStorage.getItem("student_settings")) || {surname: "Иванов", name: "Иван", patronymic: "Иванович"};
        if (!localStorage.getItem("student_settings")) {
            localStorage.setItem("student_settings", JSON.stringify({surname: "Иванов", name: "Иван", patronymic: "Иванович"}));
        }
        setSettings(settingsFromLocalStorage);
    }, []);

    return (
        <div className="settings-wrapper">
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            >
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    Данные изменены
                </Alert>
            </Snackbar>
            <form onSubmit={onFormSubmit}>
                <Typography variant="h4" color="inherit" component="h1">
                    Настройки
                </Typography>
                <Grid container>
                    <Grid xs={4} item><TextField required onChange={onFormChange} value={settings.surname} name="surname" label="Фамилия" variant="standard" /></Grid>
                    <Grid xs={4} item><TextField required onChange={onFormChange} value={settings.name} name="name" label="Имя" variant="standard" /></Grid>
                    <Grid xs={4} item><TextField required onChange={onFormChange} value={settings.patronymic} name="patronymic" label="Отчество" variant="standard" /></Grid>
                </Grid>
                <Button style={{marginTop: 20}} type="submit" variant="contained">Отправить</Button>
            </form>
        </div>
    );
};

const SettingsForm = ({type}) => {
    if (type === "teacher") {
        return <SettingsFormTeacher />;
    } else if (type === "student") {
        return <SettingsFormStudent />;
    }
};

export default SettingsForm;