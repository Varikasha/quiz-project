"use client";
import {Breadcrumbs, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Link from "next/link";
import Animation from "@/app/components/animation";

export default function Home() {
    const Student = () => <Animation type="student"/>;
    const Teacher = () => <Animation type="teacher"/>;
    return (
        <div>
            <div className="container">
                <div style={{padding: 15, backgroundColor: "white", width: "fit-content", marginTop: 60, borderRadius: 7}}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="#039be5">Главная</Typography>
                    </Breadcrumbs>
                </div>
                <div style={{marginTop: 50}}>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Link href="/student/">
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component={Student}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Ученик
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Страница ученика
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link href="/teacher/">
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component={Teacher}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Учитель
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Страница учителя
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
    )
};
