"use client";

import {Breadcrumbs, Typography} from "@mui/material";
import Link from "next/link";
import SettingsForm from "@/app/components/settingsForm";

const page = () => {
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
                        <Typography color="#039be5">Настройки</Typography>
                    </Breadcrumbs>
                </div>
                <SettingsForm type={"student"} />
            </div>
        </div>
    );
};

export default page;