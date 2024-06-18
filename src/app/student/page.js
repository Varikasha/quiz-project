"use client";

import {Breadcrumbs, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Link from "next/link";
import Animation from "@/app/components/animation";

export default function page() {
    const Settings = () => <Animation type="settings" />;
    const Quizzes = () => <Animation type="quizzes" />;

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
                        <Typography color="#039be5">Ученик</Typography>
                    </Breadcrumbs>
                </div>
                <div style={{marginTop: 50}}>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Link href="/student/quizzes/">
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component={Quizzes}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Викторины
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Пройдите викторину
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link href="/student/settings/">
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