"use client";
import Link from 'next/link';
import {Breadcrumbs, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Animation from "@/app/components/animation";

export default function teacher() {
    const Add = () => <Animation type="add"/>;
    const Edit = () => <Animation type="edit"/>;
    const Remove = () => <Animation type="remove"/>;
    const Settings = () => <Animation type="settings" />;

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
                        <Typography color="#039be5">Учитель</Typography>
                    </Breadcrumbs>
                </div>
                <div style={{marginTop: 50}}>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Link href="/teacher/createQuiz/">
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component={Add}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Создать
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Создайте новую викторину
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link href="/teacher/editQuiz/">
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component={Edit}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Редактировать
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Измените уже существующую викторину
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link href="/teacher/removeQuiz/">
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component={Remove}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Удалить
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Удалите больше не нужную викторину :(
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link href="/teacher/settings/">
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component={Settings}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Настройки
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Настройте свой профиль
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}